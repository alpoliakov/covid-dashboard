const useLocalStorage = () => {
  const getDataFromLocalStorage = key => {
    const itemsArray = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    localStorage.setItem(key, JSON.stringify(itemsArray));
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  };

  const setDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return {
    getDataFromLocalStorage,
    setDataToLocalStorage,
    clearLocalStorage,
  };
};

export default useLocalStorage;
