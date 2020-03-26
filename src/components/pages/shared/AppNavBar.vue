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
            >
              <i-select-option
                v-for="(country, index) of countries"
                :key="index"
                :value="country"
                :label="country"
                @change="onSelectionChange($event)"
              />
            </i-select>
          </i-nav-item>
          <!--<i-nav-item :to="{ name: 'index' }">Router Link</i-nav-item>
          <i-nav-item>Item</i-nav-item>
          <i-nav-item disabled>Disabled</i-nav-item> -->
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
      this.$store.dispatch("setSelectedCountry", event);
      console.log(this.showPlaceholder);
    }
  },
  computed: {
    showPlaceholder: function() {
      const selection = this.$store.getters.getSelectedCountry;
      if (selection) {
        return selection;
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
