import './searcher.sass';
import creators from '../../utils/creators';
import Map from '../map';
import useLocalStorage from '../../utils/local-storage-accessors';
import DB from '../../services/db';
import detailedTable from '../detailed-table';

const searcher = () => {
  const { createElement } = creators();
  const { closePopup } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setElementsToDetailedTable } = detailedTable();

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

    if (filter === '') {
      countriesList.forEach(item => item.classList.remove('zoom'));
      const btns = document.querySelectorAll('.btn__details');
      let mode = null;

      btns.forEach(item => {
        if (item.classList.contains('active_btn')) {
          mode = item.dataset.sort;
        }
      });

      DB.keyForLS = 'world';
      DB.iso3 = '';
      const worldData = getDataFromLocalStorage(DB.keyForLS);
      setElementsToDetailedTable('.root__item_details-main', worldData, mode);
      closePopup();
    }
  };

  const setInputElement = parentClass => {
    const parent = document.querySelector(parentClass);
    const result = [];
    const input = createElement({
      tag: 'input',
      id: 'mySearch',
      classes: ['searcher'],
      attributes: {
        type: 'text',
        placeholder: 'Search...',
        title: 'Type in a category',
        'virtual-keyboard': '',
      },
    });

    const iconOpenKeyboard = createElement({
      tag: 'ion-icon',
      classes: ['btn-keyboard-toggle'],
      attributes: {
        name: 'apps-outline',
      },
    });

    const keyboard = createElement({
      tag: 'div',
      classes: ['simple-keyboard'],
    });

    result.push(input, iconOpenKeyboard, keyboard);
    input.addEventListener('keyup', searchCountry);

    parent.append(...result);
  };

  return { setInputElement, searchCountry };
};

export default searcher;
