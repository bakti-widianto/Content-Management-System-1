<template>
  <div>
    <navbar></navbar>
    <h1>Hello guys, salam itu kaya gini ... Assalamualaikum!</h1>
    <p>{{msg}}</p>
  </div> 
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: {
    navbar: Navbar
  },
  data() {
    return {
      msg: "Data"
    };
  }
};
</script>