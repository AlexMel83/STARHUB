<template>
  <header
    class="flex items-center justify-between border-b border-slate-300 px-10 py-8"
  >
    <NuxtLink to="/sneakers/home" class="flex items-center gap-4">
      <NuxtImg class="w-10" src="./../public/logo.png" alt="Logo" />
      <div>
        <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
        <p class="text-slate-500">The Shop of the best shoes</p>
      </div>
    </NuxtLink>

    <ul class="flex items-center gap-10 text-gray-500">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 hover:text-black cursor-pointer"
      >
        <NuxtImg width="20" src="./../public/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} uah</b>
      </li>
      <NuxtLink to="/sneakers/favorites">
        <li class="flex items-center gap-3 hover:text-black cursor-pointer">
          <NuxtImg width="20" src="./../public/heart.svg" alt="Cart" />
          <span>Favorites</span>
        </li>
      </NuxtLink>
      <NuxtLink to="/sneakers/orders">
        <li class="flex items-center gap-3 hover:text-black cursor-pointer">
          <NuxtImg width="20" src="./../public/profile.svg" alt="Cart" />
          <span>Profile</span>
        </li>
      </NuxtLink>
    </ul>
  </header>
</template>

<script setup>
defineProps({
  totalPrice: Number,
});
const emit = defineEmits(["openDrawer"]);
</script>
