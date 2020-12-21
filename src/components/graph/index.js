import zingchart from 'zingchart/index';
import './graph.sass';
import creators from '../../utils/creators';
import removeChildrenElements from '../../utils/remove-children-el';
import GRAPH_CONFIG from './constants';

const graph = () => {
  const { createElement } = creators();

  const renderGraph = (data, mode, field = 'cases') => {
    const config = JSON.parse(JSON.stringify(GRAPH_CONFIG));

    if (mode === 'total' || mode === 'relativeTotal') {
      config.series = [{ values: data[mode][field], 'line-width': 5 }];
      config.type = 'line';
      config['scale-y'] = {
        short: true,
        'short-unit': 'K',
      };
    } else {
      config.series = [{ values: data[mode][field], 'bar-width': '10%' }];
      config.type = 'bar';
    }

    zingchart.render({
      id: 'graph',
      data: config,
      height: '100%',
      width: '100%',
    });
  };

  const setGraph = (className, data, mode) => {
    const parent = document.querySelector(className);
    removeChildrenElements(parent);

    const template = [{ tag: 'div', id: 'graph' }];

    const childrenArr = template.map(item => createElement(item));
    parent.append(...childrenArr);

    renderGraph(data, mode);
  };

  return {
    setGraph,
  };
};

export default graph;
