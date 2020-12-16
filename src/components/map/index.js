import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customJSON from '../../services/medium.geo.json';

const Map = () => {
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

  const getColor = d => {
    if (d === undefined) return 'white';
    if (d < 1000) return '#5e4fa2';
    if (d < 3000) return '#3288bd';
    if (d < 20000) return '#66c2a5';
    if (d < 50000) return '#abdda4';
    if (d < 100000) return '#e6f598';
    if (d < 250000) return '#ffffbf';
    if (d < 400000) return '#fee08b';
    if (d < 500000) return '#fdae61';
    if (d < 1000000) return 'tomato';
    return 'red';
  };

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

  const setMap = (idElem, data = []) => {
    const myMap = document.getElementById(idElem);
    const map = L.map(myMap, { worldCopyJump: true }).setView([30, 0], 2);

    const attribution =
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
    const tileUrl =
      'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=iOay4iXHmxfQ4n471QOS';
    const tiles = L.tileLayer(tileUrl, { attribution, minZoom: 2, maxZoom: 18 });
    tiles.addTo(map);

    L.control.scale({ metric: true, imperial: false, position: 'topright' }).addTo(map);

    const info = L.control();

    // eslint-disable-next-line no-shadow,no-unused-vars
    info.onAdd = function (map) {
      // eslint-disable-next-line no-underscore-dangle
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      // eslint-disable-next-line no-underscore-dangle
      return this._div;
    };

    info.update = function (props) {
      // eslint-disable-next-line no-underscore-dangle
      this._div.innerHTML = `<h4>Country info</h4>${
        props ? `<b>${props.country}</b><br />${props.population} people` : 'Hover over a state'
      }`;
    };

    info.addTo(map);

    let customLayer;
    function highlightFeature(e) {
      const layer = e.target;
      // const iso3 = layer.feature.properties.iso_a3;
      // const countryInfo = data.filter(item => iso3 === item.countryInfo.iso3)[0];
      const countryInfo = {};
      countryInfo.country = layer.feature.properties.admin;
      countryInfo.population = layer.feature.properties.info.population;

      layer.setStyle({
        weight: 3,
        color: 'tomato',
        dashArray: '',
        fillOpacity: 0.6,
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      info.update(countryInfo);
      layer.bindPopup(layer.feature.properties.admin, { offset: L.point(0, 0) }).openPopup();
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
      // data.forEach(item => {
      //   if (feature.properties.iso_a3 === item.countryInfo.iso3) {
      //     // feature.info = item;
      //     feature.properties.cases = item.cases;
      //   }
      // });

      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5,
        fillColor: getColor(feature.properties.info.cases),
      };
    };

    customJSON.features.forEach(item => {
      for (let i = 0; i < data.length; i++) {
        if (item.properties.iso_a3 === data[i].countryInfo.iso3) {
          item.properties.info = data[i];
          // item.properties.cases = data[i].cases;
        }
      }
    });

    const jsonCustom = customJSON.features.filter(item => {
      return Object.prototype.hasOwnProperty.call(item.properties, 'info');
    });

    // console.log(customJSON.features);
    customLayer = L.geoJSON(jsonCustom, {
      style,
      onEachFeature,
    })
      .bindPopup(layer => {
        return layer.feature.properties.admin;
      })
      .addTo(map);

    // setMarkersInMap(map, data);

    const legend = L.control({ position: 'bottomright' });
    // eslint-disable-next-line no-shadow,no-unused-vars
    legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 1000, 3000, 20000, 50000, 100000, 250000, 400000, 500000, 1000000];
      const labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          `<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`,
        );
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    legend.addTo(map);
  };

  return {
    setMap,
  };
};

export default Map;
