import { usePokemonGame } from '../../../../src/modules/pokemon/composables/usePokemonGame.ts';
import { withSetup } from '../../../utils/setup-utils.ts';
import { GameStatus } from '../../../../src/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import AxiosMockAdapter from 'axios-mock-adapter';

import { pokemonApi } from '../../../../src/modules/pokemon/api/pokemonApi';
import { fakePokemonsData } from '../../../mocks/fake-pokemons-data';
import { expect } from 'vitest';
import confetti from 'canvas-confetti';


const mockPokemonApi = new AxiosMockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: fakePokemonsData,
});
vi.mock('canvas-confetti', () => ({
  default: vi.fn(() => ({
    particleCount: 400,
    spread: 70,
    origin: { y: 0.6 },
  })),
}));

describe('usePokemonGame', () => {
  test('should have the correct properties', async () => {
    const [result, app] = withSetup(usePokemonGame);
    expect(result.gameStatus.value).toEqual(GameStatus.Playing);
    expect(result.isLoading.value).toEqual(true);
    expect(result.pokemonOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBeUndefined();

    await flushPromises();

    expect(result.isLoading.value).toEqual(false);
    expect(result.pokemonOptions.value.length).toEqual(4);

    expect(result.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });

  });

  test('should get the next round', async () => {
    const [result, app] = withSetup(usePokemonGame);
    await flushPromises();

    expect(result.pokemonOptions.value.length).toEqual(4);
    result.getNextRound(5);
    expect(result.pokemonOptions.value.length).toEqual(5);
    expect(result.gameStatus.value).toEqual(GameStatus.Playing);
  });
  test('should check the pokemons is different when getNextRound is called', async () => {
    const [result, app] = withSetup(usePokemonGame);
    await flushPromises();
    const firstPokemonOptions = result.pokemonOptions.value;
    result.getNextRound(4);
    expect(result.pokemonOptions.value).not.toEqual(firstPokemonOptions);
  });
  test('should check the correct answer', async () => {
    const [result, app] = withSetup(usePokemonGame);
    await flushPromises();
    expect(result.gameStatus.value).toEqual(GameStatus.Playing);
    const correctId = result.randomPokemon.value.id;
    result.checkAnswer(correctId);
    expect(confetti).toHaveBeenCalled(true);
    expect(confetti).toBeCalledWith({
      particleCount: 400,
      spread: 70,
      origin: { y: 0.6 },
    })
    expect(result.gameStatus.value).toEqual(GameStatus.Won);
  });
  test('should check the incorrect answer', async () => {
    const [result, app] = withSetup(usePokemonGame);
    await flushPromises();
    expect(result.gameStatus.value).toEqual(GameStatus.Playing);
    const correctId = result.randomPokemon.value.id++;
    result.checkAnswer(correctId);
    expect(result.gameStatus.value).toEqual(GameStatus.Lost);
  });
});
