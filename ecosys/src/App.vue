<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {},
  mounted() {
    document.title = "EcoCivi";
  },
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
