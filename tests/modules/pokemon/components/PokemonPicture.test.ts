import { mount } from '@vue/test-utils';
import PokemonPicture from '../../../../src/modules/pokemon/components/PokemonPicture.vue';

describe('PokemonPicture', () => {
  const wapper = mount(PokemonPicture, {
    props: {
      pokemonId: 1,
      showPokemon: false,
    },
  });
  const urlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';

  it('should render the Pokemon picture with the correct when showPokemon is false', () => {
    // console.log({ pokemon: wapper.html() });
    const image = wapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe(urlImage);
    expect(image.attributes('alt')).toBe('world-pokemon');
    // console.log({class: image.classes()});
    expect(image.classes()).toEqual(expect.arrayContaining(['fade-in', 'brightness-0']));
    expect(image.classes()).toContain('brightness-0');
  });

  it('should render the Pokemon picture with the correct when showPokemon is true', async () => {
    await wapper.setProps({ showPokemon: true });
    const image = wapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe(urlImage);
    expect(image.attributes('alt')).toBe('world-pokemon');
    expect(image.classes()).not.toContain('brightness-0');
  });
});
