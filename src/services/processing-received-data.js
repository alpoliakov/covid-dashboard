import customJSON from './medium.geo.json';

const processingReceivedData = data => {
  customJSON.features.forEach(item => {
    for (let i = 0; i < data.length; i++) {
      if (item.properties.iso_a3 === data[i].countryInfo.iso3) {
        item.info = data[i];
      }
    }
  });
};

const createObj = (flag, country, cases, deaths, recovered) => {
  return {
    flag,
    country,
    cases,
    deaths,
    recovered,
  };
};

const receivedTotalData = data => {
  data.country = 'World';
  data.flag = 'https://vectorflags.s3-us-west-2.amazonaws.com/flags/org-un-flag-01.png';

  const total = createObj(data.flag, data.country, data.cases, data.deaths, data.recovered);

  const lastDay = createObj(
    data.flag,
    data.country,
    data.todayCases,
    data.todayDeaths,
    data.todayRecovered,
  );

  const relativeTotal = createObj(
    data.flag,
    data.country,
    (data.casesPerOneMillion * 10).toFixed(2),
    (data.deathsPerOneMillion * 10).toFixed(2),
    (data.recoveredPerOneMillion * 10).toFixed(2),
  );

  const relativeLast = createObj(
    data.flag,
    data.country,
    (100000 * (data.todayCases / data.population)).toFixed(2),
    (100000 * (data.todayDeaths / data.population)).toFixed(2),
    (100000 * (data.todayRecovered / data.population)).toFixed(2),
  );

  data.relativeTotal = relativeTotal;
  data.relativeLast = relativeLast;
  data.lastDay = lastDay;
  data.total = total;

  return data;
};

export { processingReceivedData, receivedTotalData };
