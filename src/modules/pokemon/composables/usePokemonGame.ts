import { GameStatus, type PokemonListResponse, type Pokemon } from '@/modules/pokemon/interfaces';
import { computed, onMounted, ref } from 'vue';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi.ts';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(()=>{
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  })
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
  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
    console.log({options: pokemonOptions.value});
  };
  const checkAnswer = (id: number) => {
    if (gameStatus.value !== GameStatus.Playing) return;
    if (id === randomPokemon.value.id) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 400,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        getNextRound();
      }, 2000);
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  }
  onMounted(async () => {
    // await new Promise((resolve => setTimeout(resolve, 1000)));
    pokemons.value = await getPokemons();
    getNextRound();
  });
  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    // methods
    getNextRound,
    checkAnswer
  };
};
