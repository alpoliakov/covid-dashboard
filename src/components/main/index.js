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
import displayUpdateDate from '../date';

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap, setJSONLayer, removeLayers } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setUpdatedDate } = displayUpdateDate();
  const {
    setCountries,
    sortCountries,
    // changeCountriesOutputData,
    dataInsertion,
  } = countriesTable();
  const { setElementsToDetailedTable } = detailedTable();

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
    console.log(diff);

    if (diff > 1) {
      for (const [key, value] of Object.entries(OBJ_PATHS)) {
        wrapFetchAsync(value, setDataToDB, key);
        setUpdatedDate(dateUpdated, '.root__item_date');
      }
    }
    // localStorage.clear();
  };

  const getCountriesData = (iso3 = '') => {
    const dataJSON = getDataFromLocalStorage('countries');
    const data =
      iso3 === ''
        ? dataJSON.features
        : dataJSON.features.map(item => item.coutryInfo.iso3 === iso3);
    return { data, dataJSON };
  };

  const initialApp = () => {
    dataUpdateRegulation('countries');
    setInterval(() => {
      dataUpdateRegulation('countries');
    }, 3600000);

    setTimeout(() => {
      elementFactory(root, dataApp, createElement);
      const { data, dataJSON } = getCountriesData();
      const dataTotal = getDataFromLocalStorage('world');
      DB.keyForLS = 'world';
      DB.newMode = 'total';
      const btnArr = document.querySelectorAll('.btn__footer-map');
      setMap('myMap');
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'total');
      setCountries(data, '.root__item_country-main', 'total');
      setUpdatedDate(data[0].info.updated, '.root__item_date');
      setElementsToDetailedTable('.root__item_details-main', dataTotal, 'total');
    }, 600);
  };

  const changeActiveClass = (arr, mode) => {
    arr.forEach(item => {
      if (item.dataset.sort === mode) {
        item.classList.add('active_btn');
      } else {
        item.classList.remove('active_btn');
      }
    });
  };

  const sortDataOutput = (data, dataForDetailTable, dataJSON, className) => {
    const btnArr = document.querySelectorAll(className);
    const elemSwitch = btnArr[btnArr.length - 1];
    const btns = document.querySelectorAll('.btn__details');

    const activeBtn = [...btnArr]
      .slice(0, 2)
      .filter(item => item.classList.contains('active_btn'))[0];

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'total');
      changeActiveClass(btns, 'total');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'total');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'total');
      }
    } else if (elemSwitch.dataset.sortSwitch === 'relative' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'relativeTotal');
      changeActiveClass(btns, 'relativeTotal');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'relativeTotal');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeTotal');
      }
    }

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'lastDay') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'lastDay');
      changeActiveClass(btns, 'lastDay');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'lastDay');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'lastDay');
      }
    } else if (
      elemSwitch.dataset.sortSwitch === 'relative' &&
      activeBtn.dataset.sort === 'lastDay'
    ) {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'relativeLast');
      changeActiveClass(btns, 'relativeLast');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'relativeLast');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeLast');
      }
    }
  };

  const changeOutputData = (data, dataJSON, mode, className) => {
    const btnArr = document.querySelectorAll(className);
    const switchButton = btnArr[btnArr.length - 1];

    if (mode === 'total' || mode === 'lastDay') {
      switchButton.innerText = 'absolute';
      switchButton.dataset.sortSwitch = 'absolute';
    }

    if (mode === 'relativeTotal' || mode === 'relativeLast') {
      switchButton.innerText = 'relative';
      switchButton.dataset.sortSwitch = 'relative';
    }

    if (mode === 'total' || mode === 'relativeTotal') {
      changeActiveClass([...btnArr].slice(0, 2), 'total');
    }

    if (mode === 'lastDay' || mode === 'relativeLast') {
      changeActiveClass([...btnArr].slice(0, 2), 'lastDay');
    }

    removeLayers();
    setJSONLayer(dataJSON, [...btnArr].slice(0, -1), mode);

    if (className === '.btn__countries') {
      dataInsertion(data, [...btnArr].slice(0, -1), mode);
    }
  };

  const handlerEventClick = e => {
    const elem = e.target;
    const { keyForLS, iso3 } = DB;
    const dataForDetailTable =
      iso3 === '' ? getDataFromLocalStorage(keyForLS) : getCountriesData(iso3);
    const { data, dataJSON } = getCountriesData(iso3);

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
        DB.iso3 = '';
      }

      const mode = elem.dataset.sort;

      changeOutputData(data, dataJSON, mode, '.btn__countries');
      changeOutputData(data, dataJSON, mode, '.btn__footer-map');
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, mode);
      btns.forEach(item => item.classList.remove('active_btn'));
      elem.classList.add('active_btn');
    }

    if (elem.classList.contains('btn__countries') || elem.classList.contains('btn__footer-map')) {
      const btnCountriesArr = document.querySelectorAll('.btn__countries');
      const btnMapArr = document.querySelectorAll('.btn__footer-map');

      if (elem.classList.contains('btn-switch')) {
        const switchButtons = document.querySelectorAll('.btn-switch');

        switchButtons.forEach(item => {
          item.innerText = item.innerText === 'absolute' ? 'relative' : 'absolute';
          item.dataset.sortSwitch =
            item.dataset.sortSwitch === 'absolute' ? 'relative' : 'absolute';
        });

        sortDataOutput(data, dataForDetailTable, dataJSON, '.btn__countries');
      }

      if (elem.dataset.sort === 'total' || elem.dataset.sort === 'lastDay') {
        changeActiveClass([...btnCountriesArr].slice(0, 2), elem.dataset.sort);
        changeActiveClass([...btnMapArr].slice(0, 2), elem.dataset.sort);
        [...btnCountriesArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        [...btnMapArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        sortDataOutput(data, dataForDetailTable, dataJSON, '.btn__countries');
      }

      if (elem.dataset.sort === 'deaths' || elem.dataset.sort === 'recovered') {
        changeActiveClass([...btnCountriesArr].slice(2, 4), elem.dataset.sort);
        changeActiveClass([...btnMapArr].slice(2, 4), elem.dataset.sort);
        sortDataOutput(data, dataForDetailTable, dataJSON, '.btn__countries');
      }
    }

    if (
      elem.classList.contains('countries') ||
      elem.classList.contains('flags') ||
      elem.classList.contains('name__country') ||
      elem.classList.contains('data__country')
    ) {
      const parentCountry = elem.closest('.countries');
      parentCountry.zoom(1.5);
      console.log(parentCountry);
    }
  };

  addListeners(root, 'click', handlerEventClick);

  return {
    initialApp,
  };
};

export default App;
