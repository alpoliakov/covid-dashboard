import './main.sass';

const addListener = () => {
  const { body } = document;
  body.addEventListener('click', e => {
    console.log(e.target);
  });
};

const startApp = () => {
  addListener();
};

document.addEventListener('DOMContentLoaded', startApp);
if (module && module.hot) module.hot.accept();
