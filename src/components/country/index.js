import creators from '../../utils/creators';
import './countries.sass';

const Countries = () => {
  const { createElement } = creators();

  const setCountries = data => {
    console.log(data);
    const parent = document.querySelector('.root__item_country-main');
    data.forEach(item => {
      const { country } = item;
      const { iso3 } = item.countryInfo;
      const elem = createElement({
        tag: 'div',
        classes: ['countries'],
        attributes: { dataIso3: iso3 },
        children: [{ tag: 'p', classes: ['name__country'], innerText: country }],
      });
      parent.append(elem);
    });
  };

  return {
    setCountries,
  };
};

export default Countries;
