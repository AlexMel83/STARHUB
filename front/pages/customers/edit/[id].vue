<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { ICustomer, ServerResponse } from "~/types/deals.types";
import { useForm } from "vee-validate";
import axios from "axios";

useSeoMeta({
  title: "Edit company",
});

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

const { $api, $load } = useNuxtApp();
const errors = reactive({
  textError: "",
});

const route = useRoute();
const router = useRouter();
const customerId = route.params.id as unknown as number;
const previewUrl = ref<string | null>(null);

const { handleSubmit, defineField, setFieldValue, setValues, values } =
  useForm<ICustomerFormState>();

const { data, isSuccess } = useQuery({
  queryKey: ["get customer"],
  queryFn: async () => {
    try {
      const response: ServerResponse = await $load(
        () => $api.customers.getCustomerById(customerId),
        errors,
      );
      return response.data as unknown as ICustomer;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  },
});

watchEffect(() => {
  if (isSuccess.value && data.value) {
    const initialData = data.value;
    setValues({
      email: initialData.email || "",
      avatar_url: initialData.avatar_url || "",
      from_source: initialData.from_source || "",
      name: initialData.name || "",
    });
  }
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [fromSource, fromSourceAttrs] = defineField("from_source");

const { mutate, isPending } = useMutation({
  mutationKey: ["update customer", customerId],
  mutationFn: async (formData: ICustomerFormState) => {
    const updatedCustomer: ICustomer = {
      id: customerId,
      ...(data.value || {}),
      ...formData,
      updated_at: new Date().toISOString(),
    };
    return await $api.customers.editCustomer(updatedCustomer);
  },
  onSuccess: () => {
    router.push("/customers");
  },
});

const { mutateAsync: uploadImage, isPending: isUploadImagePending } =
  useMutation<{ file: { url: string } }, Error, File>({
    mutationKey: ["upload image"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("id", customerId.toString());
      formData.append("entity", "customer");
      formData.append("file", file);
      const response = await axios.post<{ file: { url: string } }>(
        "http://localhost:4041/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    },
  });

const onFileChange = (e: InputFileEvent) => {
  const file = e.target.files?.[0];
  if (file) {
    const localUrl = URL.createObjectURL(file);
    previewUrl.value = localUrl;
    setFieldValue("avatar_url", localUrl);
  }
};

const { mutateAsync: deleteOldFile } = useMutation({
  mutationKey: ["delete old file"],
  mutationFn: async (filePath: string) => {
    await axios.delete("http://localhost:4041/delete-file", {
      data: { filePath },
    });
  },
});

const onSubmit = handleSubmit(async (values) => {
  const inputFile = document.querySelector(
    'input[type="file"]',
  ) as HTMLInputElement;
  const avatarFile = inputFile.files?.[0];
  let newAvatarUrl = values.avatar_url;
  if (avatarFile) {
    try {
      if (data.value?.avatar_url) {
        const oldFilePath = new URL(data.value.avatar_url).pathname;
        await deleteOldFile(oldFilePath);
      }
      const result = await uploadImage(avatarFile);
      newAvatarUrl = result.file.url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  if (newAvatarUrl) {
    mutate({ ...values, avatar_url: newAvatarUrl });
  } else {
    console.error("No avatar URL available");
  }
});

const avatarPreview = computed(() => {
  return (
    previewUrl.value ||
    values.avatar_url ||
    (isUploadImagePending.value ? "/path/to/loading-image.gif" : "")
  );
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">Edit {{ values.name }}</h1>
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
      <div class="grid w-full max-w-sm items-center gap-1.5 input">
        <label>
          <img
            v-if="avatarPreview"
            :src="avatarPreview"
            alt=""
            width="50"
            height="50"
            class="rounded-full my-2"
          />
          <div class="text-sm mb-4">Logo</div>
          <UiInput
            type="file"
            :onchange="(e: InputFileEvent) => onFileChange(e)"
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
