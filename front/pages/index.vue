<template>
  <main>
    <section class="search">
      <SearchInput />
    </section>
    <section class="housing-list" :class="{ blurred: isMenuOpen }">
      <div class="housing-wrapper">
        <template v-if="filteredHousing?.length > 0 && !isLoading">
          {{ filteredHousing }}
        </template>
      </div>
    </section>
  </main>
</template>

<script setup>
import SearchInput from "../components/SearchInput.vue";
</script>

<style scoped></style>
