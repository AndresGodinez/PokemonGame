import PokemonOptions from '../../../../src/modules/pokemon/components/PokemonOptions.vue';
import { mount } from '@vue/test-utils';

const pokemonOptions = [
  {
    id: 1,
    name: 'Bulbasaur',
  },
  {
    id: 2,
    name: 'Charmander',

  },
  {
    id: 3,
    name: 'Squirtle',
  },
];

describe('PokemonOptions ', () => {
  it('should be render correct options', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: pokemonOptions,
        blockSelections: false,
        correctAnswer: 1,
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(pokemonOptions.length);
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(pokemonOptions[index].name);
      expect(button.attributes('disabled')).toBeUndefined();
    });
  });
  it('should be trigger the correct event when the option is selected', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: pokemonOptions,
        blockSelections: false,
        correctAnswer: 1,
      },
    });
    const buttons = wrapper.findAll('button');
    await buttons[0].trigger('click');
    // console.log(wrapper.emitted("selectedOption"));
    expect(wrapper.emitted()).toHaveProperty('selectedOption');

    expect(wrapper.emitted().selectedOption[0]).toEqual([pokemonOptions[0].id]);
  });

  it('should disable buttons when blockSelection is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        options: pokemonOptions,
        blockSelections: true,
        correctAnswer: 1,
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(pokemonOptions.length);
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(pokemonOptions[index].name);
      expect(button.attributes('disabled')).toBeDefined();
    });
  });
  it('should be render the correct answer', async () => {
    const correctAnswer = 2;
    const wrapper = mount(PokemonOptions, {
      props: {
        options: pokemonOptions,
        blockSelections: true,
        correctAnswer,
      },
    });
    const buttons = wrapper.findAll('button');

    buttons.forEach((button, index) => {
      if (index === correctAnswer -1) {
        expect(button.classes()).toContain('!bg-blue-500');
      } else {
        expect(button.classes()).toContain('!bg-red-500');
      }
    });

  });
});
