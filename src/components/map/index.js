import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

  const setMap = (idElem, data = [], mode) => {
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

    info.onAdd = function () {
      this.div = L.DomUtil.create('div', 'info');
      this.update();

      return this.div;
    };

    console.log(data.features);

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

      const { cases, deaths, recovered } = layer.feature.info[mode];

      const title = `<h4>${layer.feature.properties.admin}</h4>
                     <p>Cases: ${cases}</p>
                     <p>Deaths: ${deaths}</p>
                     <p>Recovered: ${recovered}</p>`;

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
        fillColor: getColor(feature.info[mode].cases),
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

    // setMarkersInMap(map, data);

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
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
