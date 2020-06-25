<template>
  <div>
    <navbar></navbar>
    <div class="container text-center mt-3">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1>Welcome {{user}}</h1>
          <p
            class="lead"
          >You enter admin page, if you need to manage existing data please manage in each section, Happy hacking!</p>
        </div>
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