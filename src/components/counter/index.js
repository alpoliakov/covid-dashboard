import creators from '../../utils/creators';
import useLocalStorage from '../../utils/local-storage-accessors';

const counter = () => {
  const { createElement } = creators();
  const { getDataFromLocalStorage } = useLocalStorage();

  const setCounter = className => {
    const parent = document.querySelector(className);
    const children = [
      createElement({
        tag: 'form',
        classes: ['search__form'],
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
          value: '',
          placeholder: 'Search',
          onkeyup: "searchCountryName('text-to-find',false); return false;)", // TODO how get result from function
          autofocus: '',
        },
      }),
      createElement({
        tag: 'input',
        attributes: {
          type: 'button',
          value: '+',
          title: 'Cancel searching',
          onclick: "searchCountryName('text-to-find',false); return false;",
        },
      }),
      createElement({
        tag: 'input',
        attributes: {
          type: 'submit',
          value: 'Search',
          title: 'Start searching',
          onclick: 'searchCountry("text-to-find",true); return false;',
        },
      }),
    ];
    console.log('crated form');
    parent.append(...children);
    document.querySelector('.search__form').append(...input);
    // TODO
  };
  // eslint-disable-next-line no-unused-vars
  const createCountriesList = countries => {
    // eslint-disable-next-line no-unused-vars
    const parentEl = document.querySelector('');
  };

  const searchCountries = dataToSearch => {
    const data = getDataFromLocalStorage('countries');
    const matcher = `/${dataToSearch}/`;
    const result = [];
    data.forEach(obj => {
      if (obj.country.match(matcher)) {
        result.push(obj.country); // may be we need more info about country
      }
    });
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
