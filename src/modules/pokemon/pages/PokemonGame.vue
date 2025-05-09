<template>
  <section v-if="false" class="flex flex-col justify-center items-center h-screen w-screen">
    <h1>Espere por favor</h1>
    <h3 class="animate-pulse">Cargando...</h3>
  </section>
  <section class="flex flex-col justify-center items-center  w-screen">
    <h1>Quíen es este pokemon?</h1>
    <PokemonPicture />
    <!--    pokemon-options-->
  </section>
</template>

<script setup lang="ts">

import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
</script>
