<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <!-- Add collapse start -->
      <div class="mt-3 mb-5 mr-auto ml-auto" style="width: 70rem;">
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
        <div class="collapse" id="collapseAdd">
          <div class="card card-body">
            <form>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label for="letter">Letter</label>
                    <input
                      type="text"
                      v-model="letter"
                      class="form-control"
                      placeholder="input the letter"
                      id="letter"
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
                  <button role="button" class="btn btn-success mr-1 btn-edit">
                    <i class="fas fa-pen-alt">update</i>
                  </button>
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
      msg: "Data",
      datas: null,
      add: false,
      letter: "",
      frequency: "",
      id: ""
    };
  },
  methods: {
    loadData() {
      axios
        .get("http://localhost:3000/api/data/")
        .then(response => {
          this.datas = response.data;
        })
        .catch(err => console.log(err));
    },
    handleAdd(e) {
      e.preventDefault();
      console.log("letter:", this.letter, "frequency", this.frequency);
      axios
        .post("http://localhost:3000/api/data/", {
          letter: this.letter,
          frequency: this.frequency
        })
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            this.loadData();
          } else {
            console.log("internal server error to Add");
          }
        })
        .catch(err => console.log(err));
    },
    handleDelete(event) {
      const id = event.currentTarget.id;
      axios
        .delete("http://localhost:3000/api/data/" + id)
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            this.loadData();
          } else {
            console.log("internal server error to delete");
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>