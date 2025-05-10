<template>
  <section v-if="isLoading || randomPokemon.id === null"
           class="flex flex-col justify-center items-center h-screen w-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="mt-5">Quíen es este pokemon?</h1>
    <h1>{{ randomPokemon }}</h1>
    <h1>Status {{ gameStatus }}</h1>
    <PokemonPicture :pokemon-id="randomPokemon.id"
                    :show-pokemon="gameStatus !== GameStatus.Playing" />

    <PokemonOptions :options="options"
                    :block-selections="gameStatus !== GameStatus.Playing"
                    :correct-answer="randomPokemon.id"
                    @selected-option="checkAnswer"/>
  </section>
</template>

<script setup lang="ts">

import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame.ts';
import { GameStatus } from '@/modules/pokemon/interfaces';


const { isLoading, randomPokemon, gameStatus, pokemonOptions:options, checkAnswer } = usePokemonGame();
</script>
