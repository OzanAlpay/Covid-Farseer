import Vue from "vue";
import Vuex from "vuex";
import CovidService from "@/services/CovidDataService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    availableCountries: [],
    selectedCountry: {}
  },
  mutations: {
    SET_SELECTED_COUNTRY(state, country) {
      state.selectedCountry = country;
    },
    SET_AVAILABLE_COUNTRIES(state, countries) {
      state.availableCountries = countries;
    }
  },
  actions: {
    setSelectedCountryBySlugName({ commit, getters }, slugName) {
      let country = getters.getAvailableCountries.filter(
        country => country.slug === slugName
      );
      if (country.length !== 1) {
        console.error("We have a problem Houston!");
        // TODO Fallback to default?
      }
      country = country[0];
      commit("SET_SELECTED_COUNTRY", country);
    },
    setAvailableCountries({ commit, getters }) {
      if (getters.getAvailableCountries.length === 0) {
        console.log("FETCH DATA!");
        return CovidService.getAvailableCountries().then(response => {
          let countries = response.data.Countries;
          countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
          countries = countries.map(country => ({
            name: country.Country,
            slug: country.Slug,
            totalConfirmed: country.TotalConfirmed
          }));
          commit("SET_AVAILABLE_COUNTRIES", countries);
        });
      }
      // TODO Catch Network Error Here
    }
  },
  getters: {
    getSelectedCountry(state) {
      return state.selectedCountry;
    },
    getAvailableCountries(state) {
      return state.availableCountries;
    }
  },
  modules: {}
});
