import L from 'leaflet';

const Map = () => {
  const myMap = document.getElementById('myMap');
  const map = L.map(myMap).setView([0, 0], 2);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution, minZoom: 2 });
  tiles.addTo(map);
};

export default Map;
