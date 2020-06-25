<template>
  <div>
    <h1>Ini halaman {{msg}}</h1>
    <div id="pie-chart"></div>
  </div>
</template>

<script>
import { pieChart } from "../chart";

export default {
  data() {
    return {
      msg: "Pie"
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/data/")
      .then(response => {
        console.log(response.data);
        // let arr = response.data.map(item => [item.letter, item.frequency]);
        // arr.unshift(["Subject", "frequency"])
        // console.log(arr);
        pieChart(response.data);
      })
      .catch(err => console.log(err));
  }
};
</script>