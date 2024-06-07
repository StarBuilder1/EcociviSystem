<template>
  <el-container style="width: 100%; height: 100%; background-color: #ffffff">
    <el-col class="data-show-map-wrapper">
      <div id="data-show-map">
        <div class="leaflet-control">
          <el-radio-group
            v-model="GeoJsonGroup"
            class="leaflet-right map-select"
          >
            <el-radio-button
              @change.native="CheckBoxclickMap"
              v-for="Select in SelectOp"
              :label="Select"
              :key="Select"
            ></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-col>
  </el-container>
</template>

<script>
import { AnalyzeMap } from "../../js/AnalyzeMap";
import axios from "axios";
//Use Global to store data
import Global from "../../views/Globel/Global";

const SelectOption = ["World", "Austria", "Delete"];

export default {
  name: "SystemMap",
  data() {
    return {
      GeoJsonGroup: ["Delete"],
      SelectOp: SelectOption,
    };
  },
  methods: {
    mapInit() {
      this.mapobj = new AnalyzeMap("data-show-map");
    },
    CheckBoxclickMap() {
      if (this.GeoJsonGroup == "World") {
        //Switch options and reset the array
        Global.MapClickData.length = 0;
        this.mapobj.RemoveJson();
        //add world data by axios
        axios
          .get("http://localhost:8050/api/world")
          .then((response) => {
            // get the data from backend
            const data = response.data;
            this.mapobj.AddGeoJson(data.world);
          })
          .catch((error) => {
            console.error("Error fetching data from backend:", error);
          });
      }
      if (this.GeoJsonGroup == "Austria") {
        Global.MapClickData.length = 0;
        this.mapobj.RemoveJson();
        //add austria data by axios
        axios
          .get("http://localhost:8050/api/at")
          .then((response) => {
            // get the data from backend
            const data = response.data;
            this.mapobj.AddGeoJson(data.austria);
          })
          .catch((error) => {
            console.error("Error fetching data from backend:", error);
          });
      }
      if (this.GeoJsonGroup == "Delete") {
        Global.MapClickData.length = 0;
        this.mapobj.RemoveJson();
      }
    },
  },

  mounted() {
    this.mapInit();
  },
  beforeDestroy() {
    this.mapobj && this.mapobj.destroy();
  },
};
</script>

<style scoped>
.data-show-map-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  background-size: 100% 100%;
}
#data-show-map {
  height: 95%;
  width: 97%;
  position: relative;
}

.map-select {
  position: fixed;
  padding-top: 40px;
  padding-right: 50px;
}
</style>
