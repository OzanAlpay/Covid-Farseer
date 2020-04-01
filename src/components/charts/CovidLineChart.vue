<script>
import { Line, mixins } from "vue-chartjs";
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  name: "CovidLineChart",
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  mixins: [reactiveProp]
};
</script>

<style></style>
