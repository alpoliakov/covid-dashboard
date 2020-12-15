const toggleElemClass = (elem, className) => {
  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
  } else {
    elem.classList.add(className);
  }
};

const wrapperToggleClasses = fn => {
  return (...args) => {
    const arrArgs = [...args];

    arrArgs.map(item => {
      return fn(item.elem, item.className);
    });
  };
};

const toggleClasses = wrapperToggleClasses(toggleElemClass);

export default toggleClasses;
