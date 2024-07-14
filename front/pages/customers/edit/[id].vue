<script setup lang="ts">
import { storage } from "@/lib/appwrite";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { v4 as uuid } from "uuid";
import type { ICustomer, ServerResponse } from "~/types/deals.types";
import { useForm } from 'vee-validate';

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

useSeoMeta({
  title: "Edit company",
});

const { $api, $load } = useNuxtApp();
  const errors = reactive({
    textError: '',
  });

const route = useRoute();
const router = useRouter();
const customerId = route.params.id as unknown as number;

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const { data, isSuccess } = useQuery({
  queryKey: ["get customer"],
  queryFn: async () => {
      try {
        const customer: ServerResponse = await $load(() => $api.customers.getCustomerById(customerId), errors);
        return customer.data;
      } catch (error) {
        console.error("Error fetching customer:", error);
        throw error;
      }
    },
});

watchEffect(()=>{
  if(isSuccess.value && data.value) {
    const initialData = data.value as unknown as ICustomerFormState;
    setValues({
      email: initialData.email,
      avatar_url: initialData.avatar_url,
      from_source: initialData.from_source || "",
      name: initialData.name,
    });
  }
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [fromSource, fromSourceAttrs] = defineField("from_source");

const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: (formData: ICustomerFormState) => {
    const updatedCustomer: ICustomer = {
      id: customerId,
      ...data.value,
      ...formData,
      updated_at: new Date().toISOString(),
    };
    return $api.customers.editCustomer(updatedCustomer);
  },
  onSuccess: () => {
    router.push('/customers');
  }
});

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
  mutationKey: ["upload image"],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const response = storage.getFileDownload(STORAGE_ID, data.id);
    setFieldValue("avatar_url", response.href);
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">
      Edit {{ values.name }}
    </h1>
    <form @submit="onSubmit" class="form">
      <UiInput
        placeholder="name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        class="input"
      />
      <UiInput
        placeholder="email"
        v-model="email"
        v-bind="emailAttrs"
        type="text"
        class="input"
      />
      <UiInput
        placeholder="where from"
        v-model="fromSource"
        v-bind="fromSourceAttrs"
        type="text"
        class="input"
      />
      <img
        v-if="values.avatar_url || isUploadImagePending"
        :src="values.avatar_url"
        alt=""
        width="50"
        height="50"
        class="rounded-full my-2"
      />
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <div class="text-sm mb-4">Logo</div>
          <UiInput
            type="file"
            :onchange="
              (e: InputFileEvent) =>
                e?.target?.files?.length && uploadImage(e.target.files[0])
            "
            :disabled="isUploadImagePending"
          />
        </label>
      </div>
      <UiButton :disabled="isPending" variant="secondary" class="mt-3">
        {{ isPending ? "Loading..." : "Save" }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped lang="postcss">
.input {
  @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}
</style>
