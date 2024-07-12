<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { defineProps } from "vue";
import type { IDeal } from "~/types/deals.types";
import { v4 as uuid } from "uuid";

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer_name: string,
  customer_email: string,
  status: string;
};

const isOpenForm = ref(false);
const { $api, $load } = useNuxtApp();
const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: Function,
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormState>({
  initialValues: {
    name: "",
    price: 0,
    customer_email: "",
    customer_name: "",
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer_email");
const [customerName, customerNameAttrs] = defineField("customer_name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: async (data: IDealFormState) => {
      const response = await $api.deals.addDeal(data);
      return response;
      },
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div class="text-center mb-2">
    <button
      class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]"
      @click="isOpenForm = !isOpenForm"
    >
      <Icon
        v-if="isOpenForm"
        name="radix-icons:arrow-up"
        class="fade-in-100 fade-out-0"
        size="35"
      />
      <Icon
        v-else
        name="radix-icons:plus-circled"
        class="fade-in-100 fade-out-0"
        size="35"
      />
    </button>
  </div>
  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <UiInput
      placeholder="name"
      v-model="name"
      v-bind="nameAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="summ"
      v-model="price"
      v-bind="priceAttrs"
      type="number"
      class="input"
    />
    <UiInput
      placeholder="email"
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      type="text"
      class="input"
    />
    <UiInput
      placeholder="company"
      v-model="customerName"
      v-bind="customerNameAttrs"
      type="text"
      class="input"
    />
    <button class="btn" :disabled="isPending">
      {{ isPending ? "Download" : "Add" }}
    </button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }
  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
