<template>
  <section>
    <img v-if="!showPokemon"
         :src="pokemonImage"
         alt="world-pokemon" class="brightness-0 h-[200px] fade-in" />
    <img v-else
         :src="pokemonImage"
         alt="world-pokemon" class=" h-[200px]" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(),
  { showPokemon: false });
const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});

</script>

<style lang="scss" scoped>
img {
  user-select: none;
  height: 200px;
}

</style>
