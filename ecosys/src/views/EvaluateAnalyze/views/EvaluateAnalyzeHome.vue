<template>
  <div class="parent2">
    <div style="grid-area: 2 / 2 / 3 / 4">
      <h1 class="AnalyzeTitle">Ecological and Environmental Index System</h1>
      <p class="AnalyzeIntroduce">
        A platform for scientific analysis on <br />
        Ecological and Environmental Index Construction and Assessment
      </p>
    </div>
    <div style="grid-area: 3 / 2 / 4 / 2">
      <router-link to="/EcociviAnalyze/System" class="ButtonTitle">
        <el-row style="text-align: left">
          <el-image
            class="Zoom"
            style="width: 350px; height: 350px; margin-top: 20px"
            :src="evaluateanalyzeurl"
            :fit="cover"
          ></el-image>
        </el-row>
        <el-row style="text-align: left" id="topic">
          🏃‍♂️ Enter the Evaluation System
        </el-row>
      </router-link>
    </div>
    <div style="grid-area: 3/6/1/4">
      <div class="AnalyzeCardStyle">
        <h1 class="AnalyzeSubTitle">Introduction</h1>
        <h1 class="AnalyzeTitle2">
          Welcome to our Environmental Index System (EIS) platform! We offer a
          comprehensive solution for assessing regional environmental quality,
          utilizing weighted variables to calculate an Environmental Index.
        </h1>
      </div>
    </div>
    <div style="grid-area: 3/8/1/6">
      <div class="AnalyzeCardStyle">
        <h1 class="AnalyzeSubTitle">Function</h1>
        <h1 class="AnalyzeTitle2">
          Based on multiple quantifiable indicators, you can select different
          criteria and assign weights, calculating the comprehensive
          environmental index. This allows for evaluating the environmental
          quality of selected regions and visualizing them on a map.
        </h1>
      </div>
    </div>
    <div style="grid-area: 5/6/3/4">
      <div class="AnalyzeCardStyle">
        <h1 class="AnalyzeSubTitle">Data Source</h1>
        <h1 class="AnalyzeTitle2">
          Our ecological environmental data is sourced from the platform
          https://www.data.gv.at/en/, which provides open datasets for Austria
          across various domains. This platform includes data relevant to
          different provinces of Austria. We have extracted data pertaining to
          ecological aspects such as water resources, land cover, and land use
          from this platform.
        </h1>
      </div>
    </div>
    <div style="grid-area: 5/8/3/6">
      <div class="AnalyzeCardStyle">
        <h1 class="AnalyzeSubTitle">Indicators</h1>
        <h1 class="AnalyzeTitle2">
          The ecosystem assessment indicators comprise three aspect:<br />
          1.Water: Area of water; Density of water; Snow and ice;<br />
          2.Human activities: Area of sealed land; Non-vegetated unsealed
          surfaces;<br />
          3.Natrual land cover: Woody; Herbaceous permannent; Herbanceous
          periodically; Reeds
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluateAnalyzeHome",
  data() {
    return {
      evaluateanalyzeurl: require("@/assets/picture/data-analysis.png"),
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/Grid.css";
.AnalyzeTitle {
  color: #ffffff;
  font-size: 3.25rem;
  font-weight: 800;
  line-height: 1.2;
  font-family: "Century Schoolbook";
  text-shadow: 0 0 20px rgb(3, 241, 3);
}
.AnalyzeIntroduce {
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.2;
  font-family: "Century Schoolbook";
}
.AnalyzeSubTitle {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.2;
  font-family: "Century Schoolbook";
  text-align: center;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}
.AnalyzeTitle2 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.2;
  font-family: "Century Schoolbook";
  text-align: left;
  padding-top: 5px;
  padding-left: 25px;
  padding-right: 20px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}
.AnalyzePara {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.2;
  font-family: "Century Schoolbook";
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  line-height: 25px;
}
.AnalyzeCardStyle {
  margin-top: 55px;
  margin-left: 40px;
  width: 75%;
  height: 75%;
  border-radius: 30px;
  background-color: hsla(0, 0%, 100%, 0.3); /*背景框*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}
.ButtonTitle {
  margin-top: 0px;
  padding: 50px;
  font-size: 21px;
  font-weight: 800;
  text-decoration: none;
}
.ButtonTitle #topic {
  color: #ffffff;
  font-family: "Century Schoolbook";
  border-radius: 10px;
  padding: 5px;
  font-size: 1.25rem;
  text-shadow: 0 0 20px rgb(17, 147, 253);
}
.ButtonTitle #topic:hover {
  background-color: hsla(220, 83%, 42%, 0.8);
}
</style>
