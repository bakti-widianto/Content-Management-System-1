<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand" >Content Management System</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item" id="homeMenu">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item" id="dataMenu">
            <router-link to="/data" class="nav-link">Data</router-link>
          </li>
          <li class="nav-item" id="dateMenu">
            <router-link to="/datedata" class="nav-link">Data Date</router-link>
          </li>
          <li class="nav-item" id="mapMenu">
            <router-link to="/maps" class="nav-link">Maps</router-link>
          </li>
        </ul>
        <router-link to="/logout"
          class="btn btn-outline-success my-2 my-sm-0 mr-5 text-success logout-btn"
          role="button"
        >Logout</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>