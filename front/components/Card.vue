<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavotite: Function,
});

const addToFavorites = inject("addToFavorites");

const removeFromFavorites = inject("removeFromFavorites");

const onClickFavotite = () => {
  props.isFavorite ? removeFromFavorites(props.id) : addToFavorites(props.id);
};
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl"
  >
    <img
      @click="onClickFavotite"
      :src="isFavorite ? '_nuxt/public/like-2.svg' : '_nuxt/public/like-1.svg'"
      alt="like-2"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="sneakers" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price:</span>
        <b>{{ price }} uah</b>
      </div>
      <img
        @click="onClickAdd"
        :src="isAdded ? '_nuxt/public/checked.svg' : '_nuxt/public/plus.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
