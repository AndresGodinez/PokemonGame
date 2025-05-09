import { GameStatus, type PokemonListResponse } from '@/modules/pokemon/interfaces'
import { onMounted, ref } from 'vue'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi.ts'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')
    console.log({ response: response.data })
  }
  onMounted(() => {
    getPokemons()
  })
  return {
    gameStatus
  }
}
