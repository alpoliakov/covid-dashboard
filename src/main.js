import './main.sass';
import App from './components/main';

const startApp = () => {
  const { createStartPage } = App();
  createStartPage();
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
