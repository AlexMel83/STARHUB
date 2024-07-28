<script setup>
const { $api } = useNuxtApp();
const props = defineProps({
  totalPrice: Number,
  tax: Number,
});

const { cart } = inject("cart");
const isCreating = ref(false);
const orderId = ref(null);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await $api.sneakers.createOrder({
      sneakers: cart.value,
    });
    cart.value = [];
    orderId.value = data.order_id.id;
    isCreating.value = false;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const cartIsEmpty = computed(() => {
  return cart.value.length === 0;
});
const buttonDisabled = computed(() => {
  return isCreating.value || cartIsEmpty.value;
});
</script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"
    ></div>
    <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
      <DrawerHead />

      <div v-if="!props.totalPrice || orderId" class="flex h-full items-center">
        <InfoBlock
          v-if="!props.totalPrice && !orderId"
          title="Your cart is empty"
          description="Please add some shoes to your cart"
          image-url="/package-icon.png"
        />
        <InfoBlock
          v-if="orderId"
          title="Order placed"
          :description="`Order number is ${orderId} will send you by curier in 3 days`"
          image-url="/order-success-icon.png"
        />
      </div>

      <div v-else>
        <CartItemList />
        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Summ:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ props.totalPrice }} uah</b>
          </div>
          <div class="flex gap-2">
            <span>Tax 20%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ props.tax }} uah</b>
          </div>
          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-4 bg-lime-500 w-full text-white disabled:bg-slate-300 cursor-pointer rounded-xl py-3 hover:bg-lime-600 active:bg-lime-700 transition"
          >
            Checkout Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
