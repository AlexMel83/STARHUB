<template>
    <section class="grid">
        <LayoutSidebar />
        <div>
          <slot />  
        </div>
    </section>
    
</template>
<script setup lang="ts">

</script>
<style scoped>
    .grid{
        display: grid;
        grid-template-columns: 1fr 6fr;
        min-height: 100vh;
    }
</style>