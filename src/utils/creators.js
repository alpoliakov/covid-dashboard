const creators = () => {
  const createElement = ({
    tag,
    id = '',
    classes = [],
    attributes = {},
    innerText = '',
    children = [],
  }) => {
    const element = document.createElement(tag);

    if (classes.length > 0) {
      element.classList.add(...classes);
    }

    if (id !== '') {
      element.id = id;
    }

    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));

    if (innerText) {
      element.innerText = innerText;
    }

    if (children.length > 0) {
      children.forEach(item => {
        element.append(createElement(item));
      });
    }

    return element;
  };

  const elementFactory = (parent, arrElem, fn) => {
    if (arrElem.length > 0) {
      arrElem.forEach(item => parent.append(fn(item)));
    }
  };

  const createObjElement = (elem, classes = [], children = []) => {
    return Object.assign(Object.create(null), {
      tag: elem,
      classes,
      children,
    });
  };

  return {
    createElement,
    elementFactory,
    createObjElement,
  };
};

export default creators;
