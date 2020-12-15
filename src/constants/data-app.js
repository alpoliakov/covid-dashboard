const dataApp = [
  {
    tag: 'div',
    classes: ['root__item', 'root__item_counter'],
  },
  {
    tag: 'div',
    classes: ['root__item', 'root__item_country', 'tables'],
    children: [
      {
        tag: 'div',
        classes: ['root__item_country-header', 'tables__header'],
        children: [{ tag: 'h4', innerText: 'Header' }],
      },
      {
        tag: 'div',
        classes: ['root__item_country-main', 'tables__main'],
      },
      {
        tag: 'div',
        classes: ['root__item_country-footer', 'tables__footer'],
        children: [
          {
            tag: 'button',
            classes: ['btn', 'btn__countries', 'active_btn'],
            innerText: 'Total',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__countries'],
            innerText: 'Button 2',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__countries'],
            innerText: 'Button 3',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__countries'],
            innerText: 'Button 4',
            attributes: { dataSort: 'one' },
          },
        ],
      },
    ],
  },
  {
    tag: 'div',
    classes: ['root__item', 'root__item_date'],
  },
  {
    tag: 'div',
    classes: ['root__item', 'root__item_map'],
    children: [{ tag: 'div', id: 'myMap' }],
  },
  {
    tag: 'div',
    classes: ['root__item', 'root__item_details', 'tables'],
    children: [
      {
        tag: 'div',
        classes: ['root__item_details-header', 'tables__header'],
        children: [{ tag: 'h4', innerText: 'Header' }],
      },
      {
        tag: 'div',
        classes: ['root__item_details-main', 'tables__main'],
      },
      {
        tag: 'div',
        classes: ['root__item_details-footer', 'tables__footer'],
        children: [
          {
            tag: 'button',
            classes: ['btn', 'btn__details', 'active_btn'],
            innerText: 'Total',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__details'],
            innerText: 'Button 2',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__details'],
            innerText: 'Button 3',
            attributes: { dataSort: 'one' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__details'],
            innerText: 'Button 4',
            attributes: { dataSort: 'one' },
          },
        ],
      },
    ],
  },
  {
    tag: 'div',
    classes: ['root__item', 'root__item_graph', 'tables'],
    children: [
      { tag: 'div', classes: ['root__item_graph-main', 'tables__main'] },
      {
        tag: 'div',
        classes: ['root__item_graph-footer', 'tables__footer'],
        children: [{ tag: 'h4', innerText: 'Footer' }],
      },
    ],
  },
];

const arrDataElements = [];

export { dataApp, arrDataElements };
