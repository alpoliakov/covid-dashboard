export default function createElement({tag, classes = [], attributes = {}, innerText = ''}) {
  const element = document.createElement(tag);

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));

  if (innerText) {
    element.innerText = innerText;
  }

  return element;
}
