<script setup lang="ts">
import dayjs from "dayjs";
import { convertCurrency } from "~/lib/convertCurrency";
import { useDealSlideStore } from "~/stores/deal-slide.store";

const store = useDealSlideStore();
</script>

<template>
  <div class="border-border bg-black/20 rounded p-3">
    <div class="uppercase bold text-xl mb-4">About deal</div>
    <KanbanSlideoverLabel label-text="Summ">
      {{ convertCurrency(store.card?.price || 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UiBadge variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Client">
      {{ store.card?.customer }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Criated">
      {{ dayjs(store.card?.created_at).format("DD MMMM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>
