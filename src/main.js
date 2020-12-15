import './main.sass';
import App from './components/main';

const startApp = () => {
  const { initialApp } = App();
  initialApp();
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
