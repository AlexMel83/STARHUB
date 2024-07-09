<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else class="flex-shrink-0 w-auto max-w-xs">
    <LayoutSidebar v-if="store.isAuth" />
    <ModalLoginRegistration v-else />
  </section>
</template>
<script setup lang="ts">
import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  // try {
  //   const user = await account.get();
  //   if (user) store.set(user);
  // } catch (error) {
  //   router.push("/login");
  // } finally {
  isLoadingStore.set(false);
  // }
});
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
</style>
