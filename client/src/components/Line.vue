<template>
  <div>
    <div class="container align-content-center justify-content-between" style="margin-top: 15vh; margin-bottom: 15vh;">
    <div class="card bg-transparent mx-2" id="card">
      <div class="card-header bg-dark text-white justify-content-between row">
        <div class="col-auto">
          <h3><i class="fa fa-line-chart mr-2" aria-hidden="true"></i>Line chart</h3>
        </div>
        <div class="col-auto">
          <a href="/" class="mx-2" style="color:whitesmoke;"><i class="fa fa-home fa-2x"></i></a>
          <a href="/data-date" class="mx-2" style="color:whitesmoke; display: none;"><i class="fa fa-table fa-2x"
              aria-hidden="true"></i></a>
        </div>
      </div>
      <div class="card-body">
        <div id="lineChart">
          <button @click="showAlert">Hello world</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  
  data() {
    return {
      msg: "Line"
    };
  },
  methods:{
     getRouteData (){
        console.log(this.$route)
     },
     showAlert() {
      // Use sweetalert2
      this.$swal('Hello Vue world!!!');
    }
  }
};
</script>