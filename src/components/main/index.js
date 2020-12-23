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
import searcher from '../searcher';
import graph from '../graph';
import resizeButton from '../resize-button';
import keyboardElem from '../keyboard';

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap, setJSONLayer, removeLayers, setPopUp, closePopup } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setUpdatedDate, updateDate } = displayUpdateDate();
  const { setCountries, sortCountries, highlightSelectedItem, dataInsertion } = countriesTable();
  const { setElementsToDetailedTable } = detailedTable();
  const { setInputElement } = searcher();
  const { setCharts } = graph();
  const { resizeBlock } = resizeButton();
  const { setKeyboard } = keyboardElem();

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
        setTimeout(() => {
          updateDate(dateNow);
        }, 1000);
      }
    }
    // localStorage.clear();
  };

  const getCountriesData = (iso3 = '') => {
    const dataJSON = getDataFromLocalStorage('countries');
    const data =
      iso3 === ''
        ? dataJSON.features
        : dataJSON.features.filter(item => item.info.countryInfo.iso3 === iso3)[0].info;

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
      setInputElement('.root__item_searcher');
      setElementsToDetailedTable('.root__item_details-main', dataTotal, 'total');
      setCharts();
      setKeyboard();
    }, 700);
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
    const { iso3 } = DB;

    const activeBtn = [...btnArr]
      .slice(0, 2)
      .filter(item => item.classList.contains('active_btn'))[0];

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'total');
      changeActiveClass(btns, 'total');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'total');

      if (iso3 !== '') {
        const { data: currentCountry } = getCountriesData(iso3);
        setPopUp(currentCountry, [...btnArr].slice(0, -1), 'total');
      }

      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'total');
      }
    } else if (elemSwitch.dataset.sortSwitch === 'relative' && activeBtn.dataset.sort === 'total') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'relativeTotal');
      changeActiveClass(btns, 'relativeTotal');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'relativeTotal');

      if (iso3 !== '') {
        const { data: currentCountry } = getCountriesData(iso3);
        setPopUp(currentCountry, [...btnArr].slice(0, -1), 'relativeTotal');
      }

      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeTotal');
      }
    }

    if (elemSwitch.dataset.sortSwitch === 'absolute' && activeBtn.dataset.sort === 'lastDay') {
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, 'lastDay');
      changeActiveClass(btns, 'lastDay');
      removeLayers();
      setJSONLayer(dataJSON, [...btnArr].slice(0, -1), 'lastDay');

      if (iso3 !== '') {
        const { data: currentCountry } = getCountriesData(iso3);
        setPopUp(currentCountry, [...btnArr].slice(0, -1), 'lastDay');
      }

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

      if (iso3 !== '') {
        const { data: currentCountry } = getCountriesData(iso3);
        setPopUp(currentCountry, [...btnArr].slice(0, -1), 'relativeLast');
      }

      if (className === '.btn__countries') {
        dataInsertion(data, [...btnArr].slice(0, -1), 'relativeLast');
      }
    }
  };

  const changeOutputData = (data, dataJSON, mode, className) => {
    const btnArr = document.querySelectorAll(className);
    const switchButton = btnArr[btnArr.length - 1];
    const { iso3 } = DB;

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

    if (iso3 !== '') {
      const { data: currentCountry } = getCountriesData(iso3);
      setPopUp(currentCountry, [...btnArr].slice(0, -1), mode);
    }

    if (className === '.btn__countries') {
      dataInsertion(data, [...btnArr].slice(0, -1), mode);
    }
  };

  const handlerEventClick = e => {
    const elem = e.target;
    const { keyForLS, iso3 } = DB;
    const input = document.getElementById('mySearch');
    const dataForDetailTable =
      iso3 === '' ? getDataFromLocalStorage(keyForLS) : getCountriesData(iso3).data;
    const { data, dataJSON } = getCountriesData();

    const eventKey = new KeyboardEvent('keyup', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    if (elem.classList.contains('btn__countries_sort')) {
      const parentLists = elem.parentElement.nextElementSibling;
      toggleClasses({ elem, className: 'active_btn' });
      elem.dataset.sort = elem.dataset.sort === 'true' ? 'false' : 'true';
      sortCountries(elem, parentLists);
    }

    if (elem.classList.contains('btn__details')) {
      const btns = document.querySelectorAll('.btn__details');
      const mode = elem.dataset.sort;

      if (elem.classList.contains('btn__details-world')) {
        let modeNow = null;

        btns.forEach(item => {
          if (item.classList.contains('active_btn')) {
            modeNow = item.dataset.sort;
          }
        });

        DB.keyForLS = elem.innerText;
        DB.iso3 = '';
        input.value = '';
        input.dispatchEvent(eventKey);
        const worldData = getDataFromLocalStorage(DB.keyForLS);
        const parentCountriesElem = document.querySelector('.root__item_country-main');
        highlightSelectedItem(parentCountriesElem);
        setElementsToDetailedTable('.root__item_details-main', worldData, modeNow);
        setCharts();
        return;
      }

      changeOutputData(data, dataJSON, mode, '.btn__countries');
      changeOutputData(data, dataJSON, mode, '.btn__footer-map');
      changeOutputData(data, dataJSON, mode, '.btn__footer-graph');
      setElementsToDetailedTable('.root__item_details-main', dataForDetailTable, mode);
      setCharts();
      btns.forEach(item => item.classList.remove('active_btn'));
      elem.classList.add('active_btn');
    }

    if (
      elem.classList.contains('btn__countries') ||
      elem.classList.contains('btn__footer-map') ||
      elem.classList.contains('btn__footer-graph')
    ) {
      const btnCountriesArr = document.querySelectorAll('.btn__countries');
      const btnMapArr = document.querySelectorAll('.btn__footer-map');
      const btnGraphArr = document.querySelectorAll('.btn__footer-graph');

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
        changeActiveClass([...btnGraphArr].slice(0, 2), elem.dataset.sort);
        [...btnCountriesArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        [...btnMapArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        [...btnGraphArr].slice(2, 4).forEach(item => item.classList.remove('active_btn'));
        sortDataOutput(data, dataForDetailTable, dataJSON, '.btn__countries');
      }

      if (elem.dataset.sort === 'deaths' || elem.dataset.sort === 'recovered') {
        changeActiveClass([...btnCountriesArr].slice(2, 4), elem.dataset.sort);
        changeActiveClass([...btnMapArr].slice(2, 4), elem.dataset.sort);
        changeActiveClass([...btnGraphArr].slice(2, 4), elem.dataset.sort);
        sortDataOutput(data, dataForDetailTable, dataJSON, '.btn__countries');
      }
      setCharts();
    }

    if (
      elem.classList.contains('countries') ||
      elem.classList.contains('flags') ||
      elem.classList.contains('name__country') ||
      elem.classList.contains('data__country')
    ) {
      const parentCountry = elem.closest('.countries');
      const btns = document.querySelectorAll('.btn__details');
      const btnsMap = document.querySelectorAll('.btn__footer-map');
      let mode = null;

      btns.forEach(item => {
        if (item.classList.contains('active_btn')) {
          mode = item.dataset.sort;
        }
      });

      if (parentCountry.classList.contains('zoom')) {
        parentCountry.classList.remove('zoom');
        input.value = '';
        input.dispatchEvent(eventKey);
        DB.keyForLS = 'world';
        DB.iso3 = '';
        const worldData = getDataFromLocalStorage(DB.keyForLS);
        closePopup();
        setCharts();
        setElementsToDetailedTable('.root__item_details-main', worldData, mode);
        return;
      }

      highlightSelectedItem(parentCountry.parentElement);
      parentCountry.classList.add('zoom');
      DB.keyForLS = 'country';
      DB.iso3 = parentCountry.dataset.iso3;
      input.value = parentCountry.firstElementChild.nextElementSibling.textContent.trim();
      input.dispatchEvent(eventKey);
      const { data: objCountry } = getCountriesData(parentCountry.dataset.iso3);

      setCharts();
      setPopUp(objCountry, [...btnsMap].slice(0, -1), mode);
      setElementsToDetailedTable('.root__item_details-main', objCountry, mode);
    }

    if (elem.classList.contains('btn__resize')) {
      resizeBlock(elem);
    }

    if (elem.classList.contains('btn-keyboard-toggle')) {
      const keyboard = elem.nextElementSibling;
      keyboard.classList.toggle('show__keyboard');
    }

    if (elem.classList.contains('btn-clear-input')) {
      input.value = '';
      input.dispatchEvent(eventKey);
    }
  };

  addListeners(root, 'click', handlerEventClick);

  return {
    initialApp,
  };
};

export default App;
