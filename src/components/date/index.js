import './updated-date.sass';
import removeChildrenElements from '../../utils/remove-children-el';
import creators from '../../utils/creators';

const displayUpdateDate = () => {
  const setUpdatedDate = (date, className) => {
    const parentDate = document.querySelector(className);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    const { createElement } = creators();
    const time = new Date(date).toLocaleString('en-EN', options);
    const elem = createElement({ tag: 'h4', classes: ['time'], innerText: time });

    if (parentDate.children.length > 0) {
      removeChildrenElements(parentDate);
    }

    parentDate.append(elem);
  };

  return { setUpdatedDate };
};

export default displayUpdateDate;
