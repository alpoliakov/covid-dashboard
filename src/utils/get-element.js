const getElement = (selector, name) => {
  if (selector === 'class') {
    return document.querySelector(`.${name}`);
  }
  if (selector === 'id') {
    return document.getElementById(`${name}`);
  }
};

export default getElement;
