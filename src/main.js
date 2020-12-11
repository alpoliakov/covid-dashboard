import './main.sass';
import addListeners from './services/add-listeners';
import handlerEventClick from './services/handlers-events';

const startApp = () => {
  const { body } = document;

  addListeners(body, 'click', handlerEventClick);
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
