<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import {useKanbanQuery} from '@/components/kanban/useKanbanQuery';
import {convertCurrency} from '@/lib/convertCurrency.js';
import dayjs from 'dayjs';

useSeoMeta({
    title: 'Home | StarHub CRM'
})

const dragCardRef = ref<ICard | null>(null);
const dragColumnRef = ref<IColumn | null>(null);
 const {data, isLoading, refetch} = useKanbanQuery();

</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">StarHub CRM</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id">
                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
                        {{ column.name }}
                    </div>
                    <div>
                        <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true">
                            <UiCardHeader role="button">{{ card.name }}</UiCardHeader>
                            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
                            <UiCardContent>{{ card.customer }}</UiCardContent>
                            <UiCardFooter>{{ dayjs(card.created_at).format('DD MMMM YYYY') }}</UiCardFooter>
                        </UiCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>