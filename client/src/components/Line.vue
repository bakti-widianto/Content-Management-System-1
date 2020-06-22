<template>
  <div>
    <h1>Ini halaman {{msg}}</h1>
    <button v-on:click="getRouteData">get Data</button>
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
     }
  }
};
</script>