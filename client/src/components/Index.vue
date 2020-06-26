<template>
  <div class="index">
    <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
      <div class="container mt-5">
        <h5 class="card-header bg-info" style="color: white">
          <i class="far fa-bookmark"></i>
          <span style="color: white">Welcome to Dashboard</span>
        </h5>

        <div class="card flex-row">
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>

          <div class="card-body">
            <router-link
              to="/line"
              class="card-title btn btn-outline-danger btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-chart-line"></i>
              <br />Line
            </router-link>

            <router-link
              to="/pie"
              class="card-title btn btn-outline-warning btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-chart-pie"></i>
              <br />Pie
            </router-link>

            <router-link
              to="/bar"
              class="card-title btn btn-outline-primary btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-chart-bar"></i>
              <br />Bar
            </router-link>

            <router-link
              to="/map"
              class="card-title btn btn-outline-success btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-globe-americas"></i>
              <br />Map
            </router-link>

            <router-link
              to="/login"
              class="card-title btn btn-outline-info btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-users-cog"></i> Admin Panel
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
.body {
  font-family: Viga;
  font-size: 23px;
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card span {
  font-family: Viga;
  font-size: 23px;
}

.card {
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.card-header {
  font-family: Viga;
  border: solid 0.5px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-title {
  border: solid 0.5px;
  border-radius: 50px;
  box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-img-left {
  border-radius: 10px;
  width: 45%;
  background: scroll center
    url("https://source.unsplash.com/WLUHO9A_xik/1600x900");
  background-size: cover;
}
</style>