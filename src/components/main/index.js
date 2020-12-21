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
import counter from '../counter';

const App = () => {
  const root = getElement('id', 'root');

  const { createElement, elementFactory } = creator();
  const { setMap, setJSONLayer, removeLayers, setPopUp, closePopup } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setUpdatedDate } = displayUpdateDate();
  const { setCountries, sortCountries, highlightSelectedItem, dataInsertion } = countriesTable();
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
    console.log(diff);

    if (diff > 1) {
      for (const [key, value] of Object.entries(OBJ_PATHS)) {
        wrapFetchAsync(value, setDataToDB, key);
        setTimeout(() => {
          setUpdatedDate(dateNow, '.root__item_date');
        }, 600);
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
      setElementsToDetailedTable('.root__item_details-main', dataTotal, 'total');
      setCounter('.root__item_counter');
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
    const dataForDetailTable =
      iso3 === '' ? getDataFromLocalStorage(keyForLS) : getCountriesData(iso3).data;
    const { data, dataJSON } = getCountriesData();

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
        DB.keyForLS = elem.innerText;
        DB.iso3 = '';
        const worldData = getDataFromLocalStorage(DB.keyForLS);
        const parentCountriesElem = document.querySelector('.root__item_country-main');
        highlightSelectedItem(parentCountriesElem);
        setElementsToDetailedTable('.root__item_details-main', worldData, mode);
        return;
      }

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
        DB.keyForLS = 'world';
        DB.iso3 = '';
        const worldData = getDataFromLocalStorage(DB.keyForLS);
        closePopup();
        setElementsToDetailedTable('.root__item_details-main', worldData, mode);
        return;
      }

      highlightSelectedItem(parentCountry.parentElement);
      parentCountry.classList.add('zoom');
      DB.keyForLS = 'country';
      DB.iso3 = parentCountry.dataset.iso3;
      const { data: objCountry } = getCountriesData(parentCountry.dataset.iso3);

      setPopUp(objCountry, [...btnsMap].slice(0, -1), mode);
      setElementsToDetailedTable('.root__item_details-main', objCountry, mode);
    }

    if (elem.classList.contains('search__form_clear')) {
      document.querySelector('.search__form_text').value = ' ';
      const ulTagToRemove = document.querySelector('.root__item_counter-list');
      if (ulTagToRemove !== null) {
        ulTagToRemove.remove();
      }
    }
  };

  const handlerEventKeyup = () => {
    const textToSearch = document.querySelector('.search__form_text').value;
    const ulTagToRemove = document.querySelector('.root__item_counter-list');
    if (ulTagToRemove !== null) {
      ulTagToRemove.remove();
    }
    if (textToSearch.trim().length >= 3) {
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
