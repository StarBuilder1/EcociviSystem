import Vue from "vue";
import VueRouter from "vue-router";

import EvaluateAnalyze from "../views/EvaluateAnalyze/index";
import EvaluateAnalyzeHome from "../views/EvaluateAnalyze/views/EvaluateAnalyzeHome";
import EvaluateAnalyzeSystem from "../views/EvaluateAnalyze/views/SystemPage";
import EvaluateAnalyzeSystemMap from "../views/EvaluateAnalyze/views/SystemPageComponent/SystemMap";
import EvaluateAnalyzeSystemTable from "../views/EvaluateAnalyze/views/SystemPageComponent/SystemTable";
import EvaluateAnalyzeSystemVisual from "../views/EvaluateAnalyze/views/SystemPageComponent/SystemViusal";

const Path = "/EcociviAnalyze";

//1.use router
Vue.use(VueRouter);

//2.define routes
const routes = [
  {
    path: "/",
    redirect: Path,
  },
  //add the route
  {
    path: Path,
    component: EvaluateAnalyze,
    redirect: Path + "/Home",
    children: [
      {
        path: "Home",
        component: EvaluateAnalyzeHome,
      },
      {
        path: "System",
        component: EvaluateAnalyzeSystem,
        redirect: Path + "/System/Map",
        children: [
          {
            path: "Map",
            component: EvaluateAnalyzeSystemMap,
          },
          {
            path: "Table",
            component: EvaluateAnalyzeSystemTable,
          },
          {
            path: "Visual",
            component: EvaluateAnalyzeSystemVisual,
          },
        ],
      },
    ],
  },
];

//3.create router instance
const router = new VueRouter({
  routes,
});

//4.export router
export default router;
