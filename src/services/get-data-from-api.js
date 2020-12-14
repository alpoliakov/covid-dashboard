import useLocalStorage from '../utils/local-storage-accessors';

const getDataCountriesTotalFromAPI = data => {
  const { getDataFromLocalStorage, setDataToLocalStorage } = useLocalStorage();
  if (data && getDataFromLocalStorage('countries_total').length === 0) {
    setDataToLocalStorage('countries_total', data);
  }
};

export default getDataCountriesTotalFromAPI;
