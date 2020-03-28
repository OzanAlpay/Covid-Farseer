<template>
  <div>
    <i-row
      ><i-column xs="8" offset-xs="2"> <h3>Last 3 Days</h3></i-column></i-row
    >
    <i-table repsonsive hover bordered striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Confirmed</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) of createArrayFromBulkData(
            this.getLastDaysDetailsForSelectedCountry
          )"
          :key="index"
        >
          <td>{{ data.date | formatDate }}</td>
          <td>{{ data.confirmedCases }}</td>
          <td>{{ data.recoveredCases }}</td>
          <td>{{ data.deathCases }}</td>
        </tr>
      </tbody>
    </i-table>
    <i-row
      ><i-column xs="8" offset-xs="2">
        <h3>Your Predictions</h3></i-column
      ></i-row
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TimeDataTable",
  computed: { ...mapGetters(["getLastDaysDetailsForSelectedCountry"]) },
  methods: {
    createArrayFromBulkData: function(data) {
      const arrayizedData = [];
      for (let index = 0; index < data.len; index++) {
        console.log("Index === " + index);
        console.log(data[index]);
        arrayizedData.push({
          date: data.confirmedCases[index].Date,
          confirmedCases: data.confirmedCases[index].Cases,
          recoveredCases: data.recoveredCases[index].Cases,
          deathCases: data.deathCases[index].Cases
        });
      }
      return arrayizedData;
    }
  },
  data() {
    return {
      predictedData: {
        prediction: null
      }
    };
  }
};
</script>

<style></style>
