import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@inkline/inkline/dist/inkline.css";
import Inkline from "@inkline/inkline";

import DateFormatterFilter from "./filters/DateFormatterFilter";

Vue.use(Inkline);
Vue.filter("formatDate", DateFormatterFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

const isLocal = document.location.hostname === "localhost";

if (isLocal) {
  window["ga-disable-UA-162187569-1"] = true;
}
