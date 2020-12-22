import './resize-button.sass';

const resizeButton = () => {
  const hideElements = elem => {
    const elements = document.querySelectorAll('.root__item');
    elements.forEach(item => {
      if (elem !== item) item.classList.toggle('hidden');
    });
  };

  const resizeBlock = elem => {
    const target = elem.parentElement;
    hideElements(target);

    target.classList.toggle('full-screen');
    elem.classList.toggle('btn__expanded');
  };

  return { resizeBlock };
};

export default resizeButton;
