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
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <NuxtLink to="/sneakers/home">
      <h1 class="text-1.5xl font-bold px-4">My Favorites</h1>
    </NuxtLink>
    <CardList
      v-if="renderFavorites.length"
      :items="renderFavorites"
      is-favorites
      class="mt-10"
    />
  </div>
</template>
<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
