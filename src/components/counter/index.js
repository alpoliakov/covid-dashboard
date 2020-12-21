import creators from '../../utils/creators';
import useLocalStorage from '../../utils/local-storage-accessors';

const counter = () => {
  const { createElement } = creators();
  const { getDataFromLocalStorage } = useLocalStorage();

  const setCounter = className => {
    const parent = document.querySelector(className);
    const children = [
      createElement({
        tag: 'div',
        classes: ['root__item_counter-search', 'counter-form'],
        children: [],
      }),
    ];

    const input = [
      createElement({
        tag: 'input',
        classes: ['search__form_text'],
        id: 'text_to_find',
        attributes: {
          type: 'text',
          value: ' ',
          placeholder: 'Search',
          autofocus: '',
          autocomplete: 'off',
        },
      }),
      // createElement({
      //   tag: 'input',
      //   classes: ['search__form_clear'],
      //   attributes: {
      //     type: 'button',
      //     value: '+', // make symbol cancel
      //     title: 'Clear field',
      //   },
      // }),
      createElement({
        tag: 'img',
        classes: ['trash', 'search__form_clear'],
        attributes: {
          alt: 'clear field',
          src: 'assets/icons/462216.svg',
        },
      }),
    ];
    parent.append(...children);
    document.querySelector('.root__item_counter-search').append(...input);
  };

  const createCountriesList = countries => {
    const ulTagToRemove = document.querySelector('.root__item_counter-list');
    if (ulTagToRemove !== null) {
      ulTagToRemove.remove();
    }
    const parent = document.querySelector('.root__item_counter');
    const ulTag = createElement({
      tag: 'ul',
      classes: ['root__item_counter-list'],
    });

    const arrChildren = countries.map(item =>
      createElement({
        tag: 'li',
        classes: ['countries'],
        attributes: { dataIso3: item.info.countryInfo.iso3 },
        children: [
          // { tag: 'img', classes: ['flags'], attributes: { src: item.flag } },
          { tag: 'p', classes: ['name__country'], innerText: item.info.country },
        ],
      }),
    );

    if (arrChildren.length === 0) {
      ulTag.append(
        createElement({
          tag: 'li',
          classes: ['countries'],
          attributes: { dataIso3: -1 },
          children: [
            { tag: 'p', classes: ['name__country'], innerText: 'Sorry...no countries to show... ' },
          ],
        }),
      );
    } else {
      ulTag.append(...arrChildren);
    }
    parent.append(ulTag);
  };

  const searchCountries = dataToSearch => {
    const data = getDataFromLocalStorage('countries').features;
    const result = [];
    for (const el of data) {
      if (el.info.country.toUpperCase().indexOf(dataToSearch) !== -1) {
        result.push(el);
      }
    }
    // or any way send result in case length === 0
    console.log(result);
    if (result.length > 0) {
      createCountriesList(result);
    }
  };

  return {
    setCounter,
    searchCountries,
    createCountriesList,
  };
};

export default counter;
