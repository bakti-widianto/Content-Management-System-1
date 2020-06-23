<template>
  <div>
    <div class="cover-container d-flex p-3 mt-5 flex-column">
      <main role="main" class="inner cover">
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="card mt-5">
                <!-- card-header start -->
                <div class="card-header">
                  <div class="row">
                    <div class="col">
                      <a class="bg-primary text-white btn-lg btn-block login text-center" href>Login</a>
                    </div>
                    <div class="col">
                      <a
                        class="btn btn-outline-primary btn-lg btn-block register text-center"
                        href
                      >Register</a>
                    </div>
                  </div>
                </div>
                <!-- card-header end -->

                <!-- card-body start -->
                <div class="card-body" id="login-form">
                  <form>
                    <div class="form-group">
                      <label for>Email address</label>
                      <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for>Password</label>
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        id="password"
                        required
                      />
                    </div>

                    <div class="row">
                      <div class="col">
                        <button
                          type="submit"
                          @click="handleSubmit"
                          class="btn btn-primary btn-block"
                        >LOG IN</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      token : null
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      axios
        .post("http://localhost:3000/api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.data.message) {
            console.log(response.data.data.email)
            localStorage.setItem("Authorization", response.data.token);
            localStorage.setItem("email", response.data.data.email);
            this.$router.push('/home');
          } else {
            console.log("email or password wrong! try again")
          }
        })
        .post(error => console.log(error));
    }
  }
};
</script>

<style scoped>
</style>