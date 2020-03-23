<template>
  <i-layout>
    <i-row>
      <i-column xs="12" offset-xs="4">
        <i-nav>
          <i-nav-item href="#">COVID-19 Estimation</i-nav-item>
          <i-nav-item>
            <i-select v-model="selectedCountry" placeholder="Select A Country">
              <i-select-option
                v-for="(country, index) of countries"
                :key="index"
                :value="country"
                :label="country"
              />
            </i-select>
          </i-nav-item>
          <!--<i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
          <i-nav-item>Item</i-nav-item>
          <i-nav-item disabled>Disabled</i-nav-item> -->
        </i-nav>
      </i-column>
    </i-row>
    SelectedCountry is = {{ selectedCountry }}
  </i-layout>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      countries: ["Turkey", "USA", "Germany", "Italy"],
      selectedCountry: ""
    };
  }
};
</script>

<style scoped>
.i-nav {
  margin-left: 10%;
}
</style>
