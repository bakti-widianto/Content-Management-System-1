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
                  <label for="letter">Letter</label>
                  <input
                    type="date"
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
      letter: "",
      frequency: ""
    };
  },
  methods: {
    handleUpdate(e) {
      e.preventDefault();
      console.log(this.$route.params.id);
      this.$axios({
        method: "put",
        url: "http://localhost:3000/api/datadate/" + this.$route.params.id,
        data: {
          letter: this.letter,
          frequency: this.frequency
        }
      })
        .then(response => {
          if (response.data.success === true) {
            this.$router.push("/datedata")
            this.$swal({
              icon: "success",
              title: "Your data has been updated",
              showConfirmButton: false,
              timer: 1200
            });
            
          } else {
            console.log("Gak OK");
          }
        })
        .catch(err => console.log("Api rejected this put request"));
    }
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "http://localhost:3000/api/datadate/" + this.$route.params.id
    })
      .then(response => {
        console.log(response);
        this.letter = response.data.data.letter;
        this.frequency = response.data.data.frequency;
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