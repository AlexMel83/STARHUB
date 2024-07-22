<script setup lang="ts">
import CartItemList from "./CartItemList.vue";
</script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"
    ></div>
    <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
      <DrawerHead />
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Summ:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>1290 uah</b>
        </div>
        <div class="flex gap-2">
          <span>Tax 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>65 uah</b>
        </div>
        <button
          disabled
          class="mt-4 bg-lime-500 w-full text-white disabled:bg-slate-300 cursor-pointer rounded-xl py-3 hover:bg-lime-600 active:bg-lime-700 transition"
        >
          Checkout Order
        </button>
      </div>
    </div>
  </div>
</template>
