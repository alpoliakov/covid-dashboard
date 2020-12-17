import useLocalStorage from '../utils/local-storage-accessors';
import { processingReceivedData, receivedTotalData } from './processing-received-data';

const setDataToDB = (data, key) => {
  const { setDataToLocalStorage } = useLocalStorage();
  const sortData = key === 'world' ? receivedTotalData(data) : processingReceivedData(data);
  setDataToLocalStorage(key, sortData);
  console.log('A data request was made.');
  // localStorage.clear();
};

export default setDataToDB;
