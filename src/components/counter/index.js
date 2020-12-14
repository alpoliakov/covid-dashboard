import creators from '../../utils/creators';

const counter = () => {
  const { createObjElement } = creators();
  const children = [createObjElement('h4', ['title__counter'])];
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
