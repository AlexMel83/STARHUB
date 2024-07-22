<template>
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <!-- <Drawer /> -->
    <Header />
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">All Shoes</h2>
        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
          <input
            class="boredr rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <CardList />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Orders | StarHub CRM",
});
</script>
<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
