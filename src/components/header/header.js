import createElement from '../../utils/create-element';
// createElement({tag, classes = [], attributes = {}, innerText = ''})
const header = createElement({
  tag: 'header',
  classes: ['header'],
  attributes: {
    id: 'header',
  },
  innerText: '',
});

/**
 * <header>
 *     <div>
 *         <title>
 *             COVID-19 Dashboard
 *         </title>
 *         <p>
 *             NUMBER
 *         </p>
 *     </div>
 * </header>
 * */
// const tile = createElement({tag: 'div', classes: ['tile', 'tile-image'],
// attributes: {'draggable': true, 'data-tile-id': String(this.tiles[i])},
// innerText: String(this.tiles[i])});
// tile.append(createElement('div));
