<template>
  <section class="flex flex-col justify-center items-center  w-screen">
    <button
      v-for="{name, id} in options"
      :key="id"
      @click="$emit('selectedOption', id)"
      class="bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100 capitalize disabled:shadow-none disabled:bg-gray-75 disabled:text-xl"
      :class="{
         '!bg-blue-500 !text-white': id === correctAnswer && blockSelections,
        '!bg-red-500 !text-white': id !== correctAnswer && blockSelections
      }"
      :disabled="blockSelections"
    >
      {{ name }}
    </button>
  </section>

</template>

<script setup lang="ts">
import type { Pokemon } from '@/modules/pokemon/interfaces';

interface Props {
  options: Pokemon[];
  blockSelections: boolean;
  correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();

</script>

<style scoped lang="postcss">

</style>
