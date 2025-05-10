<template>
  <section v-if="isLoading || randomPokemon.id === null"
           class="flex flex-col justify-center items-center h-screen w-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold mb-4">Who's that Pokémon?</h1>
      <div class="flex gap-4 justify-center">
        <h2 class="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
          Won: {{ won }}
        </h2>
        <h2 class="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
          Lost: {{ lost }}
        </h2>
      </div>
    </div>
    <button v-if="gameStatus === GameStatus.Lost" class="bg-blue-500 p-2 rounded text-xl px-4 text-white flex flex-col"
            @click="getNextRound()">New Game
    </button>
    <PokemonPicture :pokemon-id="randomPokemon.id"
                    :show-pokemon="gameStatus !== GameStatus.Playing" />

    <PokemonOptions :options="options"
                    :block-selections="gameStatus !== GameStatus.Playing"
                    :correct-answer="randomPokemon.id"
                    @selected-option="checkAnswer" />
  </section>
</template>

<script setup lang="ts">

import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame.ts';
import { GameStatus } from '@/modules/pokemon/interfaces';


const {
  isLoading,
  randomPokemon,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  getNextRound,
  won,
  lost
} = usePokemonGame();
</script>
