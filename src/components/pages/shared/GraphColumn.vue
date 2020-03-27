<template>
  <div>
    <i-row class="chartRow">
      <i-column xs="10" offset-xs="1">
        <CovidLineChart
          class="chartContainer"
          :chartData="parseDataForChart"
          :options="chartOptions"
        ></CovidLineChart>
      </i-column>
    </i-row>
    <!-- <div>{{ getSelectedCountry }}</div> -->
    <!--
      <div class="main-graph">
        <TrendChart
          :datasets="[
            {
              data: getSelectedCountryConfirmedCases.map(day => day.Cases),
              smooth: true,
              fill: true
            }
          ]"
          :labels="{
            xLabels: getSelectedCountryConfirmedCases.map((day, index) => index)
          }"
        ></TrendChart>
        -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CovidLineChart from "../../charts/CovidLineChart.vue";
export default {
  name: "GraphColumn",
  components: {
    CovidLineChart
  },
  computed: {
    ...mapGetters([
      "getSelectedCountry",
      "getSelectedCountryConfirmedCases",
      "getSelectedCountryRecovedCases",
      "getSelectedCountryDeathCases"
    ]),
    getConfirmedCaseData() {
      return this.getSelectedCountryConfirmedCases.map(day => day.Cases);
    },
    getRecoveredCaseData() {
      return this.getSelectedCountryRecovedCases.map(day => day.Cases);
    },
    getDeathCaseData() {
      console.log("!!!!");
      console.log(this.getSelectedCountryDeathCases);
      console.log("!!!!");
      return this.getSelectedCountryDeathCases.map(day => day.Cases);
    },
    getNumberOfDays() {
      return [...Array(this.getSelectedCountryConfirmedCases.length).keys()];
    },
    parseDataForChart() {
      return {
        labels: this.getNumberOfDays,
        datasets: [
          {
            label: "Number of Confirmed Cases",
            data: this.getConfirmedCaseData,
            borderColor: "#3e95cd",
            fill: false,
            borderWidth: 1,
            pointBorderWidth: 2,
            pointHitRadius: 3
          },
          {
            label: "Number of Recovered Cases",
            data: this.getRecoveredCaseData,
            borderColor: "#60ff88",
            fill: false,
            borderWidth: 1,
            pointBorderWidth: 2,
            pointHitRadius: 3
          },
          {
            label: "Number of deaths",
            data: this.getDeathCaseData,
            borderColor: "#ff2020",
            fill: false,
            borderWidth: 1,
            pointBorderWidth: 2,
            pointHitRadius: 3
          }
        ]
      };
    },
    chartOptions() {
      return {
        maintainAspectRatio: false,
        aspectRatio: 400
      };
    }
  }
};
</script>
<style scoped>
.chartContainer {
  max-height: 40em !important;
}
.chartRow {
  min-height: 40em !important;
}
</style>
