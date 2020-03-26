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
    return apiClient.get("/countries");
  }
};
