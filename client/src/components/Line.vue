<template>
  <div class="index">
    <div class="container d-flex w-70 h-100 p-3 mt-5 mb-5 flex-column">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col offset-1 judul-client">
              <i class="far fa-bookmark"></i> Line Chart
            </div>
            <div class="col offset-6 back-home">
              <router-link to="/datedata">
                <i class="fas fa-table"></i>
              </router-link>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div id="chart-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { lineChart } from "../chart";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$axios
      .get("http://54.255.12.97:3000/api/datadate/")
      .then(response => {
        lineChart(response.data);
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
.judul-client {
  font-family: Viga;
  font-size: 28px;
}
.back-home {
  font-size: 35px;
}
</style>