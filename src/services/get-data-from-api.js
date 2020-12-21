import useLocalStorage from '../utils/local-storage-accessors';
import {
  processingReceivedData,
  receivedTotalData,
  processingWorldGraphData,
} from './processing-received-data';

const setDataToDB = (data, key) => {
  const { setDataToLocalStorage } = useLocalStorage();
  let sortData;

  switch (key) {
    case 'world': {
      sortData = receivedTotalData(data);
      break;
    }

    case 'countries': {
      sortData = processingReceivedData(data);
      break;
    }

    case 'worldGraph': {
      sortData = processingWorldGraphData(data);
      break;
    }

    default: {
      break;
    }
  }

  setDataToLocalStorage(key, sortData);
  console.log('A data request was made.');
  // localStorage.clear();
};

export default setDataToDB;
