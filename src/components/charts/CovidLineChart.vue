<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  name: "CovidLineChart",
  props: ["chartData", "options"],
  mounted() {
    console.log("Created!");
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options);
  },
  mixins: [reactiveProp]
};
</script>

<style></style>
