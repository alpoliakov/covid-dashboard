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

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setCountries, sortCountries } = countriesTable();
  const { setElementsToDetailedTable, updateElementsInDetailedTable } = detailedTable();

  const dataUpdateRegulation = keyData => {
    if (getDataFromLocalStorage(keyData).length === 0) {
      for (const [key, value] of Object.entries(OBJ_PATHS)) {
        wrapFetchAsync(value, setDataToDB, key);
      }
      return;
    }

    const dateNow = new Date();
    const dateUpdated = getDataFromLocalStorage(keyData)[0].updated;
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
      const data = getDataFromLocalStorage('countries');
      const dataTotal = getDataFromLocalStorage('world');
      console.log(data);
      dataTotal.country = 'World';
      dataTotal.flag = 'https://vectorflags.s3-us-west-2.amazonaws.com/flags/org-un-flag-01.png';
      setMap('myMap', data);
      setCountries(data, '.root__item_country-main');
      setElementsToDetailedTable('.root__item_details-main', dataTotal);
    }, 600);
  };

  const updateDetailedTable = elem => {
    if (elem.classList.contains('active_btn')) {
      return;
    }

    const parent = elem.parentElement;
    let buttonGroup;

    if (elem.dataset.sortPeriod) {
      buttonGroup = parent.querySelectorAll('[data-sort-period]');
    } else {
      buttonGroup = parent.querySelectorAll('[data-sort-count]');
    }

    buttonGroup.forEach(button => {
      toggleClasses({ elem: button, className: 'active_btn' });
    });

    const period = parent.querySelector('.active_btn[data-sort-period]').dataset.sortPeriod;
    const count = parent.querySelector('.active_btn[data-sort-count]').dataset.sortCount;

    const data = getDataFromLocalStorage('world');
    const currentData = {};

    if (period === 'total') {
      if (count === 'all') {
        currentData.cases = data.cases;
        currentData.deaths = data.deaths;
        currentData.recovered = data.recovered;
      } else {
        currentData.cases = (data.casesPerOneMillion / 10).toFixed(2);
        currentData.deaths = (data.deathsPerOneMillion / 10).toFixed(2);
        currentData.recovered = (data.recoveredPerOneMillion / 10).toFixed(2);
      }
    } else if (count === 'all') {
      currentData.cases = data.todayCases;
      currentData.deaths = data.todayDeaths;
      currentData.recovered = data.todayRecovered;
    } else {
      currentData.cases = (100000 * (data.todayCases / data.population)).toFixed(2);
      currentData.deaths = (100000 * (data.todayDeaths / data.population)).toFixed(2);
      currentData.recovered = (100000 * (data.todayRecovered / data.population)).toFixed(2);
    }

    updateElementsInDetailedTable(currentData);
  };

  const handlerEventClick = e => {
    const elem = e.target;
    console.log(elem.dataset.sortTotal);
    if (elem.classList.contains('btn__countries_sort')) {
      const parentLists = elem.parentElement.nextElementSibling;
      toggleClasses({ elem, className: 'active_btn' });
      elem.dataset.sort = elem.dataset.sort === 'true' ? 'false' : 'true';
      sortCountries(elem, parentLists);
    }

    if (elem.classList.contains('btn__details')) {
      updateDetailedTable(elem);
    }
  };

  addListeners(root, 'click', handlerEventClick);

  return {
    initialApp,
  };
};

export default App;
