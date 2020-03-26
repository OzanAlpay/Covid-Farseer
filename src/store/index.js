import Vue from "vue";
import Vuex from "vuex";
import CovidService from "@/services/CovidDataService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    availableCountries: [],
    selectedCountry: ""
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
    setSelectedCountry({ commit }, country) {
      commit("SET_SELECTED_COUNTRY", country);
    },
    setAvailableCountries({ commit, getters }) {
      console.log("Set Available Countries Are Fired!");
      if (getters.getAvailableCountries) {
        console.log("Data Exists = ");
        console.log(getters.getAvailableCountries);
        // Data Exists No need to fetch it again
        return;
      }
      return CovidService.getAvailableCountries().then(response => {
        let countries = response.data.Countries;
        countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        countries = countries.map(country => ({
          country: country.Country,
          slug: country.Slug,
          totalConfirmed: country.TotalConfirmed
        }));
        commit("SET_AVAILABLE_COUNTRIES", countries);
      });
      // TODO Catch Network Error Here
    }
  },
  getters: {
    getSelectedCountry(state) {
      return state.selectedCountry;
    },
    getAvailableCountries(state) {
      return state.getAvailableCountries;
    }
  },
  modules: {}
});
