<template>
  <div>
    <i-row
      ><i-column
        ><h2>{{ getSelectedCountry.name }}</h2></i-column
      >
    </i-row>
    <i-row class="chartRow">
      <i-column xs="10" offset-xs="1">
        <CovidLineChart
          class="chartContainer"
          :chartData="parseDataForChart"
          :options="chartOptions"
        ></CovidLineChart>
      </i-column>
    </i-row>
  </div>
</template>

<script>
import Vue from "vue";
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
      return this.getSelectedCountryDeathCases.map(day => day.Cases);
    },
    getTimeArrayForXAxis() {
      return this.getSelectedCountryConfirmedCases.map(day => {
        return Vue.filter("formatDate")(day.Date);
      });
    },
    parseDataForChart() {
      return {
        labels: this.getTimeArrayForXAxis,
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
  max-height: 55em !important;
}
.chartRow {
  min-height: 40em !important;
}
</style>
