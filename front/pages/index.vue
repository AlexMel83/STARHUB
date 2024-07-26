<template>
  <Drawer v-if="drawerOpen" />
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <Header />
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">All Shoes</h2>
        <div class="flex gap-4 items-center">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none items-center"
          >
            <option value="">Select...</option>
            <option value="title">By Name</option>
            <option value="price">By Low Price</option>
            <option value="-price">By High Price</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" class="mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, reactive, onMounted, watch } from "vue";
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";

useSeoMeta({
  title: "Orders | StarHub CRM",
});

interface Item {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
}

const { $api, $load } = useNuxtApp();
const items = ref<Item[]>([]);
const drawerOpen = ref(false);
const filters = reactive({
  sortBy: "",
  searchQuery: "",
});
const errors = reactive({
  textError: "",
});

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  filters.sortBy = target.value;
};

const onChangeSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  filters.searchQuery = target.value;
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await $load(
      () => $api.favoriteSneakers.getFavoriteSneakers(),
      errors,
    );
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.id === item.id);

      if (!favorite) {
        return {
          ...item,
          isFavorite: false,
        };
      }

      return {
        ...item,
        isFavorite: true,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

const addToFavorites = async (item: Item) => {
  if (item.isFavorite) {
    try {
      item.isFavorite = false;
      await $api.favoriteSneakers.removeFavoriteSneakers(item.id);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      item.isFavorite = true;
      await $api.favoriteSneakers.addFavoriteSneakers(item.id);
    } catch (error) {
      console.error(error);
    }
  }
};

const fetchItems = async () => {
  try {
    const params: any = {};
    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }
    if (filters.searchQuery) {
      params.title = filters.searchQuery;
    }
    const { data } = await axios.get("http://localhost:4041/sneakers", {
      params,
    });
    items.value = data.map((item: any) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
    }));
    await fetchFavorites();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});

watch(filters, fetchItems);

provide("addToFavorites", addToFavorites);
</script>

<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
