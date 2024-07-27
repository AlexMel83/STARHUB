<script setup lang="ts">
import type { Item } from "@/types/sneakers.types.js";

const props = defineProps({
  items: {
    type: Array as () => Item[],
    required: true,
  },
});

const emit = defineEmits(["addToCart"]);
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in props.items"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickAdd="() => emit('addToCart', item)"
      :item="item"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
