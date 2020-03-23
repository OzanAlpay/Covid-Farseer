<template>
  <i-layout>
    <i-layout-header><AppNavBar /> </i-layout-header>
    <i-layout vertical>
      <i-layout-aside class="_background-primary">
        Left Aside
      </i-layout-aside>
      <i-layout-content class="_background-secondary">
        Right Aside
      </i-layout-content>
    </i-layout>
  </i-layout>
</template>

<script>
// @ is an alias to /src
import AppNavBar from "@/components/pages/shared/AppNavBar.vue";
export default {
  name: "Home",
  components: {
    AppNavBar
  }
};
</script>
<style scoped>
.layout-aside {
  width: 30% !important;
}
</style>
