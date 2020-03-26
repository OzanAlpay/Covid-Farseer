<template>
  <div>
    Graph Will Be Displayed In Here!
    <div v-if="getSelectedCountry.name">
      <div>{{ getSelectedCountry.name }}</div>
      <div>{{ getSelectedCountryConfirmedCases.map(day => day.Cases) }}</div>
      <div>
        {{ getSelectedCountryConfirmedCases.map((day, index) => index) }}
      </div>
      <!-- <div>{{ getSelectedCountry }}</div> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GraphColumn",
  computed: {
    ...mapGetters(["getSelectedCountry", "getSelectedCountryConfirmedCases"]),
    getConfirmedCaseData() {
      console.log(this.getSelectedCountryConfirmedCases);
      if (this.getSelectedCountryConfirmedCases !== undefined) {
        console.log(
          this.getSelectedCountryConfirmedCases.map(day => day.Cases)
        );
        return 1;
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-graph {
  &-controls {
    @media (min-width: 699px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    select {
      margin-left: 10px;
      font-size: 14px;
      border: 1px solid rgba(#000, 0.2);
      background: transparent;
    }
  }
  &-control {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    @media (max-width: 698px) {
      justify-content: space-between;
    }
  }

  .vtc {
    height: 250px;
    font-size: 12px;
    .stroke {
      stroke: #39af77;
      stroke-width: 2;
    }
  }
}
