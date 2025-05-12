import { GameStatus } from '../../../../src/modules/pokemon/interfaces';

describe('PokemonEnum', () => {
  test('should have the playing status', () => {
    const expectedStatus = 'playing';
    expect(GameStatus.Playing).toBe(expectedStatus);
  });
  test('should have the won status', () => {
    const expectedStatus = 'won';
    expect(GameStatus.Won).toBe(expectedStatus);
  });
  test('should have the lost status', () => {
    const expectedStatus = 'lost';
    expect(GameStatus.Lost).toBe(expectedStatus);
  });
});
