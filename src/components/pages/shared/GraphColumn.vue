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
import moment from "moment";
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
      "getSelectedCountryDeathCases",
      "getUserPredictions"
    ]),
    getConfirmedCaseData() {
      return [
        ...this.getSelectedCountryConfirmedCases.map(day => day.Cases),
        ...this.getUserPredictions.confirmedCaseData
      ];
    },
    getRecoveredCaseData() {
      return [
        ...this.getSelectedCountryRecovedCases.map(day => day.Cases),
        ...this.getUserPredictions.recoveredCaseData
      ];
    },
    getDeathCaseData() {
      return [
        ...this.getSelectedCountryDeathCases.map(day => day.Cases),
        ...this.getUserPredictions.deathCaseData
      ];
    },
    getTimeArrayForXAxis() {
      return [
        ...this.getSelectedCountryConfirmedCases.map(day => {
          return Vue.filter("formatDate")(day.Date);
        }),
        ...this.getUserPredictions.dates.map(day => {
          return Vue.filter("formatDate")(day);
        })
      ];
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
            borderWidth: 4,
            pointBorderWidth: 2,
            pointHitRadius: 3
          },
          {
            label: "Number of Recovered Cases",
            data: this.getRecoveredCaseData,
            borderColor: "#60ff88",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 2,
            pointHitRadius: 3
          },
          {
            label: "Number of deaths",
            data: this.getDeathCaseData,
            borderColor: "#ff2020",
            fill: false,
            borderWidth: 2,
            pointBorderWidth: 2,
            pointHitRadius: 3
          }
        ]
      };
    },
    chartOptions() {
      let today = moment().toISOString();
      if (this.getUserPredictions.isPredictionDone) {
        today = this.getSelectedCountryConfirmedCases.slice(-1)[0].Date;
      }
      today = Vue.filter("formatDate")(today);
      return {
        maintainAspectRatio: false,
        aspectRatio: 400,
        annotation: {
          drawTime: "afterDatasetsDraw",
          annotations: [
            {
              type: "line",
              id: "vline1",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: today,
              borderColor: "yellow",
              borderDash: [2, 2],
              borderWidth: 3,
              label: {
                enabled: true,
                position: "left",
                content: "Today"
              }
            }
          ]
        }
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
