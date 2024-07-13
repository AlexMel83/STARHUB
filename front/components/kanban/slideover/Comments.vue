<script lang="ts" setup>
import dayjs from "dayjs";
import { useComments } from "./useComments";
import { useCreateComment } from "./useCreateComment";

const { comments, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });
</script>

<template>
  <UiInput
    placeholder="Оставьте комментарий"
    v-model="commentRef"
    @keyup.enter="writeComment"
    tabindex="0"
  />

  <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
  <div v-else-if="comments.length">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="flex items-start mt-5"
    >
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
      <div class="border-border bg-black/20 rounded p-3 w-full">
        <div class="mb-2 text-sm">
          Комментарий {{ dayjs(comment.created_at).format("HH:mm") }}
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>
