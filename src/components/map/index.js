import L from 'leaflet';

const Map = () => {
  const getRadius = num => {
    if (num < 1000) return 4;
    if (num < 3000) return 6;
    if (num < 20000) return 8;
    if (num < 50000) return 12;
    if (num < 100000) return 14;
    if (num < 250000) return 16;
    if (num < 400000) return 18;
    if (num < 500000) return 20;
    if (num < 1000000) return 23;

    return 26;
  };

  const setMarkersInMap = (map, data) => {
    if (data.length === 0) {
      return;
    }

    data.forEach(({ country, cases, deaths, countryInfo: { lat, long } }) => {
      const icon = {
        color: 'tomato',
        radius: getRadius(cases),
      };

      const circle = L.circleMarker([lat, long], icon).addTo(map);
      const text = `<h2>${country}</h2><p>Cases: ${cases}</p><p>Deaths: ${deaths}</p>`;
      circle.bindPopup(text);
      circle.on('mouseover', () => {
        circle.bindPopup(text, { offset: L.point(0, -20) }).openPopup();
      });
      circle.on('mouseout', () => circle.closePopup());
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

    L.control.scale({ metric: true, imperial: false, position: 'topright' }).addTo(map);
    setMarkersInMap(map, data);
  };

  return {
    setMap,
  };
};

export default Map;
