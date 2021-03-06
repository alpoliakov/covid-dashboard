import './detaled-table.sass';
import creators from '../../utils/creators';
import removeChildrenElements from '../../utils/remove-children-el';

const detailedTable = () => {
  const { createElement } = creators();

  const setElementsToDetailedTable = (className, data, mode) => {
    const parent = document.querySelector(className);
    removeChildrenElements(parent);
    const { flag, country, cases, deaths, recovered } = data[mode];
    const template = [
      { tag: 'img', classes: ['flag__detailed', 'item__detailed'], attributes: { src: flag } },
      { tag: 'h3', classes: ['title__detailed', 'item__detailed'], innerText: country },
      { tag: 'h5', classes: ['data__detailed', 'item__detailed'], innerText: `Cases: ${cases}` },
      { tag: 'h5', classes: ['data__detailed', 'item__detailed'], innerText: `Deaths: ${deaths}` },
      {
        tag: 'h5',
        classes: ['data__detailed', 'item__detailed'],
        innerText: `Recovered: ${recovered}`,
      },
    ];
    const childrenArr = template.map(item => createElement(item));
    parent.append(...childrenArr);
  };

  return {
    setElementsToDetailedTable,
  };
};

export default detailedTable;
