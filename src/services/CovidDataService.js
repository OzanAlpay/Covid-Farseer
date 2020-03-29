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
    return apiClient.get("/summary");
  },
  async getDataByCountrySlug(slug) {
    const confirmedCases = await apiClient.get(
      "/total/dayone/country/" + slug + "/status/confirmed"
    );
    const recoveredCases = await apiClient.get(
      "/total/dayone/country/" + slug + "/status/recovered"
    );
    const deathCases = await apiClient.get(
      "/total/dayone/country/" + slug + "/status/deaths"
    );
    //Remove only confirmed data.
    let smallestArrLen = 0;
    if (recoveredCases.data.length > deathCases.data.length) {
      smallestArrLen = deathCases.data.length;
      confirmedCases.data = confirmedCases.data.slice(-smallestArrLen);
      recoveredCases.data = recoveredCases.data.slice(-smallestArrLen);
    } else {
      smallestArrLen = recoveredCases.data.length;
      confirmedCases.data = confirmedCases.data.slice(-smallestArrLen);
      deathCases.data = deathCases.data.slice(-smallestArrLen);
    }

    const receivedData = {
      confirmed: confirmedCases,
      recovered: recoveredCases,
      deathCases: deathCases
    };
    return receivedData;
  }
};
