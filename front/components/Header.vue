<template>
  <header
    class="flex items-center justify-between border-b border-slate-300 px-10 py-8"
  >
    <div class="flex items-center gap-4">
      <img class="w-10" src="./../public/logo.png" alt="Logo" />
      <div>
        <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
        <p class="text-slate-500">The Shop of the best shoes</p>
      </div>
    </div>

    <ul class="flex items-center gap-10 text-gray-500">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 hover:text-black cursor-pointer"
      >
        <img src="./../public/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} uah</b>
      </li>
      <li class="flex items-center gap-3 hover:text-black cursor-pointer">
        <img src="./../public/heart.svg" alt="Cart" />
        <span>Favorites</span>
      </li>
      <li class="flex items-center gap-3 hover:text-black cursor-pointer">
        <img src="./../public/profile.svg" alt="Cart" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
defineProps({
  totalPrice: Number,
});
const emit = defineEmits(["openDrawer"]);
</script>
