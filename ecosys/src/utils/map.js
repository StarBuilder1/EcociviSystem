import "leaflet/dist/leaflet.css";
import $L from "leaflet";

const createMap = (divId, options) => {
  let map = $L.map(divId, options);
  return map;
};

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};

/*------------------------
* Ecocivi-System-Map
--------------------------*/
export class DataShowMap {
  constructor(mapContainer) {
    const OSMLayer = $L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap contributors",
      }
    );
    this.map = createMap(mapContainer, {
      layers: OSMLayer,
      minZoom: 2,
      zoom: 6,
      center: [48, 14.05],
      maxBounds: $L.latLngBounds($L.latLng(-90, -160), $L.latLng(90, 200)),
    });
    this.layers = [];
  }

  destroy() {
    this.map && this.map.remove();
  }
}

export default {
  createMap,
  createTileLayer,
};
