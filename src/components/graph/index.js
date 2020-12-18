import zingchart from 'zingchart/index';
import './graph.sass';
import creators from '../../utils/creators';
import removeChildrenElements from '../../utils/remove-children-el';
import { CUMULATIVE_TOTAL_PATH } from '../../constants/api';
import wrapFetchAsync from '../../utils/requests';

const graph = () => {
  let cumulative;

  const handleData = (data, key) => {
    if (key === 'world') {
      console.log(data);
    }
  };

  const getData = () => {
    wrapFetchAsync(CUMULATIVE_TOTAL_PATH, handleData, 'world');
  };

  const { createElement } = creators();
  getData();

  const setGraph = className => {
    const parent = document.querySelector(className);
    removeChildrenElements(parent);

    const template = [{ tag: 'div', id: 'graph' }];

    const childrenArr = template.map(item => createElement(item));
    parent.append(...childrenArr);

    const myConfig = {
      type: 'line',
      series: [
        {
          values: [
            [0, 20],
            [1, 40],
            [3, 50],
            [4, 15],
            [6, 33],
            [7, 34],
          ],
        },
      ],
    };

    zingchart.render({
      id: 'graph',
      data: myConfig,
      height: '100%',
      width: '100%',
    });
  };

  return {
    setGraph,
  };
};

export default graph;
