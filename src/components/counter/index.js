import creators from '../../utils/creators';
import useLocalStorage from '../../utils/local-storage-accessors';

const counter = () => {
  const { createObjElement, createElement } = creators();
  const { getDataFromLocalStorage } = useLocalStorage();
  const totalCases = getDataFromLocalStorage('world');
  const children = [
    createElement({ tag: 'h4', classes: ['title__counter'], innerText: 'Global cases' }),
    createElement({ tag: 'div', classes: [], innerText: `${totalCases.cases}` }),
  ];
  const elem = 'div';
  const classes = ['root__item', 'root__item_counter'];
  const createSelf = () => {
    return createObjElement(elem, classes, children);
  };

  return {
    createSelf,
    children,
  };
};

export default counter;
