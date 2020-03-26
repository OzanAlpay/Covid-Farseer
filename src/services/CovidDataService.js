import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.covid19api.com",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 5000
});

export default {
  getAvailableCountries() {
    console.log("getCountries Called!");
    return apiClient.get("/summary");
  },
  getDataByCountryName(countryName) {
    console.log("getDataByCountryName");
    const confimedCases = apiClient.get(
      "/countries/" + countryName + "/status/confirmed"
    );
    console.log(confimedCases);
    const recoveredCases = apiClient.get(
      "/countries/" + countryName + "/status/recovered"
    );
    console.log(recoveredCases);
  }
};
