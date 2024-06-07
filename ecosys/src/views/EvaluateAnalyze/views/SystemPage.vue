<template>
  <el-container class="data-show">
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="data-show-header"
        mode="horizontal"
        background-color="#001529"
      >
        <el-row>
          <el-col style="margin-left: 15px" :span="2" :offset="0">
            <a
              class="header-logo"
              href="/#/EcociviAnalyze/Home"
              rel="noopener noreferrer"
            >
              <div></div>
            </a>
          </el-col>

          <el-col :span="20" :offset="0">
            <h1
              style="font-family: 'Century Schoolbook'"
              class="data-show-header-banner"
            >
              Ecological Civilisation Assessment System
            </h1>
          </el-col>
        </el-row>
      </el-menu>
    </el-header>
    <el-container class="data-show-main">
      <el-aside
        style="
          height: 100%;
          width: 12%;
          font-family: 'Century Schoolbook';
          font-weight: 500;
        "
      >
        <el-menu
          class="el-menu-vertical-demo data-show"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/EcociviAnalyze/System/Map">
            <i class="el-icon-document"></i>
            <span slot="title"> Choose Locations </span>
          </el-menu-item>
          <el-menu-item index="/EcociviAnalyze/System/Table">
            <i class="el-icon-setting"></i>
            <span slot="title"> Indicator Selection </span>
          </el-menu-item>
          <el-menu-item index="/EcociviAnalyze/System/Visual">
            <i class="el-icon-picture"></i>
            <span slot="title"> Result Display </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="height: 100%; width: 90%">
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "SystemPage",
  methods: {},
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.data-show {
  height: 100%;
  width: 100%;
}
.data-show-main {
  height: 95%;
  width: 100%;
}

.data-show-header,
.data-show-header div,
.data-show-content > div {
  height: 100%;
}
.data-show-header-banner {
  font-size: 1.75rem;
  margin: 0 0 0 -60px;
  color: white;
  height: 59px;
  line-height: 59px;
}

.header-logo {
  display: block;
  height: 100%;
  background: url("../../../assets/picture/logo.png") no-repeat scroll left
    center;
  background-size: auto 50px;
}

.data-show-footer > span {
  right: 10px;
  position: absolute;
}
</style>
