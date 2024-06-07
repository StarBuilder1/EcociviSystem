<template>
  <el-container style="width: 100%; height: 100%; background-color: #ffffff">
    <el-col class="data-show-map-wrapper">
      <div id="data-show-map">
        <div class="leaflet-control map-select">
          <el-row class="leaflet-right map-select">
            <h2
              style="
                font-size: 20px;
                height: 15px;
                font-family: 'Century Schoolbook';
              "
            >
              Factor Selection
            </h2>
            <el-select
              v-model="MapIndex"
              placeholder="Please select the factor"
              no-data-text="No data processed🙁"
            >
              <el-option
                v-for="item in IndexList"
                :key="item.Name"
                :label="item.Name"
                :value="item.Name"
              >
              </el-option>
            </el-select>
            <br />
            <el-button
              @click="RadioClickMap"
              type="primary"
              class="custom-button"
              >Visualize Result</el-button
            >
            <br />
            <el-button @click="RemoveMap" type="primary" class="custom-button"
              >Clear Current Display</el-button
            >
            <br />
            <el-button
              class="reset-button custom-button"
              @click="RestartMap"
              type="danger"
              >Clear All Results</el-button
            >
          </el-row>
        </div>
      </div>
    </el-col>
  </el-container>
</template>

<script>
import { AnalyzeMap } from "../../js/AnalyzeMap";
import { GetResultJson, JudgeSelectJson } from "../../js/getData";
import Global from "../../views/Globel/Global";

export default {
  name: "SystemViusal",
  data() {
    return {
      VisualOption: "",
      //For Index selection
      MapIndex: "",
      IndexList: "",
    };
  },
  methods: {
    mapInit() {
      this.mapobj = new AnalyzeMap("data-show-map");
    },
    RadioClickMap() {
      console.log("Enter");
      this.mapobj.RemoveJson();
      this.mapobj.VisualGeoJson(Global.VisualJson, this.MapIndex);
      console.log("Finished");
    },
    RemoveMap() {
      this.mapobj.RemoveJson();
    },
    RestartMap() {
      Global.VisualJson = [];
      this.mapobj.RemoveJson();
      this.mapobj.VisualGeoJson(Global.VisualJson, this.MapIndex);
    },
  },
  mounted() {
    this.mapInit();
    this.IndexList = GetResultJson();
    for (let i = 0; i < Global.MapClickData.length; i++) {
      JudgeSelectJson(Global.MapClickData[i].name, this.IndexList);
    }
  },
  beforeDestroy() {
    this.mapobj && this.mapobj.destroy();
  },
};
</script>

<style scoped>
#data-show-map {
  height: 100%;
  width: 100%;
  position: relative;
}
.map-select {
  position: fixed;
  padding-top: 10px;
  padding-right: 50px;
}

.reset-button {
  display: block;
  margin-left: 0px;
}
.custom-button {
  font-family: "Century Schoolbook";
  font-weight: 600;
  font-size: 15px;
  margin-top: 10px;
  width: 210px;
}
</style>
