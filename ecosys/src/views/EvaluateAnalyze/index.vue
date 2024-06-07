<template>
  <div style="height: 100%; width: 100%">
    <video id="v1" class="videoBackground" autoplay muted loop>
      <source src="../../assets/picture/1920x1080-home-video.mp4" />
    </video>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped>
.videoBackground {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -9999;
}
</style>
