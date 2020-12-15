import creators from '../../utils/creators';
import './countries.sass';

const countriesTable = () => {
  const { createElement } = creators();

  const setCountries = (data, className) => {
    const parent = document.querySelector(className);
    const arrChildren = data.map(({ country, countryInfo: { iso3, flag } }) => {
      return createElement({
        tag: 'div',
        classes: ['countries'],
        attributes: { dataIso3: iso3 },
        children: [
          { tag: 'img', classes: ['flags'], attributes: { src: flag } },
          { tag: 'p', classes: ['name__country'], innerText: country },
        ],
      });
    });
    parent.append(...arrChildren);
  };

  return {
    setCountries,
  };
};

export default countriesTable;
