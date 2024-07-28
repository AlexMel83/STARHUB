<script setup lang="ts">
const { $api } = useNuxtApp();

useSeoMeta({
  title: "Favorites | StarHub CRM",
});

const renderFavorites = ref<any[]>([]);

onMounted(async () => {
  try {
    const { data: favorites } = await $api.sneakers.getFavoriteSneakers();
    renderFavorites.value = favorites;
  } catch (error) {
    console.error(error);
  }
});

const addToFavorites = async (favorite: any) => {
  if (favorite.isFavorite) {
    try {
      favorite.isFavorite = false;
      await $api.sneakers.removeFavoriteSneakers(favorite.id);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      favorite.isFavorite = true;
      await $api.sneakers.addFavoriteSneakers(favorite.id);
    } catch (error) {
      console.error(error);
    }
  }
};
provide("addToFavorites", addToFavorites);
</script>

<template>
  <div>
    <h1>My Favorites</h1>
    <CardList
      v-if="renderFavorites.length"
      :items="renderFavorites"
      class="mt-10"
    />
  </div>
</template>
