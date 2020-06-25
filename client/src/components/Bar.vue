<template>
  <div>
    <h1>Ini halaman {{msg}}</h1>
    <div id="bar-chart"></div>
  </div>
</template>

<script>
import { barChart } from "../chart";

export default {
  data() {
    return {
      msg: "Bar-Chart"
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
        barChart(response.data);
      })
      .catch(err => console.log(err));
  }
};

</script>