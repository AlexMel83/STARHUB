<template>
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <!-- <Drawer /> -->
    <Header />
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">All Shoes</h2>
        <div class="flex gap-4 items-center">
          <select
            class="py-2 px-3 bordrer rounded-md outline-none items-center"
          >
            <option>By Name</option>
            <option>By Low Price</option>
            <option>By High Price</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
            <input
              class="boredr rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" class="mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

useSeoMeta({
  title: "Orders | StarHub CRM",
});

interface Item {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
}

onMounted(() => {
  fetch("https://852a6f7a57bf5941.mokky.dev/items")
    .then((res) => res.json())
    .then((data) => console.log(data));
});
</script>

<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
