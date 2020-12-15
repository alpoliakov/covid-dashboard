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
        children: [
          {
            tag: 'img',
            classes: ['img__sort_zero', 'flags'],
            innerText: '',
            attributes: {
              src: 'https://vectorflags.s3-us-west-2.amazonaws.com/flags/org-un-flag-01.png',
            },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__sort_alphabet', 'btn__countries_sort'],
            innerText: 'Sort name',
            attributes: { dataSort: 'alphabet' },
          },
          {
            tag: 'button',
            classes: ['btn', 'btn__sort_numeric', 'btn__countries_sort'],
            innerText: 'Sort data',
            attributes: { dataSort: 'numeric' },
          },
        ],
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
            innerText: 'Last day',
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
            innerText: 'Last day',
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
