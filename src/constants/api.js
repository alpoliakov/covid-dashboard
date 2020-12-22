const CASES_COUNTRIES_AND_PROVINCES = 'https://disease.sh/v3/covid-19/jhucsse';
const GET_HISTORY = 'https://disease.sh/v3/covid-19/historical?lastdays=';
const TOTAL_CASES_TODAY_PATH = 'https://disease.sh/v3/covid-19/all?yesterday=0';
const COUNTRIES_CASES_PATH = 'https://corona.lmao.ninja/v2/countries';
const CUMULATIVE_TOTAL_PATH = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
// const CUMULATIVE_COUNTRY_PATH = 'https://disease.sh/v3/covid-19/historical/BGR?lastdays=366';
const BIG_DATA_PATH =
  'https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/cases';

const OBJ_PATHS = {
  countries: COUNTRIES_CASES_PATH,
  world: TOTAL_CASES_TODAY_PATH,
};

export {
  GET_HISTORY,
  TOTAL_CASES_TODAY_PATH,
  COUNTRIES_CASES_PATH,
  CASES_COUNTRIES_AND_PROVINCES,
  CUMULATIVE_TOTAL_PATH,
  OBJ_PATHS,
  BIG_DATA_PATH,
};
