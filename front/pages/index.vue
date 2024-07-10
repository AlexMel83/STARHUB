<script setup lang="ts">
useSeoMeta({
    title: 'Home | StarHub CRM'
})

</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">StarHub CRM</h1>
        <div>
            <UiCard class="mb-3" draggable="true">
                <UiCardHeader role="button">Name card</UiCardHeader>
                <UiCardContent>Company</UiCardContent>
                <UiCardFooter>Date</UiCardFooter>
            </UiCard>
        </div>
    </div>
</template>