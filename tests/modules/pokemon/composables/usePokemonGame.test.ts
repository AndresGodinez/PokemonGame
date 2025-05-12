import { usePokemonGame } from '../../../../src/modules/pokemon/composables/usePokemonGame.ts';
import { withSetup } from '../../../utils/setup-utils.ts';

describe('usePokemonGame', () => {
  test('should have the correct properties', () => {
    const [result, app] = withSetup(usePokemonGame);

  });
});
