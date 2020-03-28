<template>
  <i-layout>
    <i-layout-header
      ><AppNavBar :countries="getAvailableCountries" />
    </i-layout-header>
    <i-layout vertical>
      <i-layout-aside class="_background-primary">
        Left Aside
        <TimeDataColumn />
      </i-layout-aside>
      <i-layout-content class="_background-light">
        <GraphColumn />
      </i-layout-content>
    </i-layout>
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
