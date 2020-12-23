import './resize-button.sass';
import DB from '../../services/db';

const resizeButton = () => {
  const hideElements = elem => {
    const elements = document.querySelectorAll('.root__item');
    elements.forEach(item => {
      if (elem !== item) {
        item.classList.toggle('hidden');
      } else if (elem === item) {
        if (elem.classList.contains('root__item_map')) {
          const { map } = DB;
          setTimeout(() => {
            map.invalidateSize();
          }, 300);
        }
      }
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
