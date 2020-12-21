import './searcher.sass';
import creators from '../../utils/creators';

const searcher = () => {
  const { createElement } = creators();

  const searchCountry = () => {
    const input = document.getElementById('mySearch');
    const filter = input.value.toUpperCase();
    const countriesList = document.querySelectorAll('.countries');

    for (let i = 0; i < countriesList.length; i++) {
      const nameCountry = countriesList[i].querySelector('.name__country');

      if (nameCountry.innerHTML.trim().toUpperCase().indexOf(filter) > -1) {
        countriesList[i].style.display = '';
      } else {
        countriesList[i].style.display = 'none';
      }
    }
  };

  const setInputElement = parentClass => {
    const parent = document.querySelector(parentClass);
    const result = [];
    const input = createElement({
      tag: 'input',
      id: 'mySearch',
      classes: ['searcher'],
      attributes: { type: 'text', placeholder: 'Search...', title: 'Type in a category' },
    });
    result.push(input);
    input.addEventListener('keyup', searchCountry);

    parent.append(...result);
  };

  return { setInputElement };
};

export default searcher;
