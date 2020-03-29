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
    },
    userPredictions: {
      confirmedCaseData: [],
      recoveredCaseData: [],
      deathCaseData: [],
      dates: [],
      isPredictionDone: false
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
      state.selectedCountry.deathCaseData = deadCaseData;
    },
    SET_USER_PREDICTIONS_CONFIRMED_CASES(state, confirmedCases) {
      state.userPredictions.confirmedCaseData = confirmedCases;
    },
    SET_USER_PREDICTIONS_RECOVERED_CASES(state, recoveredCases) {
      state.userPredictions.recoveredCaseData = recoveredCases;
    },
    SET_USER_PREDICTIONS_DEATH_CASES(state, deathCases) {
      state.userPredictions.deathCaseData = deathCases;
    },
    SET_PREDICTED_DATES_IN_ISO_FORMAT(state, dates) {
      state.userPredictions.dates = dates;
    },
    SET_PREDICTION_DONE(state) {
      state.userPredictions.isPredictionDone = true;
    },
    RESET_USER_PREDICTIONS(state) {
      state.userPredictions = {
        confirmedCaseData: [],
        recoveredCaseData: [],
        deathCaseData: [],
        dates: [],
        isPredictionDone: false
      };
    }
  },
  actions: {
    setUserPredictions({ commit }, data) {
      commit(
        "SET_USER_PREDICTIONS_CONFIRMED_CASES",
        data.predictions.map(prediction => prediction.confirmedCases)
      );
      commit(
        "SET_USER_PREDICTIONS_RECOVERED_CASES",
        data.predictions.map(prediction => prediction.recoveredCases)
      );
      commit(
        "SET_USER_PREDICTIONS_DEATH_CASES",
        data.predictions.map(prediction => prediction.deathCases)
      );
      commit(
        "SET_PREDICTED_DATES_IN_ISO_FORMAT",
        data.predictions.map(prediction => prediction.date)
      );
      commit("SET_PREDICTION_DONE");
    },
    setSelectedCountryBySlugName({ commit, getters }, slugName) {
      let country = getters.getAvailableCountries.filter(
        country => country.slug === slugName
      );
      if (country.length !== 1) {
        console.error("We have a problem Houston!");
        // TODO Fallback to default?
      }
      commit("RESET_USER_PREDICTIONS");
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
    },
    getLastDaysDetailsForSelectedCountry(state, getters) {
      console.log("Vuex Fired getLastDaysDetails For Selected Country !");
      const days = 3; // TODO pass it as a parameter later
      return {
        confirmedCases: getters.getSelectedCountryConfirmedCases.slice(-days),
        recoveredCases: getters.getSelectedCountryRecovedCases.slice(-days),
        deathCases: getters.getSelectedCountryDeathCases.slice(-days),
        len: days
      };
    },
    getUserPredictions(state) {
      return state.userPredictions;
    },
    isUserSelectedACountry(state) {
      const cData = state.selectedCountry.countryData;
      if (Object.keys(cData).length === 0 && cData.constructor === Object) {
        return false;
      }
      return true;
    }
  },
  modules: {}
});
