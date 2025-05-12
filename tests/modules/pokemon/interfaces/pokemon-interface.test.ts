import type { Pokemon } from '../../../../src/modules/pokemon/interfaces';

describe('PokemonInterface', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
  };

  it('should have the id property have to a number', () => {

    expect(pokemon).toHaveProperty('id');
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  it('should have the name property have to a string', () => {

    expect(pokemon).toHaveProperty('name');
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
