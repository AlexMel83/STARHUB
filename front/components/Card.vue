<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function || null,
});

const visibleFavoriteButton = Boolean(props.onClickAdd);

const addToFavorites = inject("addToFavorites");
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl"
  >
    <img
      v-if="visibleFavoriteButton"
      @click="addToFavorites(item)"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="like-2"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="sneakers" />
    <p class="mt-2 text-black">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b class="font-bold text-black">{{ price }} uah</b>
      </div>
      <img
        v-if="visibleFavoriteButton"
        @click="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
