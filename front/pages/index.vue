<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import { generateColumnStyle } from "@/components/kanban/generate-gradient";
import { convertCurrency } from "@/lib/convertCurrency.js";
import type { EnumStatus, ServerResponse } from "~/types/deals.types";
import { useMutation } from "@tanstack/vue-query";
import { useDealSlideStore } from "@/stores/deal-slide.store";
import dayjs from "dayjs";

useSeoMeta({
  title: "Home | StarHub CRM",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const dragColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const store = useDealSlideStore();
const { $api, $load } = useNuxtApp();
const errors = reactive({
  textError: "",
});

type TypeMutationVariables = {
  docId: string;
  status: string;
};

const { mutate } = useMutation({
  mutationKey: ["move card"],
  mutationFn: async ({ docId, status }: TypeMutationVariables) => {
    const response = await $api.deals.updDeal({ id: Number(docId), status });
    return response;
  },
  onSuccess: () => {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    const status = targetColumn.id as EnumStatus;
    if (status) {
      mutate({ docId: String(dragCardRef.value!.id), status });
    } else {
      errors.textError = "Status is undefined";
    }
  }
}

const colorMode = useColorMode();
console.log(colorMode.preference);
</script>

<template>
  <div class="p-10">
    <ClientOnly>
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </ClientOnly>
    <h1 class="font-bold text-2x1 mb-10">StarHub CRM Wellcome!</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-screen"
        >
          <div
            class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
            :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="mb-3"
              draggable="true"
              @dragstart="() => handleDragStart(card, column)"
            >
              <UiCardHeader role="button" @click="store.set(card)">
                <UiCardTitle> {{ card.name }}</UiCardTitle>
                <UiCardDescription class="mt-2 block">
                  {{ convertCurrency(card.price) }}
                </UiCardDescription>
              </UiCardHeader>
              <UiCardContent class="text-xs"
                ><div>Company:</div>
                {{ card.customer }}</UiCardContent
              >
              <UiCardFooter>{{
                dayjs(card.created_at).format("DD MMMM YYYY")
              }}</UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>
      <KanbanSlideover />
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
