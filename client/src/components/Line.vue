<template>
  <div>
    <h1>Halaman Line</h1>
    <div id="chart-line"></div>
  </div>
</template>

<script>
import { lineChart } from "../chart";

export default {
  data() {
    return {};
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/datadate/")
      .then(response => {
        lineChart(response.data);
      })
      .catch(err => console.log(err));
  }
};
</script>