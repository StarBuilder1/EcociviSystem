import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import utils from "./utils";
import router from "./router";

//create a particle line
import vueParticleLine from "vue-particle-line";
import "vue-particle-line/dist/vue-particle-line.css";
Vue.use(vueParticleLine);

//Use ElementUI
Vue.use(ElementUI);

//mount utils to vue
Vue.prototype.$utils = utils;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router,
  render: (h) => h(App),
}).$mount("#app");
