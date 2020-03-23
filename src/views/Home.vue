<template>
  <i-layout>
    <i-layout-header><AppNavBar :countries="countries" /> </i-layout-header>
    <i-layout vertical>
      <i-layout-aside class="_background-primary">
        Left Aside
      </i-layout-aside>
      <i-layout-content class="_background-secondary">
        <div v-if="selectedCountry">
          Selected Country Set as {{ selectedCountry }}
        </div>
        Right Aside
      </i-layout-content>
    </i-layout>
  </i-layout>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import AppNavBar from "@/components/pages/shared/AppNavBar.vue";
export default {
  name: "Home",
  components: {
    AppNavBar
  },
  data() {
    return {
      countries: ["Turkey", "Germany", "USA", "France", "Italy"]
    };
  },
  computed: mapState(["selectedCountry"])
};
</script>
<style scoped>
.layout-aside {
  width: 30% !important;
}
</style>
