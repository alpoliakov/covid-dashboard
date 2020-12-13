import './main.sass';
import addListeners from './services/add-listeners';
import getDataFromCovidAPI from './services/get-data-from-api';
import wrapFetchAsync from './utils/requests';
import { SOME } from './constants/api';
import { createStartPage, handlerEventClick } from './components/main';
import Map from './components/map';

const startApp = () => {
  const { body } = document;
  wrapFetchAsync(SOME, getDataFromCovidAPI);
  addListeners(body, 'click', handlerEventClick);
  createStartPage();
  Map();
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
