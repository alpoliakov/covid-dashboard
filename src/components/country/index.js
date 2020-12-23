import creators from '../../utils/creators';
import './countries.sass';
import sortElements from '../../services/sort-elements';
import removeChildrenElements from '../../utils/remove-children-el';

const countriesTable = () => {
  const { createElement } = creators();

  const setCountries = (data, className, mode) => {
    const parent = document.querySelector(className);
    const arrChildren = data.map(item => {
      const { country, cases } = item.info[mode];
      const { iso3, flag } = item.info.countryInfo;
      return createElement({
        tag: 'div',
        classes: ['countries'],
        attributes: { 'data-iso3': iso3 },
        children: [
          { tag: 'img', classes: ['flags'], attributes: { src: flag } },
          { tag: 'p', classes: ['name__country'], innerText: country },
          {
            tag: 'p',
            classes: ['data__country'],
            attributes: { 'data-iso3': iso3 },
            innerText: cases,
          },
        ],
      });
    });
    removeChildrenElements(parent);
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

  const dataInsertion = (data, arrButtons, mode) => {
    const arrActiveBtn = arrButtons.filter(item => item.classList.contains('active_btn'));
    const arrData = document.querySelectorAll('.data__country');
    const field =
      arrActiveBtn.length === 1 ? 'cases' : arrActiveBtn[arrActiveBtn.length - 1].dataset.sort;

    arrData.forEach(item => {
      for (let i = 0; i < data.length - 1; i++) {
        if (item.dataset.iso3 === data[i].info.countryInfo.iso3) {
          item.innerText = data[i].info[mode][field];
        }
      }
    });
  };

  const highlightSelectedItem = elem => {
    elem.childNodes.forEach(item => item.classList.remove('zoom'));
  };

  return {
    setCountries,
    sortCountries,
    dataInsertion,
    highlightSelectedItem,
  };
};

export default countriesTable;
