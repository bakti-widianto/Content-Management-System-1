<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h1 class="text-center mt-2">Maps Dashboard</h1>
      <hr />
      <!-- Add collapse start -->
      <div class="mt-3 mb-2 mr-auto ml-auto" style="width: 70rem;">
        <div class="row">
          <div class="col">
            <p>
              <!-- button collapse start -->
              <button
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseAdd"
                aria-expanded="false"
                aria-controls="collapseAdd"
              >add new data</button>
              <!-- button collapse end -->
            </p>
          </div>
          <div class="col offset-8">
            <p>
              <router-link to="/map">
                <button class="btn btn-primary" type="button">To Maps</button>
              </router-link>
            </p>
          </div>
        </div>
        <div class="collapse" id="collapseAdd">
          <div class="card card-body">
            <form>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="title">Title</label>
                    <input
                      type="text"
                      v-model="title"
                      class="form-control"
                      placeholder="input the title"
                      id="title"
                      required
                    />
                  </div>

                  <div class="col">
                    <label for="latitude">Latitude</label>
                    <input
                      type="text"
                      v-model="latitude"
                      placeholder="input latitude"
                      class="form-control"
                      id="latitude"
                      required
                    />
                  </div>

                  <div class="col">
                    <label for="longitude">Longitude</label>
                    <input
                      type="text"
                      v-model="longitude"
                      placeholder="input longitude"
                      class="form-control"
                      id="longitude"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group"></div>
              <button type="submit" class="btn btn-primary" @click="handleAdd">
                <i class="fas fa-plus"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- Add collapse end -->

      <!-- Form search start -->
      <div class="mt-2 mb-2 mr-auto ml-auto" style="width: 70rem;">
        <div class="card card-body">
          <form>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="title">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    v-model="searchTitle"
                    class="form-control"
                    placeholder="Search title"
                    id="search-title"
                  />
                </div>
              </div>
            </div>
            <div class="form-group"></div>
          </form>
        </div>
      </div>
      <!-- Form search end -->

      <!-- Table content start -->
      <div class="card mt-3 mb-5 mr-auto ml-auto" style="width: 70rem;">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for=" (data, index) in datas" v-bind:key="data._id">
                <th>{{index + 1}}</th>
                <td>{{data.title}}</td>
                <td>{{data.lat}}</td>
                <td>{{data.long}}</td>
                <td>
                  <router-link v-bind:to="`maps/edit/`+data._id">
                    <button
                      role="button"
                      v-bind:id="data._id"
                      class="btn btn-success mr-1 btn-edit"
                    >
                      <i class="fas fa-pen-alt">update</i>
                    </button>
                  </router-link>
                  <button
                    role="button"
                    v-bind:id="data._id"
                    v-on:click="handleDelete($event)"
                    class="btn btn-danger btn-delete"
                  >
                    <i class="fas fa-trash">delete</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
      datas: null,
      title: "",
      latitude: "",
      longitude: "",
      searchTitle: "",
      id: ""
    };
  },
  watch: {
    searchTitle: function() {
      this.searchData();
    }
  },
  methods: {
    loadData() {
      axios
        .get("http://localhost:3000/api/maps/")
        .then(response => {
          this.datas = response.data;
        })
        .catch(err => console.log(err));
    },
    handleAdd(e) {
      e.preventDefault();
      // console.log(typeof this.letter)
      console.log(this.title, this.latitude, this.longitude);
      axios
        .post("http://localhost:3000/api/maps/", {
          title: this.title,
          lat: this.latitude,
          long: this.longitude
        })
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            this.title = "";
            this.latitude = "";
            this.longitude = "";
            this.loadData();
            this.$swal({
              icon: "success",
              title: "Your data has been saved",
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            console.log("internal server error to Add");
          }
        })
        .catch(err => console.log(err));
    },
    handleDelete(event) {
      const id = event.currentTarget.id;
      this.$swal({
        title: "Are you sure?",
        text: "You can't revert this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes Delete it!",
        cancelButtonText: "No, Keep it!",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          axios
            .delete("http://localhost:3000/api/maps/" + id)
            .then(response => {
              console.log(response);
              if (response.data.success === true) {
                this.loadData();
              } else {
                console.log("internal server error to delete");
              }
            })
            .catch(err => console.log(err));

          this.$swal({
            icon: "success",
            title: "Data has been deleted",
            showConfirmButton: false,
            timer: 1200
          });
        } else {
          this.$swal({
            icon: "info",
            title: "Your data is still there",
            showConfirmButton: false,
            timer: 1200
          });
        }
      });
    },
    searchData() {
      let body = {};
      if (this.searchTitle) {
        body.title = this.searchTitle;
      }
      axios
        .post("http://localhost:3000/api/maps/search", body)
        .then(response => {
          console.log(response);
          this.datas = response.data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>