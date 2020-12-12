import './main.sass';
import addListeners from './services/add-listeners';
import handlerEventClick from './services/handlers-events';
// import getDataFromCovidAPI from './services/get-data-from-api';
// import wrapFetchAsync from './utils/requests';
// import { SOME } from './constants/api';

const startApp = () => {
  const { body } = document;
  // wrapFetchAsync(SOME, getDataFromCovidAPI);
  addListeners(body, 'click', handlerEventClick);
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
