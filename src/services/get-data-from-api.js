import useLocalStorage from '../utils/local-storage-accessors';
import { receivedTotalData } from './processing-received-data';

const setDataToDB = (data, key) => {
  const { setDataToLocalStorage } = useLocalStorage();
  const sortData = key === 'world' ? receivedTotalData(data) : data;
  setDataToLocalStorage(key, sortData);
  console.log('A data request was made.');
  // localStorage.clear();
};

export default setDataToDB;
