<template>
  <div>
    <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
      <main role="main" class="inner cover dashboard-main">
        <div class="card ">
          <h5 class="card-header bg-primary" style="color: white">
             <i class="far fa-bookmark">  Welcome to Dashboard</i>
          </h5>
          <div class="card-body">
            <router-link to="/line" class="card-title btn btn-outline-danger btn-lg btn-block"
              role="button"><i class="fas fa-chart-line"></i><br />Line</router-link>
            
            <router-link
              to="/pie"
              class="card-title btn btn-outline-warning btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-chart-pie"></i>
              <br />Pie
            </router-link>

            <router-link to="/bar" class="card-title btn btn-outline-primary btn-lg btn-block" role="button">
              <i class="fas fa-chart-bar"></i>
              <br />Bar
            </router-link>

            <router-link to="/map"
              class="card-title btn btn-outline-success btn-lg btn-block"
              role="button"
            >
              <i class="fas fa-globe-americas"></i>
              <br />Map
            </router-link>

            <router-link to="/login" class="card-title btn btn-outline-info btn-lg btn-block" role="button">
              <i class="fas fa-users-cog"></i> Admin Panel
            </router-link>
            
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>