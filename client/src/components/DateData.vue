<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h1 class="text-center mt-2 judul-dashboard">Date Data Dashboard</h1>
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
            <p>
              <router-link to="/line">
                <div class="router-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
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
                    <label for="letter">Letter</label>
                    <input
                      type="date"
                      v-model="letter"
                      class="form-control"
                      placeholder="input the letter"
                      id="letter"
                      required
                    />
                  </div>
                  <div class="col">
                    <label for="frequency">Frequency</label>
                    <input
                      type="Number"
                      step="0.1"
                      v-model="frequency"
                      placeholder="input frequency"
                      class="form-control"
                      id="frequency"
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
                  <label for="letter">
                    <b>Letter</b>
                  </label>
                  <input
                    type="text"
                    v-model="searchLetter"
                    class="form-control"
                    placeholder="Search letter"
                    id="search-letter"
                  />
                </div>
                <div class="col">
                  <label for="frequency">
                    <b>Frequency</b>
                  </label>
                  <input
                    type="Number"
                    step="0.1"
                    v-model="searchFrequency"
                    placeholder="Search frequency"
                    class="form-control"
                    id="search-frequency"
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
                <th scope="col">Letter</th>
                <th scope="col">Frequency</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for=" (data, index) in datas" v-bind:key="data._id">
                <th>{{index + 1}}</th>
                <td>{{data.letter}}</td>
                <td>{{data.frequency}}</td>
                <td>
                  <router-link v-bind:to="`datadate/edit/`+data._id">
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
      letter: "",
      frequency: "",
      searchLetter: "",
      searchFrequency: "",
      id: ""
    };
  },
  watch: {
    searchLetter: function() {
      this.searchData();
    },
    searchFrequency: function() {
      this.searchData();
    }
  },
  methods: {
    loadData() {
      this.$axios
        .get("http://localhost:3000/api/datadate/")
        .then(response => {
          this.datas = response.data;
        })
        .catch(err => console.log(err));
    },
    handleAdd(e) {
      e.preventDefault();
      // console.log(typeof this.letter)
      this.$axios
        .post("http://localhost:3000/api/datadate/", {
          letter: this.letter,
          frequency: this.frequency
        })
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            this.letter = "";
            this.frequency = "";
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
            .delete("http://localhost:3000/api/datadate/" + id)
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
            title: "OK, Your data still there",
            showConfirmButton: false,
            timer: 1200
          });
        }
      });
    },
    searchData() {
      let body = {};
      if (this.searchFrequency && this.searchLetter) {
        body.letter = this.searchLetter;
        body.frequency = this.searchFrequency;
      } else if (this.searchFrequency) {
        body.frequency = this.searchFrequency;
      } else if (this.searchLetter) {
        body.letter = this.searchLetter;
      }
      this.$axios
        .post("http://localhost:3000/api/datadate/search", body)
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

<style>
.router-icon {
  font-size: 40px;
}
.judul-dashboard {
  font-family: Viga;
}
</style>