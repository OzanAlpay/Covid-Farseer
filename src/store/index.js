import Vue from "vue";
import Vuex from "vuex";
import CovidService from "@/services/CovidDataService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    availableCountries: [],
    selectedCountry: {
      countryData: {},
      confirmedCaseData: [],
      recoveredCaseData: [],
      deathCaseData: []
    },
    comparedCountry: {
      confirmedCaseData: [],
      recoveredCaseData: [],
      deathCaseData: []
    }
  },
  mutations: {
    SET_SELECTED_COUNTRY(state, country) {
      state.selectedCountry.countryData = country;
    },
    SET_AVAILABLE_COUNTRIES(state, countries) {
      state.availableCountries = countries;
    },
    SET_CONFIRMED_CASE_DATA_FOR_SELECTED_COUNTRY(state, confirmedCaseData) {
      state.selectedCountry.confirmedCaseData = confirmedCaseData;
    },
    SET_RECOVERED_CASE_DATA_FOR_SELECTED_COUNTRY(state, recoveredCaseData) {
      state.selectedCountry.recoveredCaseData = recoveredCaseData;
    },
    SET_DEATH_CASE_DATA_FOR_SELECTED_COUNTRY(state, deadCaseData) {
      console.log("deadCaseData =");
      console.log(deadCaseData);
      state.selectedCountry.deathCaseData = deadCaseData;
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
      return CovidService.getDataByCountrySlug(country.slug).then(
        receivedData => {
          commit("SET_SELECTED_COUNTRY", country);
          commit(
            "SET_CONFIRMED_CASE_DATA_FOR_SELECTED_COUNTRY",
            receivedData.confirmed.data
          );
          commit(
            "SET_RECOVERED_CASE_DATA_FOR_SELECTED_COUNTRY",
            receivedData.recovered.data
          );
          commit(
            "SET_DEATH_CASE_DATA_FOR_SELECTED_COUNTRY",
            receivedData.deathCases.data
          );
        }
      );
    },
    setAvailableCountries({ commit, getters }) {
      if (getters.getAvailableCountries.length === 0) {
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
      return state.selectedCountry.countryData;
    },
    getAvailableCountries(state) {
      return state.availableCountries;
    },
    getSelectedCountryConfirmedCases(state) {
      return state.selectedCountry.confirmedCaseData;
    },
    getSelectedCountryRecovedCases(state) {
      return state.selectedCountry.recoveredCaseData;
    },
    getSelectedCountryDeathCases(state) {
      return state.selectedCountry.deathCaseData;
    }
  },
  modules: {}
});
