import creator from '../../utils/creators';
import { dataApp } from '../../constants/data-app';
import Map from '../map';
import { SOME } from '../../constants/api';
import wrapFetchAsync from '../../utils/requests';
import getDataCountriesTotalFromAPI from '../../services/get-data-from-api';
import useLocalStorage from '../../utils/local-storage-accessors';
import Countries from '../country';

const App = () => {
  const root = document.getElementById('root');

  const { createElement, elementFactory } = creator();
  const { setMap } = Map();
  const { getDataFromLocalStorage } = useLocalStorage();
  const { setCountries } = Countries();

  const createStartPage = () => {
    elementFactory(root, dataApp, createElement);
    wrapFetchAsync(SOME, getDataCountriesTotalFromAPI);
    const data = getDataFromLocalStorage('countries_total');
    setMap('myMap', data);
    setCountries(data);
  };

  // const getDataFromApi = () => {};

  return {
    createStartPage,
  };
};

export default App;
