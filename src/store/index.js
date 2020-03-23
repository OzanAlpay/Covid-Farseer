import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCountry: ""
  },
  mutations: {
    SET_SELECTED_COUNTRY(state, country) {
      state.selectedCountry = country;
    }
  },
  actions: {
    setSelectedCountry({ commit }, country) {
      commit("SET_SELECTED_COUNTRY", country);
    }
  },
  getters: {
    getSelectedCountry(state) {
      return state.selectedCountry;
    }
  },
  modules: {}
});
