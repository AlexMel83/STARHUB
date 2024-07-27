<script setup>
const emit = defineEmits(["onClickRemove"]);
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
});
</script>

<template>
  <div
    class="gap-4 items-center flex w-full border border-slate-200 p-4 rounded-xl"
  >
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex mt-2 justify-between">
        <b class="flex-1">{{ price }} uah</b>
        <img
          @click="() => emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer w-8 h-8"
          src="/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>
