import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@inkline/inkline/dist/inkline.css";
import Inkline from "@inkline/inkline";
import TrendChart from "vue-trend-chart";

Vue.use(Inkline);
Vue.use(TrendChart);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
