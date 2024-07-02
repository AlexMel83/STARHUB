<script setup lang="ts">
import { useDealSlideStore } from '~/stores/deal-slide.store';

const store = useDealSlideStore();

const isLocalOpen = computed({
    get: ()=> store.isOpen,
    set: value => {
        store.isOpen = value;
    },
});

</script>

<template>
    <div>


    </div>
</template>