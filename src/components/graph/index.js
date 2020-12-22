import './graph.sass';
import zingchart from 'zingchart/es6';
import 'zingchart/modules-es6/zingchart-pareto.min';
import GRAPH_CONFIG from './constants';
import wrapFetchAsync from '../../utils/requests';
import { CUMULATIVE_TOTAL_PATH } from '../../constants/api';

const graph = () => {
  const renderCharts = data => {
    console.log(data.cases);
    const resultArr = [];

    for (const [key, value] of Object.entries(data.cases)) {
      const dateStr = Date.parse(key);
      resultArr.push([dateStr, value]);
    }

    const config = JSON.parse(JSON.stringify(GRAPH_CONFIG));
    config.series = [{ values: resultArr, 'line-width': 5 }];
    config.type = 'area';
    config['scale-y'] = {
      short: true,
      'short-unit': 'K',
    };

    zingchart.render({
      id: 'charts',
      data: config,
      height: '100%',
      width: '100%',
    });
  };

  const setCharts = mode => {
    const url = mode === 'total' ? CUMULATIVE_TOTAL_PATH : '';
    wrapFetchAsync(url, renderCharts);
  };

  return { setCharts };
};

export default graph;
