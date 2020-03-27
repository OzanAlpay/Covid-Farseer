<template>
  <div>
    Graph Will Be Displayed In Here!
    <div v-if="getSelectedCountry.name">
      <div>{{ getSelectedCountry.name }}</div>
      <div>{{ getSelectedCountryConfirmedCases.map(day => day.Cases) }}</div>
      <div>
        {{ getSelectedCountryConfirmedCases.map((day, index) => index) }}
      </div>
      <CovidLineChart :chartData="getConfirmedCaseData"></CovidLineChart>
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
    ...mapGetters(["getSelectedCountry", "getSelectedCountryConfirmedCases"]),
    getConfirmedCaseData() {
      console.log(this.getSelectedCountryConfirmedCases);
      if (this.getSelectedCountryConfirmedCases !== undefined) {
        console.log(
          this.getSelectedCountryConfirmedCases.map(day => day.Cases)
        );
        return this.getSelectedCountryConfirmedCases.map(day => day.Cases);
      }
      return 0;
    }
  }
};
</script>
<style scoped></style>
