<template>
  <i-layout>
    <i-row>
      <i-column xs="12" offset-xs="4">
        <i-nav>
          <i-nav-item href="#">COVID-19 Estimation</i-nav-item>
          <i-nav-item>
            <i-select
              @input="onSelectionChange($event)"
              :placeholder="showPlaceholder"
              value="Select A Country"
            >
              <i-select-option
                v-for="(country, index) of countries"
                :key="index"
                :value="country.slug"
                :label="country.name"
                @change="onSelectionChange($event)"
              />
            </i-select>
          </i-nav-item>
        </i-nav>
      </i-column>
    </i-row>
  </i-layout>
</template>

<script>
export default {
  name: "AppNavbar",
  props: {
    countries: {
      type: Array
    }
  },
  methods: {
    onSelectionChange(event) {
      this.$store.dispatch("setSelectedCountryBySlugName", event);
    }
  },
  computed: {
    showPlaceholder: function() {
      const selection = this.$store.getters.getSelectedCountry;
      if (selection.name) {
        return selection.name;
      }
      return "Select A Country";
    }
  }
};
</script>

<style scoped>
.i-nav {
  margin-left: 10%;
}
</style>
