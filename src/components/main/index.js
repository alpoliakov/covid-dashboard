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
import graph from '../graph';

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const {
    setCountries,
    sortCountries,
    // changeCountriesOutputData,
    dataInsertion,
  } = countriesTable();
  const { setElementsToDetailedTable } = detailedTable();
  const { setGraph } = graph();

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

  const getCountriesData = () => {
    const dataJSON = getDataFromLocalStorage('countries');
    const data = dataJSON.features;
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
      setMap('myMap', dataJSON, 'total');
      setCountries(data, '.root__item_country-main', 'total');
      setElementsToDetailedTable('.root__item_details-main', dataTotal, 'total');
      setGraph('.root__item_graph-main');
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

  const sortDataOutput = (data, className) => {
    const btnArr = document.querySelectorAll(className);
    const elemSwitch = btnArr[btnArr.length - 1];
    const { keyForLS } = DB;
    const dataForDetailTable = getDataFromLocalStorage(keyForLS);
    const btns = document.querySelectorAll('.btn__details');

    const activeBtn = [...btnArr]
      .slice(0, 2)
      .filter(item => item.classList.contains('active_btn'))[0];

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'total');
      changeActiveClass(btns, 'total');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'total');
      }
    } else if (elemSwitch.dataset.sortSwitch === 'relative' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'relativeTotal');
      changeActiveClass(btns, 'relativeTotal');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeTotal');
      }
    }

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'lastDay') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'lastDay');
      changeActiveClass(btns, 'lastDay');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'lastDay');
      }
    } else if (
      elemSwitch.dataset.sortSwitch === 'relative' &&
      activeBtn.dataset.sort === 'lastDay'
    ) {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'relativeLast');
      changeActiveClass(btns, 'relativeLast');
      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeLast');
      }
    }
  };

  const changeOutputData = (data, mode, className) => {
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

    if (className === '.btn__countries') {
      dataInsertion(data, [...btnArr].slice(0, -1), mode);
    }
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
      const dataForDetailTable = getDataFromLocalStorage(keyForLS);
      const { data } = getCountriesData();
      const mode = elem.dataset.sort;

      changeOutputData(data, mode, '.btn__countries');
      changeOutputData(data, mode, '.btn__footer-map');
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, mode);
      btns.forEach(item => item.classList.remove('active_btn'));
      elem.classList.add('active_btn');
    }

    if (elem.classList.contains('btn__countries') || elem.classList.contains('btn__footer-map')) {
      const { data } = getCountriesData();

      const btnCountriesArr = document.querySelectorAll('.btn__countries');
      const btnMapArr = document.querySelectorAll('.btn__footer-map');

      if (elem.classList.contains('btn-switch')) {
        const switchButtons = document.querySelectorAll('.btn-switch');

        switchButtons.forEach(item => {
          item.innerText = item.innerText === 'absolute' ? 'relative' : 'absolute';
          item.dataset.sortSwitch =
            item.dataset.sortSwitch === 'absolute' ? 'relative' : 'absolute';
        });

        sortDataOutput(data, '.btn__countries');
      }

      if (elem.dataset.sort === 'total' || elem.dataset.sort === 'lastDay') {
        changeActiveClass([...btnCountriesArr].slice(0, 2), elem.dataset.sort);
        changeActiveClass([...btnMapArr].slice(0, 2), elem.dataset.sort);
        [...btnCountriesArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        [...btnMapArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        sortDataOutput(data, '.btn__countries');
      }

      if (elem.dataset.sort === 'deaths' || elem.dataset.sort === 'recovered') {
        changeActiveClass([...btnCountriesArr].slice(2, 4), elem.dataset.sort);
        changeActiveClass([...btnMapArr].slice(2, 4), elem.dataset.sort);
        sortDataOutput(data, '.btn__countries');
      }
    }
  };

  addListeners(root, 'click', handlerEventClick);

  return {
    initialApp,
  };
};

export default App;
