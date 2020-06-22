<template>
  <div>
    <navbar></navbar>
    <h1>Ini halaman {{msg}}</h1>
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
      msg: "Home"
    };
  }
};
</script>