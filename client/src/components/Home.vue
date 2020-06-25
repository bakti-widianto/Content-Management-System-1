<template>
  <div>
    <navbar></navbar>
    <div class="container text-center mt-3">
      <div class="alert alert-secondary" role="alert">
        <h3>Welcome {{user}}</h3>
      </div>
      
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  components: {
    navbar: Navbar
  },
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.user = localStorage.getItem("email");
  }
};
</script>