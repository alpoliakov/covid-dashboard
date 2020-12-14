import L from 'leaflet';

const Map = () => {
  const setRadius = num => {
    if (num < 100) {
      return 8;
    }
    if (num < 1000) {
      return 10;
    }
    if (num < 1500) {
      return 12;
    }
    if (num < 2000) {
      return 14;
    }
    if (num < 4000) {
      return 16;
    }
    if (num < 8000) {
      return 18;
    }
    if (num < 12000) {
      return 21;
    }
    return 25;
  };

  const setMarkersInMap = (map, data) => {
    console.log(data);
    if (data.length === 0) {
      return;
    }
    data.forEach(item => {
      const { lat, long } = item.countryInfo;
      const { country, cases, deaths, casesPerOneMillion } = item;
      console.log(casesPerOneMillion);
      const radius = setRadius(casesPerOneMillion);

      const icon = {
        color: 'red',
        radius,
      };

      const circle = L.circleMarker([lat, long], icon).addTo(map);
      circle.bindPopup(`<h2>${country}</h2><p>Cases: ${cases}</p><p>Deaths: ${deaths}</p>`);
    });
  };

  const setMap = (idElem, data = []) => {
    const myMap = document.getElementById(idElem);
    const map = L.map(myMap).setView([30, 0], 2);
    const attribution =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
    const tileUrl =
      'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=iOay4iXHmxfQ4n471QOS';
    const tiles = L.tileLayer(tileUrl, { attribution, minZoom: 2 });
    tiles.addTo(map);
    L.control.scale({ position: 'topright' }).addTo(map);
    setMarkersInMap(map, data);
  };

  return {
    setMap,
  };
};

export default Map;
