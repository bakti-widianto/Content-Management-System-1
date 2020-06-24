<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <!-- Table content start -->

      <div class="card mb-5 mr-auto ml-auto edit-card" style="width: 70rem;">
        <div class="card card-body">
          <h2>Edit Your Data</h2>
          <form>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="letter">Title</label>
                  <input type="text" v-model="title" class="form-control" placeholder="input title" />
                </div>
                <div class="col">
                  <label for="latitude">Latitude</label>
                  <input
                    type="text"
                    v-model="latitude"
                    placeholder="input latitude"
                    class="form-control"
                  />
                </div>

                <div class="col">
                  <label for="longitude">Longitude</label>
                  <input
                    type="text"
                    v-model="longitude"
                    placeholder="input longitude"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="form-group"></div>
            <button type="submit" class="btn btn-primary" @click="handleUpdate">
              <i class="fas fa-plus">update data</i>
            </button>
          </form>
        </div>
      </div>
      <!-- Table content end -->
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
      title: "",
      latitude: "",
      longitude: ""
    };
  },
  methods: {
    handleUpdate(e) {
      e.preventDefault();
      console.log(this.$route.params.id);
      axios({
        method: "put",
        url: "http://localhost:3000/api/maps/" + this.$route.params.id,
        data: {
          title: this.title,
          long: this.longitude,
          lat: this.latitude
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.success === true) {
            console.log("OK");
            this.$router.push("/maps");
          } else {
            console.log("Gak OK");
          }
        })
        .catch(err => console.log("error"));
    }
  },
  mounted() {
    axios({
      method: "get",
      url: "http://localhost:3000/api/maps/" + this.$route.params.id
    })
      .then(response => {
        console.log(response);
        this.title = response.data.data.title;
        this.longitude = response.data.data.long;
        this.latitude = response.data.data.lat;
      })
      .catch(err => console.log("API not available"));
  }
};
</script>

 <style >
.edit-card {
  margin-top: 15%;
}
</style>