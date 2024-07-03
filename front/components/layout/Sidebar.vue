<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink to="/">
            <NuxtImg src="/logo.svg" alt="" width="100px" /> 
        </NuxtLink>
        <button @click="logout" class="absolute top-2 right-3 transition-colors
        hover:text-primary">
            <Icon name="line-md:logout" size="20"/>
            Logout
        </button>
        <LayoutMenu />
    </aside>
</template>
<script setup lang="ts">
import { account } from '~/lib/appwrite';
import {useAuthStore, useIsLoadingStore} from '~/stores/auth.store';

const store = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();
const logout = async ()=>{
    isLoadingStore.set(true);
    await account.deleteSession('current');
    store.clear();
    await router.push('/login');
    isLoadingStore.set(false);
}
</script>
<style scoped lang="">
    
</style>