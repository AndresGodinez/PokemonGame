import { usePokemonGame } from '../../../../src/modules/pokemon/composables/usePokemonGame.ts';
import { withSetup } from '../../../utils/setup-utils.ts';
import { GameStatus } from '../../../../src/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';

describe('usePokemonGame', () => {
  test('should have the correct properties', async () => {
    const [result, app] = withSetup(usePokemonGame);
    expect(result.gameStatus.value).toEqual(GameStatus.Playing);
    expect(result.isLoading.value).toEqual(true);
    expect(result.pokemonOptions.value).toEqual([]);
    expect(result.randomPokemon.value).toBeUndefined();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await flushPromises();

    expect(result.isLoading.value).toEqual(false);
    expect(result.pokemonOptions.value.length).toEqual(4);
    console.log(result.randomPokemon.value);

    expect(result.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });


  });
});
