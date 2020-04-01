<template>
  <i-layout>
    <i-layout-header
      ><AppNavBar :countries="getAvailableCountries" />
    </i-layout-header>
    <i-layout vertical>
      <i-container fluid>
        <i-row>
          <i-column
            xl="4"
            lg="4"
            md="4"
            sm="4"
            xs="12"
            class="_background-primary"
          >
            <TimeDataColumn />
          </i-column>
          <i-column
            xl="8"
            lg="8"
            md="8"
            sm="8"
            xs="12"
            class="_background-light"
          >
            <GraphColumn />
          </i-column>
        </i-row>
      </i-container>
    </i-layout>
    <i-layout-footer>
      <p>
        Developed By Ozan Alpay. GitHub Repository:
        <a href="https://github.com/OzanAlpay/Covid-Farseer">Covid Farseer</a>
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
