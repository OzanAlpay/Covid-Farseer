<template>
  <i-layout>
    <i-layout-header
      ><AppNavBar :countries="getAvailableCountries" />
    </i-layout-header>
    <i-layout vertical>
      <i-layout-aside class="_background-primary">
        <TimeDataColumn />
      </i-layout-aside>
      <i-layout-content class="_background-light">
        <GraphColumn />
      </i-layout-content>
    </i-layout>
    <i-layout-footer>
      <p>
        Developed By Ozan Alpay. GitHub Repository:
        <a href="https://github.com/OzanAlpay/Covid-Foreseer">Covid Foreseer</a>
      </p>
    </i-layout-footer>
  </i-layout>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import AppNavBar from "@/components/pages/shared/AppNavBar.vue";
import GraphColumn from "@/components/pages/shared/GraphColumn.vue";
import TimeDataColumn from "@/components/pages/shared/TimeDataColumn.vue";
export default {
  name: "Home",
  components: {
    AppNavBar,
    GraphColumn,
    TimeDataColumn
  },
  computed: {
    ...mapGetters(["getAvailableCountries", "getSelectedCountry"])
  }
};
</script>
<style scoped>
.layout-aside {
  width: 30% !important;
}
</style>
