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
    <i-table repsonsive hover bordered striped offset-xs="1">
      <thead>
        <tr>
          <th>Date</th>
          <th>Confirmed</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) of predictedData.predictions" :key="index">
          <td>{{ data.date | formatDate }}</td>
          <td>
            <i-input
              type="number"
              size="sm"
              @change="onPredictionChange()"
              v-model.number="data.confirmedCases"
            />
          </td>
          <td>
            <i-input
              type="number"
              size="sm"
              @change="onPredictionChange()"
              v-model.number="data.recoveredCases"
            />
          </td>
          <td>
            <i-input
              type="number"
              size="sm"
              @change="onPredictionChange()"
              v-model.number="data.deathCases"
            />
          </td>
        </tr>
      </tbody>
    </i-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "TimeDataTable",
  computed: {
    ...mapGetters(["getLastDaysDetailsForSelectedCountry"]),
    getLastDataReceivedDate() {
      const lastDayData = this.getLastDaysDetailsForSelectedCountry.confirmedCases.slice(
        -1
      );
      return lastDayData.Date;
    }
  },
  methods: {
    createArrayFromBulkData: function(data) {
      const arrayizedData = [];
      for (let index = 0; index < data.len; index++) {
        arrayizedData.push({
          date: data.confirmedCases[index].Date,
          confirmedCases: data.confirmedCases[index].Cases,
          recoveredCases: data.recoveredCases[index].Cases,
          deathCases: data.deathCases[index].Cases
        });
      }
      return arrayizedData;
    },
    onPredictionChange() {
      this.$store.dispatch("setUserPredictions", this.predictedData);
    }
  },
  data() {
    return {
      predictedData: {
        predictions: [
          {
            date: moment(this.getLastDataReceivedDate).toISOString(),
            confirmedCases: null,
            recoveredCases: null,
            deathCases: null
          },
          {
            date: moment(this.getLastDataReceivedDate)
              .add("1", "days")
              .toISOString(),
            confirmedCases: null,
            recoveredCases: null,
            deathCases: null
          },
          {
            date: moment(this.getLastDataReceivedDate)
              .add("2", "days")
              .toISOString(),
            confirmedCases: null,
            recoveredCases: null,
            deathCases: null
          }
        ]
      }
    };
  }
};
</script>

<style></style>
