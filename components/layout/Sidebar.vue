<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink to="/">
            <NuxtImg src="/logo.svg" alt="" width="100px" /> 
        </NuxtLink>
        <button class="absolute text-white top-2 right-3 transition-colors
        hover:text-primary">
            <Icon name="line-md:logout" size="20"/>
            Logout
        </button>
    </aside>
</template>
<script setup lang="ts">

</script>
<style lang="">
    
</style>