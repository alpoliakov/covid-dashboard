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
        classes: ['root__item_counter-search'],
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
          //  onkeyup: "searchCountryName('text-to-find',false); return false;)", // TODO how get result from function
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
    const arrChildren = countries.map(item => {
      return createElement({
        tag: 'li',
        classes: ['countries'],
        attributes: { dataIso3: item.info.countryInfo.iso3 },
        children: [
          // { tag: 'img', classes: ['flags'], attributes: { src: item.flag } },
          { tag: 'p', classes: ['name__country'], innerText: item.info.country },
        ],
      });
    });
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
    //  const matcher = `/${dataToSearch}/`;
    const result = [];
    console.log('in search method');
    console.log(dataToSearch);
    data.forEach(el => {
      console.log(el.info.country.toUpperCase().indexOf(dataToSearch));
      if (el.info.country.toUpperCase().indexOf(dataToSearch) !== -1) {
        return result.push(el); // all info about country
      }
    });
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
