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
                      type="text" v-model="letter"
                      class="form-control"
                      placeholder="input the letter"
                      id="letter"
                    />
                  </div>
                  <div class="col">
                    <label for="frequency">Frequency</label>
                    <input
                      type="Number"
                      step="0.1" v-model="frequency"
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
                  <a role="button" data-id="${data._id}" class="btn btn-success mr-1 btn-edit" href>
                    <i class="fas fa-pen-alt">update</i>
                  </a>
                  <a role="button" data-id="${data._id}" class="btn btn-danger btn-delete" href>
                    <i class="fas fa-trash">delete</i>
                  </a>
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
      frequency: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/data/")
      .then(response => {
        console.log(response);
        this.datas = response.data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    handleAdd(e) {
      e.preventDefault();
      console.log('letter:',this.letter,'frequency', this.frequency)
      axios
        .post("http://localhost:3000/api/data/",{
          letter : this.letter,
          frequency: this.frequency
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>