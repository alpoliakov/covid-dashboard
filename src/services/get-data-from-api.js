import useLocalStorage from '../utils/local-storage-accessors';

const setDataToDB = (data, key) => {
  const { setDataToLocalStorage } = useLocalStorage();
  setDataToLocalStorage(key, data);
  console.log('A data request was made.');
  // localStorage.clear();
};

export default setDataToDB;
