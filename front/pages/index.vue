<template>
  <div
    class="bg-white w-4/5 m-auto h-screen rounded-xl shadow-xl mt-14 text-black"
  >
    <Header />
    <Card />
    <Card />
    <Card />
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
