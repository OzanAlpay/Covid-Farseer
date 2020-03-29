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
      "/country/" + slug + "/status/confirmed"
    );
    const recoveredCases = await apiClient.get(
      "/country/" + slug + "/status/recovered"
    );
    const deathCases = await apiClient.get(
      "/country/" + slug + "/status/deaths"
    );
    const receivedData = {
      confirmed: confirmedCases,
      recovered: recoveredCases,
      deathCases: deathCases
    };
    return receivedData;
  }
};
