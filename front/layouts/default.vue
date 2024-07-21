<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section v-else class="flex-shrink-0 w-auto max-w-xs">
    <LayoutSidebar v-if="authStore?.authUser?.user.isactivated" />
    <ModalLoginRegistration v-else />
    <ClientOnly>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();

const { $api, $load } = useNuxtApp();
const router = useRouter();
const errors = reactive({
  textError: "",
});

onMounted(async () => {
  authStore.initialize();

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const urlParams = new URLSearchParams(window.location.search);
  const authLink: string | null = urlParams.get("authLink");

  if (!authStore.authUser && authLink && uuidRegex.test(authLink)) {
    const { data } = await $load(
      async () => $api.auth.getAuthUser(authLink),
      errors,
    );
    if (data) {
      const authUser: any = {
        user: data,
        accessToken: "mock",
        expAcToken: "mock",
      };
      await router.push("/");
      authStore.setUser(authUser);
    }
  }
  isLoadingStore.set(false);
});

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
</style>
