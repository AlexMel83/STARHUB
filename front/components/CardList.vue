<script setup>
const props = defineProps({
  items: Array,
  isFavorites: Boolean,
});
const emit = defineEmits(["addToCart"]);
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in props.items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :item="item"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
