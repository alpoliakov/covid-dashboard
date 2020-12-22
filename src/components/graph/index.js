import './graph.sass';
import zingchart from 'zingchart/es6';
import 'zingchart/modules-es6/zingchart-pareto.min';
import GRAPH_CONFIG from './constants';
import wrapFetchAsync from '../../utils/requests';
import { CUMULATIVE_TOTAL_PATH, END_REQUEST_STRING } from '../../constants/api';
import DB from '../../services/db';
import useLocalStorage from '../../utils/local-storage-accessors';

const graph = () => {
  const { getDataFromLocalStorage } = useLocalStorage();

  const getPopulation = (key, iso3 = '') => {
    if (iso3 === '') {
      return getDataFromLocalStorage(key).population;
    }

    let result = '';
    const dataJSON = getDataFromLocalStorage(key).features;

    for (const item of dataJSON) {
      if (item.info.countryInfo.iso3 === iso3) {
        result = item.info.population;
      }
    }

    return result;
  };

  const renderCharts = data => {
    const btnArr = document.querySelectorAll('.btn__footer-graph');
    const typeOutputData = btnArr[btnArr.length - 1].dataset.sortSwitch;
    const arrayBtnDefiningPath = [...btnArr]
      .slice(0, 4)
      .filter(item => item.classList.contains('active_btn'));

    const period = arrayBtnDefiningPath[0].dataset.sort;
    const { iso3 } = DB;

    const field =
      arrayBtnDefiningPath.length === 1
        ? 'cases'
        : arrayBtnDefiningPath[arrayBtnDefiningPath.length - 1].dataset.sort;

    const countryFieldData = iso3 !== '' ? data.timeline : data;
    let typeGraph = '';
    const resultArr = [];
    let scaleY = {
      short: true,
      'short-unit': 'K',
    };

    if (typeOutputData === 'absolute') {
      if (period === 'total') {
        typeGraph = 'area3d';

        for (const [key, value] of Object.entries(countryFieldData[field])) {
          const dateStr = Date.parse(key);
          resultArr.push([dateStr, value]);
        }
      } else {
        typeGraph = 'bar3d';
        Object.entries(countryFieldData[field]).reduce((acc, [key, value]) => {
          const dateStr = Date.parse(key);
          const todayValue = value - acc;
          resultArr.push([dateStr, todayValue]);
          return value;
        }, 0);
      }
    }

    if (typeOutputData === 'relative') {
      const population = iso3 === '' ? getPopulation('world') : getPopulation('countries', iso3);

      if (period === 'total') {
        typeGraph = 'area3d';

        for (const [key, value] of Object.entries(countryFieldData[field])) {
          const dateStr = Date.parse(key);
          const relValue = Number((100000 * (value / population)).toFixed(2));
          resultArr.push([dateStr, relValue]);
        }
      } else {
        typeGraph = 'bar3d';
        Object.entries(countryFieldData[field]).reduce((acc, [key, value]) => {
          const dateStr = Date.parse(key);
          const relTodayValue = Number((100000 * ((value - acc) / population)).toFixed(2));
          resultArr.push([dateStr, relTodayValue]);
          return value;
        }, 0);

        if (field === 'deaths') {
          scaleY = { values: '0:3:0.05' };
        }

        if (field === 'recovered') {
          scaleY = { values: '0:150:1' };
        }
      }
    }

    const config = JSON.parse(JSON.stringify(GRAPH_CONFIG));
    config.series = [{ values: resultArr, 'line-width': 5 }];
    config.type = typeGraph;
    config['scale-y'] = scaleY;

    zingchart.render({
      id: 'charts',
      data: config,
      height: '100%',
      width: '100%',
    });
  };

  const setCharts = () => {
    const countryIso3 = DB.iso3;

    const url =
      countryIso3 === ''
        ? `${CUMULATIVE_TOTAL_PATH}all${END_REQUEST_STRING}`
        : `${CUMULATIVE_TOTAL_PATH}${countryIso3}${END_REQUEST_STRING}`;

    wrapFetchAsync(url, renderCharts);
  };

  return { setCharts };
};

export default graph;
