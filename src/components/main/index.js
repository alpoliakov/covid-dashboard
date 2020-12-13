import creator from '../../utils/creators';
// eslint-disable-next-line import/named
import { dataApp } from '../../constants/data-app';

const createStartPage = () => {
  const root = document.getElementById('root');
  const { createElement, elementFactory } = creator();

  elementFactory(root, dataApp, createElement);
};

const handlerEventClick = e => {
  console.log(e.target);
};

export { createStartPage, handlerEventClick };
