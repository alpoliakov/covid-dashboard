import creators from '../../utils/creators';
import './countries.sass';
import sortElements from '../../services/sort-elements';

const countriesTable = () => {
  const { createElement } = creators();

  const setCountries = (data, className) => {
    const parent = document.querySelector(className);
    const arrChildren = data.map(({ country, cases, countryInfo: { iso3, flag } }) => {
      return createElement({
        tag: 'div',
        classes: ['countries'],
        attributes: { dataIso3: iso3 },
        children: [
          { tag: 'img', classes: ['flags'], attributes: { src: flag } },
          { tag: 'p', classes: ['name__country'], innerText: country },
          { tag: 'p', classes: ['data__country'], innerText: cases },
        ],
      });
    });
    parent.append(...arrChildren);
  };

  const sortCountries = (elem, parent) => {
    const dirModifier = elem.dataset.sort === 'true';
    if (elem.classList.contains('btn__sort_alphabet')) {
      sortElements(parent, 1, dirModifier);
    }
    if (elem.classList.contains('btn__sort_numeric')) {
      sortElements(parent, 2, dirModifier);
    }
  };

  return {
    setCountries,
    sortCountries,
  };
};

export default countriesTable;
