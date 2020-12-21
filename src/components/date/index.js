import './updated-date.sass';
// import removeChildrenElements from '../../utils/remove-children-el';
import creators from '../../utils/creators';

const displayUpdateDate = () => {
  const { createElement } = creators();

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

  const setUpdatedDate = (date, className) => {
    const parentDate = document.querySelector(className);

    const time = new Date(date).toLocaleString('en-EN', options);
    const elem = createElement({ tag: 'h4', classes: ['title_time'], innerText: time });

    parentDate.append(elem);
  };

  const updateDate = date => {
    const updatedTime = new Date(date).toLocaleString('en-EN', options);
    const timeElem = document.querySelector('.title_time');
    timeElem.innerText = updatedTime;
  };

  return { setUpdatedDate, updateDate };
};

export default displayUpdateDate;
