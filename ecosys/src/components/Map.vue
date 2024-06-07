<template>
  <el-container>
    <el-header style="background-color: #545c64">
      <NavHead />
    </el-header>
    <el-main>
      <div class="map-container" id="map-container"></div>
    </el-main>
  </el-container>
</template>

<script>
import NavHead from "../components/NavHead";
export default {
  name: "Map",
  components: {
    NavHead,
  },
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    this.map.setView([30, 114], 4);
  },
};
</script>

<style>
.map-container {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
