<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h1 class="text-center mt-2 judul-dashboard">Maps Dashboard</h1>
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
              >
                <i class="fas fa-plus"></i> add new
              </button>
              <!-- button collapse end -->
            </p>
          </div>
          <div class="col offset-8">
            <div class="router-icon">
              <router-link to="/map">
                <i class="fas fa-globe-americas"></i>
              </router-link>
            </div>
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
          <pagination
            v-bind:page="pagination.page"
            v-bind:pages="pagination.pages"
            v-bind:per-page="pagination.perPage"
            v-on:change-page="changePage"
          ></pagination>
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
              <tr v-for=" (data, index) in computedDatas" v-bind:key="data._id">
                <th>{{pagination.page == 1 ? index + 1 : (pagination.perPage * pagination.page - 10) + index + 1}}</th>
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
import Pagination from "./Pagination.vue";

export default {
  components: {
    navbar: Navbar,
    pagination: Pagination
  },
  data() {
    return {
      datas: null,
      title: "",
      latitude: "",
      longitude: "",
      searchTitle: "",
      id: "",
      pagination: {
        page: 1,
        pages: 1,
        perPage: 10
      }
    };
  },
  watch: {
    searchTitle: function() {
      this.searchData();
    }
  },
  computed: {
    computedDatas() {
      if (!this.datas) return [];
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;

        return this.datas.slice(firstIndex, lastIndex);
      }
    }
  },
  methods: {
    loadData() {
      this.$axios
        .get("http://localhost:3000/api/maps/")
        .then(response => {
          this.datas = response.data;
          this.pagination.pages = Math.ceil(
            response.data.length / this.pagination.perPage
          );
        })
        .catch(err => console.log(err));
    },
    handleAdd(e) {
      e.preventDefault();
      // console.log(typeof this.letter)
      console.log(this.title, this.latitude, this.longitude);
      this.$axios
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
          this.$axios
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
      this.$axios
        .post("http://localhost:3000/api/maps/search", body)
        .then(response => {
          console.log(response);
          this.datas = response.data;
        })
        .catch(err => console.log(err));
    },
    changePage(data) {
      this.pagination.page = data.page;
      this.pagination.pages = data.pages;
      this.pagination.perPage = data.perPage;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>