import { pokemonApi } from '../../../../src/modules/pokemon/api/pokemonApi';

describe('PokemonApi', () => {
  test('should be configured as expected', () => {
    const expectedBaseURL = 'https://pokeapi.co/api/v2/pokemon';
    expect(pokemonApi.defaults.baseURL).toBe(expectedBaseURL);
  });
});
