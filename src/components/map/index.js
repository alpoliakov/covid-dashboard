import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DB from '../../services/db';

const Map = () => {
  const getColor = (d, arr) => {
    if (d === undefined) return 'white';
    const colorsArr = [
      '#5e4fa2',
      '#3288bd',
      '#66c2a5',
      '#abdda4',
      '#e6f598',
      '#ffffbf',
      '#fee08b',
      '#fdae61',
      '#fc8715',
      '#ff6347',
    ];
    for (let i = 0; i < arr.length; i++) {
      if (d <= +arr[i]) {
        return colorsArr[i];
      }
    }
    return 'red';
  };

  const setMap = idElem => {
    const myMap = document.getElementById(idElem);
    const map = L.map(myMap, { worldCopyJump: true }).setView([30, 0], 2);

    const attribution =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
    const tileUrl =
      'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=iOay4iXHmxfQ4n471QOS';
    const tiles = L.tileLayer(tileUrl, { attribution, minZoom: 2, maxZoom: 18 });
    tiles.addTo(map);
    DB.map = map;
  };

  const setJSONLayer = (data = [], arrButtons, mode) => {
    const { map } = DB;
    const info = L.control();
    const arrActiveBtn = arrButtons.filter(item => item.classList.contains('active_btn'));
    const field =
      arrActiveBtn.length === 1 ? 'cases' : arrActiveBtn[arrActiveBtn.length - 1].dataset.sort;

    const result = [];
    data.features.map(item => result.push(+item.info.relativeLast.deaths));
    // console.log(result.sort((a, b) => a - b));

    info.onAdd = function () {
      this.div = L.DomUtil.create('div', 'info');
      this.update();
      return this.div;
    };

    info.update = function (props) {
      this.div.innerHTML = `<h4>Country info</h4>${
        props ? `<b>${props.country}</b><br />${props.population} people` : 'Hover over a state'
      }`;
    };

    info.addTo(map);

    let customLayer;
    function highlightFeature(e) {
      const layer = e.target;
      const countryInfo = {};
      countryInfo.country = layer.feature.properties.admin;
      countryInfo.population = layer.feature.info.population;

      layer.setStyle({
        weight: 3,
        color: 'tomato',
        dashArray: '',
        fillOpacity: 0.6,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      const text = layer.feature.info[mode][field];

      const title = `<h4>${layer.feature.properties.admin}</h4>
                     <p>${field}: ${text}</p>`;

      info.update(countryInfo);
      layer.bindPopup(title, { offset: L.point(0, 0) }).openPopup();
    }

    const resetHighlight = e => {
      customLayer.resetStyle(e.target);
      e.target.closePopup();
      info.update();
    };

    const zoomToFeature = e => {
      map.fitBounds(e.target.getBounds());
    };

    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    };

    const style = feature => {
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5,
        fillColor: getColor(feature.info[mode][field], DB[mode][field]),
      };
    };

    customLayer = L.geoJSON(data, {
      style,
      onEachFeature,
    })
      .bindPopup(layer => {
        return layer.feature.properties.admin;
      })
      .addTo(map);

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = DB[mode][field];
      const labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          `<i style="background:${getColor(from, DB[mode][field])}"></i> ${from}${
            to ? `&ndash;${to}` : '+'
          }`,
        );
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    legend.addTo(map);
    DB.legend = legend;
    DB.layer = customLayer;
    DB.info = info;
  };

  const removeLayers = () => {
    const { map, layer, legend, info } = DB;
    map.removeControl(legend);
    map.removeControl(info);
    map.removeLayer(layer);
  };

  return {
    setMap,
    setJSONLayer,
    removeLayers,
  };
};

export default Map;

// const getRadius = num => {
//   if (num < 1000) return 4;
//   if (num < 3000) return 6;
//   if (num < 20000) return 8;
//   if (num < 50000) return 12;
//   if (num < 100000) return 14;
//   if (num < 250000) return 16;
//   if (num < 400000) return 18;
//   if (num < 500000) return 20;
//   if (num < 1000000) return 23;
//
//   return 26;
// };

// const setMarkersInMap = (map, data) => {
//   if (data.length === 0) {
//     return;
//   }
//
//   data.forEach(({ country, cases, deaths, countryInfo: { lat, long } }) => {
//     const icon = {
//       color: getColor(cases),
//       radius: getRadius(cases),
//     };
//
//     const circle = L.circleMarker([lat, long], icon).addTo(map);
//     const text = `<h2>${country}</h2><p>Cases: ${cases}</p><p>Deaths: ${deaths}</p>`;
//     circle.bindPopup(text);
//     circle.on('mouseover', () => {
//       circle.bindPopup(text, { offset: L.point(0, -20) }).openPopup();
//     });
//     circle.on('mouseout', () => circle.closePopup());
//   });
// };

// setMarkersInMap(map, data);
