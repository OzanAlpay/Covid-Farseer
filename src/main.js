import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@inkline/inkline/dist/inkline.css";
import Inkline from "@inkline/inkline";

Vue.use(Inkline);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
