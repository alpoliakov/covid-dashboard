const removeChildrenElements = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export default removeChildrenElements;
