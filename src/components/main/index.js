import creator from '../../utils/creators';
import { dataApp } from '../../constants/data-app';
import Map from '../map';
import { OBJ_PATHS } from '../../constants/api';
import wrapFetchAsync from '../../utils/requests';
import setDataToDB from '../../services/get-data-from-api';
import useLocalStorage from '../../utils/local-storage-accessors';
import countriesTable from '../country';
import detailedTable from '../detailed-table';
import addListeners from '../../services/add-listeners';
import getElement from '../../utils/get-element';
import toggleClasses from '../../utils/toggler-classes';
import DB from '../../services/db';
import counter from '../counter';

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setCountries, sortCountries } = countriesTable();
  const { setElementsToDetailedTable } = detailedTable();
  const { setCounter, searchCountries } = counter();

  const dataUpdateRegulation = keyData => {
    if (getDataFromLocalStorage(keyData).length === 0) {
      for (const [key, value] of Object.entries(OBJ_PATHS)) {
        wrapFetchAsync(value, setDataToDB, key);
      }
      return;
    }
    const dateNow = new Date();
    const dateUpdated = getDataFromLocalStorage(keyData).features[0].info.updated;
    const diff = (dateNow - dateUpdated) / 3600000;

    if (diff > 1) {
      for (const [key, value] of Object.entries(OBJ_PATHS)) {
        wrapFetchAsync(value, setDataToDB, key);
      }
    }
    // localStorage.clear();
  };

  const initialApp = () => {
    dataUpdateRegulation('countries');
    setInterval(() => {
      dataUpdateRegulation('countries');
    }, 3600000);

    setTimeout(() => {
      elementFactory(root, dataApp, createElement);
      const dataJSON = getDataFromLocalStorage('countries');
      const data = dataJSON.features;
      const dataTotal = getDataFromLocalStorage('world');
      DB.keyForLS = 'world';
      setMap('myMap', dataJSON, 'total');
      setCountries(data, '.root__item_country-main', 'total');
      setElementsToDetailedTable('.root__item_details-main', dataTotal, 'total');
      setCounter('.root__item_counter');
    }, 600);
  };

  const handlerEventClick = e => {
    const elem = e.target;

    if (elem.classList.contains('btn__countries_sort')) {
      const parentLists = elem.parentElement.nextElementSibling;
      toggleClasses({ elem, className: 'active_btn' });
      elem.dataset.sort = elem.dataset.sort === 'true' ? 'false' : 'true';
      sortCountries(elem, parentLists);
    }

    if (elem.classList.contains('btn__details')) {
      const btns = document.querySelectorAll('.btn__details');

      if (elem.classList.contains('btn__details-world')) {
        DB.keyForLS = elem.innerText;
      }

      const { keyForLS } = DB;
      const data = getDataFromLocalStorage(keyForLS);
      const mode = elem.dataset.sort;
      setElementsToDetailedTable('.root__item_details-main', data, mode);
      btns.forEach(item => item.classList.remove('active_btn'));
      elem.classList.add('active_btn');
    }
  };
  const handlerEventKeyup = e => {
    console.log(e.value);
    console.log('Keyup action');
    const textToSearch = document.querySelector('.search__form_text').value;
    console.log(textToSearch); //+
    if (textToSearch.trim().length >= 3) {
      console.log('ready to search');
      searchCountries(textToSearch.trim().toUpperCase());
    }
  };

  addListeners(root, 'click', handlerEventClick);
  addListeners(root, 'keyup', handlerEventKeyup);

  return {
    initialApp,
  };
};

export default App;
