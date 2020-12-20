const DB = {
  keyForLS: '',
  iso3: '',
  map: null,
  legend: null,
  layer: null,
  info: null,
  mode: null,
  total: {
    cases: [0, 1000, 3000, 20000, 50000, 100000, 250000, 400000, 500000, 1000000],
    deaths: [0, 1000, 3000, 10000, 20000, 50000, 100000, 150000, 200000, 300000],
    recovered: [0, 1000, 3000, 20000, 50000, 100000, 250000, 400000, 500000, 1000000],
  },
  lastDay: {
    cases: [0, 500, 1000, 2000, 3000, 5000, 10000, 15000, 20000, 30000],
    deaths: [0, 20, 50, 100, 150, 200, 300, 400, 500, 600],
    recovered: [0, 500, 1000, 2000, 4000, 10000, 15000, 20000, 25000, 30000],
  },
  relativeTotal: {
    cases: [0, 100, 250, 500, 1000, 1500, 2000, 3000, 4000, 5000],
    deaths: [0, 5, 10, 20, 30, 40, 50, 70, 80, 100],
    recovered: [0, 100, 200, 300, 500, 700, 1000, 1500, 2000, 3000],
  },
  relativeLast: {
    cases: [0, 10, 20, 30, 40, 50, 60, 70, 80, 100],
    deaths: [0, 0.05, 0.1, 0.15, 0.3, 0.5, 1, 1.5, 2, 2.5],
    recovered: [0, 10, 20, 30, 40, 50, 60, 80, 100, 120],
  },
};

export default DB;
