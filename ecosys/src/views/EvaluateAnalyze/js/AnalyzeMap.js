import "leaflet/dist/leaflet.css";
import $L from "leaflet";
import { DataShowMap } from "../../../utils/map";
import Global from "../views/Globel/Global";

export class AnalyzeMap extends DataShowMap {
  //Add the Austria area data
  layerGroups = new $L.FeatureGroup().addTo(this.map);

  //Input the Country GeoJson
  AddGeoJson(JsonData) {
    let myStyle = {
      color: "#49494b",
      weight: 3,
      opacity: 0.8,
    };

    var Json = $L.geoJSON(JsonData, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });

    function onEachFeature(feature, layer) {
      layer.on({
        click: ClickFeature,
      });
      let popupContent;
      if (feature.properties.ISO_A3 !== undefined) {
        popupContent =
          feature.properties.name + ", <br/>" + feature.properties.ISO_A3 + ".";
      } else {
        popupContent = "<b>Name:</b>" + feature.properties.name + "<br/>";
        popupContent +=
          '<img src="' +
          feature.properties.image +
          '" width="300" height="200"><br/>';
        popupContent +=
          "<b>Density of river:</b>" +
          feature.properties.River_density +
          "m²<br/>";
        popupContent +=
          "<b>Area of sealed land:</b>" +
          feature.properties.Sealed_area +
          "m²<br/>";
        popupContent +=
          "<b>Non-vegetated unsealed surfaces:</b>" +
          feature.properties.Non_vegetated_unsealed_surfaces +
          "m²<br/>";
        popupContent +=
          "<b>Area of water:</b>" + feature.properties.Water_area + "m²<br/>";
        popupContent +=
          "<b>Snow and ice:</b>" + feature.properties.Snow_and_ice + "m²<br/>";
        popupContent += "<b>Woody:</b>" + feature.properties.Woody + "m²<br/>";
        popupContent +=
          "<b>Herbaceous permanent:</b>" +
          feature.properties.Permanent_Herb +
          "m²<br/>";
        popupContent +=
          "<b>Herbaceous periodically:</b>" +
          feature.properties.Periodically_Herb +
          "m²<br/>";
        popupContent += "<b>Reeds:</b>" + feature.properties.Reeds + "m²<br/>";
      }

      layer.bindPopup(popupContent);
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!$L.Browser.ie && !$L.Browser.opera && !$L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function ClickFeature(e) {
      let currentName = e.target.feature.properties.name;
      console.log(currentName);
      if (JudgeFunction(currentName)) {
        Json.resetStyle(e.target);
        Global.MapClickData.length = Global.MapClickData.length - 1;
      } else {
        //Get all the data
        highlightFeature(e);
        Global.MapClickData[Global.MapClickData.length] =
          e.target.feature.properties;
        //All selected results
        for (let i = 0; i < Global.MapClickData.length; i++) {
          console.log(Global.MapClickData[i]);
        }
      }
    }
    this.layerGroups.addLayer(Json);

    //Judge the area is selected or not
    function JudgeFunction(JsonName) {
      var state = 0;
      for (let i = 0; i < Global.MapClickData.length; i++) {
        if (
          typeof Global.MapClickData[i].name !== "undefined" &&
          Global.MapClickData[i].name === JsonName
        ) {
          state = 1;
        }
      }
      return state;
    }
  }

  //remove the GeoJson
  RemoveJson() {
    this.layerGroups.clearLayers();
  }

  //visualize the region shapefile
  VisualGeoJson(ResultJsonData, IndexName) {
    let ResultJson = $L.geoJSON(ResultJsonData, {
      style: style,
      onEachFeature: onEachFeature,
    });
    this.layerGroups.addLayer(ResultJson);
    //color grading
    function style(feature) {
      return {
        fillColor: getColor(ReturnAttribute(feature, IndexName)),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    function ReturnAttribute(feature, indexName) {
      let Data = 0;
      for (let i = 0; i < feature.properties.Table.length; i++) {
        if (feature.properties.Table[i].Name == indexName) {
          Data = feature.properties.Table[i].NameData;
        }
      }
      return Data;
    }
    function getColor(d) {
      return d > 75
        ? "#90EE90"
        : d > 50
        ? "#FFEDA0"
        : d > 25
        ? "#FEB24C"
        : "#E31A1C";
    }
    //click to trigger
    function onEachFeature(feature, layer) {
      let data = ReturnAttribute(feature, IndexName);
      let popupContent = feature.properties.name + IndexName + ":" + data;
      layer.bindPopup(popupContent);
    }
  }
}
