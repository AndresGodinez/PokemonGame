import type { PokemonListResponse } from '../../../../src/modules/pokemon/interfaces';

describe('PokemonListResponse', () => {
  const Results: PokemonListResponse = {
    'count': 1302,
    'next': 'https://pokeapi.co/api/v2/pokemon/?offset=2&limit=2',
    'previous': 'https://pokeapi.co/api/v2/pokemon/?offset=2&limit=2',
    'results': [
      {
        'name': 'bulbasaur',
        'url': 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        'name': 'ivysaur',
        'url': 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ],
  };
  it('should have the count property have to a number', () => {
    expect(Results).toHaveProperty('count');
    expect(Results.count).toEqual(expect.any(Number));
  });
  it('should have the next property have to a string', () => {
    expect(Results).toHaveProperty('next');
    expect(Results.next).toEqual(expect.any(String));
  });
  it('should have the previous property have to a string', () => {
    expect(Results).toHaveProperty('previous');
    expect(Results.previous).toEqual(expect.any(String));
  });
  it('should have the results property have to be an array', () => {
    expect(Results).toHaveProperty('results');
    expect(Results.results).toEqual(expect.any(Array));
  });


});
