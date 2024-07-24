<script setup lang="ts">
interface Item {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
}

const props = defineProps<{
  items: Item[];
}>();

const onClickAdd = () => {
  alert("text");
};
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in props.items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickAdd="onClickAdd"
      :id="item.id"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
