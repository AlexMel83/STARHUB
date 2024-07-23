<template>
  <div
    class="overflow-auto h-full bg-white w-4/5 m-auto mx-8 rounded-xl shadow-xl mt-14 text-black"
  >
    <!-- <Drawer /> -->
    <Header />
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8">All Shoes</h2>
        <div class="flex gap-4 items-center">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 bordrer rounded-md outline-none items-center"
          >
            <option value="title">By Name</option>
            <option value="price">By Low Price</option>
            <option value="-price">By High Price</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
            <input
              class="boredr rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
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

useSeoMeta({
  title: "Orders | StarHub CRM",
});

interface Item {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
}

const items = ref<Item[]>([]);
const sortBy = ref("");
const searchQuery = ref("");

const onChangeSelect = (event: Event) => {
  if (event.target) {
    sortBy.value = event.target.value;
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:4041/sneakers");
    items.value = data;
  } catch (error) {
    console.error(error);
  }
});

watch(sortBy, async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:4041/sneakers?sortBy=" + sortBy.value,
    );
    items.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
body {
  background-color: rgb(247 254 231);
}
</style>
