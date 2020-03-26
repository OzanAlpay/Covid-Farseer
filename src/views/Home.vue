<template>
  <i-layout>
    <i-layout-header
      ><AppNavBar :countries="availableCountries" />
    </i-layout-header>
    <i-layout vertical>
      <i-layout-aside class="_background-primary">
        Left Aside
      </i-layout-aside>
      <i-layout-content class="_background-secondary">
        <div v-if="selectedCountry">
          Selected Country Set as {{ selectedCountry }}
        </div>
        Right Aside
        {{ availableCountries }}
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
  created() {
    console.log("Home Component is Created!");
  },
  computed: {
    ...mapState(["availableCountries", "selectedCountry"])
  }
};
</script>
<style scoped>
.layout-aside {
  width: 30% !important;
}
</style>
