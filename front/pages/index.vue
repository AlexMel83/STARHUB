<template>
  <div class="bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black">
    <Header />
    <div class="flex">
      <Card />
      <Card />
      <Card />
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
