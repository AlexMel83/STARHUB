<script setup lang="ts">
const onClickAdd = () => {
  alert("text");
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      :price="5000"
      :isAdded="false"
      :isFavorite="true"
      title="Man's shoes"
      imageUrl="_nuxt/public/sneakers/sneakers-1.jpg"
      :onClickAdd="onClickAdd"
    />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>
