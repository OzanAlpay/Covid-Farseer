import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      props: true,
      beforeEnter(to, from, next) {
        console.log("Before Route Enter Called!");
        store.dispatch("setAvailableCountries").then(() => {
          console.log("Dispatched");
          next();
        });
      },
      beforeRouteEnter(next) {
        console.log("Before Enter!");
        console.log(next);
        console.log("Before Enter Fired!");
        store
          .dispatch("setAvailableCountries")
          .then(() => console.log("Dispatched!"));
      }
    }
  ]
});

export default router;
