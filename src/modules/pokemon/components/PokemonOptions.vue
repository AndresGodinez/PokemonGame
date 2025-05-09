<template>
  <section class="flex flex-col justify-center items-center  w-screen">
    <ul class="mt-5">
      <li>Pokeon 1</li>
      <li>Pokeon 2</li>
      <li>Pokeon 3</li>
    </ul>
  </section>

</template>

<script>
export default {
  setup() {

    return {}
  }
}
</script>

<style lang="scss" scoped>
li {
  @apply bg-white text-bold shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all duration-300 hover:bg-gray-200;
}

</style>
