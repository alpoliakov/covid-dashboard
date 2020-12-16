import './detaled-table.sass';
import creators from '../../utils/creators';

const detailedTable = () => {
  const { createElement } = creators();

  const setElementsToDetailedTable = (className, data) => {
    const parent = document.querySelector(className);
    const { flag, country, cases, deaths, recovered } = data;
    const template = [
      { tag: 'img', classes: ['flag__detailed', 'item__detailed'], attributes: { src: flag } },
      { tag: 'h3', classes: ['title__detailed', 'item__detailed'], innerText: country },
      {
        tag: 'h5',
        classes: ['item__detailed', 'data__detailed'],
        children: [
          { tag: 'span', innerText: 'Cases: ' },
          { tag: 'span', classes: ['cases__detailed'], innerText: cases },
        ],
      },
      {
        tag: 'h5',
        classes: ['item__detailed', 'data__detailed'],
        children: [
          { tag: 'span', innerText: 'Deaths: ' },
          { tag: 'span', classes: ['deaths__detailed'], innerText: deaths },
        ],
      },
      {
        tag: 'h5',
        classes: ['item__detailed', 'data__detailed'],
        children: [
          { tag: 'span', innerText: 'Recovered: ' },
          { tag: 'span', classes: ['recovered__detailed'], innerText: recovered },
        ],
      },
    ];
    const childrenArr = template.map(item => createElement(item));
    parent.append(...childrenArr);
  };

  const updateElementsInDetailedTable = data => {
    const { cases, deaths, recovered } = data;

    const casesElement = document.querySelector('.cases__detailed');
    const deathsElement = document.querySelector('.deaths__detailed');
    const recoveredElement = document.querySelector('.recovered__detailed');

    casesElement.innerText = cases;
    deathsElement.innerText = deaths;
    recoveredElement.innerText = recovered;
  };

  return {
    setElementsToDetailedTable,
    updateElementsInDetailedTable,
  };
};

export default detailedTable;
