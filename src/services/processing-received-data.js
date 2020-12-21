import customJSON from './medium.geo.json';

const createObj = (flag, lat, long, country, cases, deaths, recovered) => {
  return {
    flag,
    lat,
    long,
    country,
    cases,
    deaths,
    recovered,
  };
};

const processingReceivedData = data => {
  data.map(item => {
    const total = createObj(
      item.countryInfo.flag,
      item.countryInfo.lat,
      item.countryInfo.long,
      item.country,
      item.cases,
      item.deaths,
      item.recovered,
    );
    const lastDay = createObj(
      item.countryInfo.flag,
      item.countryInfo.lat,
      item.countryInfo.long,
      item.country,
      item.todayCases,
      item.todayDeaths,
      item.todayRecovered,
    );
    const relativeTotal = createObj(
      item.countryInfo.flag,
      item.countryInfo.lat,
      item.countryInfo.long,
      item.country,
      +(item.casesPerOneMillion / 10).toFixed(2),
      +(item.deathsPerOneMillion / 10).toFixed(2),
      +(item.recoveredPerOneMillion / 10).toFixed(2),
    );
    const relativeLast = createObj(
      item.countryInfo.flag,
      item.countryInfo.lat,
      item.countryInfo.long,
      item.country,
      +(100000 * (item.todayCases / item.population)).toFixed(2),
      +(100000 * (item.todayDeaths / item.population)).toFixed(2),
      +(100000 * (item.todayRecovered / item.population)).toFixed(2),
    );

    item.relativeTotal = relativeTotal;
    item.relativeLast = relativeLast;
    item.lastDay = lastDay;
    item.total = total;

    return item;
  });

  customJSON.features.forEach(item => {
    for (let i = 0; i < data.length; i++) {
      if (item.properties.iso_a3 === data[i].countryInfo.iso3) {
        item.info = data[i];
      }
    }
  });

  customJSON.features = customJSON.features.filter(item => {
    return Object.prototype.hasOwnProperty.call(item, 'info');
  });

  return customJSON;
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
    (data.casesPerOneMillion / 10).toFixed(2),
    (data.deathsPerOneMillion / 10).toFixed(2),
    (data.recoveredPerOneMillion / 10).toFixed(2),
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
