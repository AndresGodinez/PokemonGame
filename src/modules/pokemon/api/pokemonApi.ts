import axios from 'axios'

const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { pokemonApi }
