import { mount } from '@vue/test-utils';
import PokemonGame from '../../../../src/modules/pokemon/pages/PokemonGame.vue';
import { GameStatus } from '../../../../src/modules/pokemon/interfaces';
import type { Mock } from 'vitest';
import { usePokemonGame } from '../../../../src/modules/pokemon/composables/usePokemonGame';
import { expect } from 'vitest';

vi.mock('../../../../src/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonOptions = [
  {
    id: 1,
    name: 'bulbasaur',
  },
  {
    id: 2,
    name: 'ivysaur',
  },
  {
    id: 3,
    name: 'venusaur',
  },
  {
    id: 4,
    name: 'charmander',
  },
];

describe('PokemonGame', () => {
  test('should be executed as expected with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      pokemonOptions: [],
      gameStatus: GameStatus.Playing,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });
    const wrapper = mount(PokemonGame, {});
    expect(wrapper.get('h1').text()).toEqual('Espere por favor');
    expect(wrapper.get('h1').classes()).toContain('text-3xl');
    expect(wrapper.get('h3').text()).toEqual('Cargando...');
    expect(wrapper.get('h3').classes()).toContain('animate-pulse');
  });
  test('should be has the correct components pokemonPicture and PokemonOptions', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonOptions.at(0),
      isLoading: false,
      pokemonOptions,
      gameStatus: GameStatus.Playing,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });
    const wrapper = mount(PokemonGame, {});
    const pokemonsFlat = pokemonOptions.map((pokemon) => pokemon.name);
    expect(wrapper.find('h1').text()).toEqual('Who\'s that Pokémon?');
    const buttonClases = '.bg-white.shadow-md.rounded-lg.p-3.m-2.cursor-pointer.w-40.text-center.transition-all.hover\\:bg-gray-100.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-75.disabled\\:text-xl';
    const buttons = wrapper.findAll(buttonClases);
    expect(buttons.length).toBe(pokemonOptions.length);
    expect(pokemonsFlat).toContain(pokemonOptions.at(0).name);
  });

  test('should be show the button for a new game when the game is lost', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonOptions.at(0),
      isLoading: false,
      pokemonOptions,
      gameStatus: GameStatus.Lost,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });
    const wrapper = mount(PokemonGame, {});
    const classesButtonForNewGame = '.bg-blue-500.p-2.rounded.text-xl.px-4.text-white.flex.flex-col';
    const buttonNewGame = wrapper.find(classesButtonForNewGame);
    expect(buttonNewGame.exists()).toBe(true);
    expect(buttonNewGame.text()).toBe('New Game');

  });

  test("should be the function whit a new game is called when clicked the button for a new game", async () => {
    const spyNextRound = vi.fn();
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonOptions.at(0),
      isLoading: false,
      pokemonOptions,
      gameStatus: GameStatus.Lost,
      checkAnswer: vi.fn(),
      getNextRound: spyNextRound,
    });
    const wrapper = mount(PokemonGame, {});
    const classesButtonForNewGame = '.bg-blue-500.p-2.rounded.text-xl.px-4.text-white.flex.flex-col';
    const buttonNewGame = wrapper.find(classesButtonForNewGame);
    await buttonNewGame.trigger('click');
    expect(spyNextRound).toHaveBeenCalled();
  });
});
