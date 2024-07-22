<template>
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <Drawer />
    <Header />
    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">All Shoes</h2>
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
