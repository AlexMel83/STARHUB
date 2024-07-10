<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else class="flex-shrink-0 w-auto max-w-xs">
    <LayoutSidebar v-if="authStore.user.isactivated" />
    <ModalLoginRegistration v-else />
  </section>
</template>
<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();

const { $api, $load } = useNuxtApp();
const errors = reactive({
  textError: "",
});

onMounted(async () => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  
  const urlParams = new URLSearchParams(window.location.search);
  const authLink: string | null = urlParams.get('authLink');
  console.log(authLink)
  if (authLink && uuidRegex.test(authLink)) {
    const authUser = await $load(async () => $api.auth.getAuthUser(authLink), errors);
    localStorage.setItem('authUser', JSON.stringify(authUser));
    authStore.set({
      email: authUser.data.email,
      name: authUser.data.name,
      role: authUser.data.role,
      isactivated: authUser.data.isactivated,
    });
  }
  console.log(errors.textError)
  isLoadingStore.set(false);
});
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
</style>
