<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import {convertCurrency} from '~/lib/convertCurrency';
import dayjs from 'dayjs';

useSeoMeta({
    title: 'Home',
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const {data, isLoading, refetch} = useKanbanQuery();

</script>

<template lang="">
    <div class="p-10">
        <h1 class="font-bold text-2x1 mb-10">StarHub Wellcome!</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id">
                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
                        {{column.name}}
                    </div>
                    <div>
                        <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true">
                            <UiCardHeader role="button"> 
                                <UiCardTitle>{{card.name}}</UiCardTitle>
                                <UiCardDescription class="mt-2 block">{{convertCurrency(card.price)}}</UiCardDescription>
                            </UiCardHeader>
                            <UiCardContent class="text-xs"> Company {{card.companyName}} </UiCardContent>
                            <UiCardFooter> {{dayjs(card.$createdAt).format('DD MMMM YYYY')}} </UiCardFooter>
                        </UiCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>