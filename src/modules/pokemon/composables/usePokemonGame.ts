import { GameStatus, type PokemonListResponse, type Pokemon } from '@/modules/pokemon/interfaces';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi.ts';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlPath = pokemon.url.split('/');
      return {
        name: pokemon.name,
        id: Number(urlPath[urlPath.length - 2]),
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };
  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
    console.log({options: pokemonOptions.value});
  };
  onMounted(async () => {
    await new Promise((resolve => setTimeout(resolve, 1000)));
    pokemons.value = await getPokemons();
    getNextOptions();
  });
  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    // methods
    getNextOptions,
  };
};
