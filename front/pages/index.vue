<template>
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <Drawer v-if="drawerOpen" :totalPrice="totalPrice" :tax="tax" />
    <Header @open-drawer="openDrawer" :totalPrice="totalPrice" />
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
      <CardList :items="items" class="mt-10" @add-to-cart="onClickAddCart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Favorite } from "~/types/sneakers.types.js";
import axios from "axios";

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
const cart = ref<Item[]>([]);
const drawerOpen = ref(false);
const filters = reactive({
  sortBy: "",
  searchQuery: "",
});
const errors = reactive({
  textError: "",
});
const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0),
);
const tax = computed(() => Math.round(totalPrice.value * 0.2));

const createOrder = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};
const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

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
    const { data: favorites }: { data: Favorite[] } = await $load(
      () => $api.sneakers.getFavoriteSneakers(),
      errors,
    );
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.id === item.id);

      return {
        ...item,
        isFavorite: Boolean(favorite),
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
      await $api.sneakers.removeFavoriteSneakers(item.id);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      item.isFavorite = true;
      await $api.sneakers.addFavoriteSneakers(item.id);
    } catch (error) {
      console.error(error);
    }
  }
};

const addToCart = (item: Item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item: Item) => {
  item.isAdded = false;
  cart.value.splice(cart.value.indexOf(item), 1);
};
const onClickAddCart = (item: Item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
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
provide("cart", {
  cart,
  addToCart,
  removeFromCart,
  openDrawer,
  closeDrawer,
});
</script>

<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
