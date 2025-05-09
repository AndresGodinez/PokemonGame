<template>
  <section class="flex flex-col justify-center items-center  w-screen">
    <h1>Hello</h1>
    <ul class="mt-5">
      <li>Pokeon 1</li>
      <li>Pokeon 2</li>
      <li>Pokeon 3</li>
      <li>Pokeon 4</li>
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

<style scoped>
@reference "@/assets/styles.css";

li {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100 ;
}

</style>
