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
                      <button
                        class="bg-primary text-white btn-lg btn-block login text-center"
                        @click="handleLogin"
                      >Login</button>
                    </div>
                    <div class="col">
                      <button
                        @click="handleRegister"
                        class="btn btn-outline-primary btn-lg btn-block register text-center"
                      >Register</button>
                    </div>
                  </div>
                </div>
                <!-- card-header end -->

                <!-- card-body start -->

                <div class="card-body" id="login-form">
                  <!-- Login form start -->
                  <div v-if="login">
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
                  <!-- Login form start -->

                  <!-- register form start -->
                  <!-- <div v-if="register">
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

                      <div class="form-group">
                        <label for>Confirm Password</label>
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
                            @click="handleRegister"
                            class="btn btn-primary btn-block"
                          >REGISTER</button>
                        </div>
                      </div>
                    </form> -->
                    <!-- register form end -->
                  <!-- </div> -->
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
      token: null,
      register: false,
      login: true
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
            console.log(response.data.data.email);
            localStorage.setItem("Authorization", response.data.token);
            localStorage.setItem("email", response.data.data.email);
            this.$router.push("/home");
          } else {
            console.log("email or password wrong! try again");
          }
        })
        .post(error => console.log(error));
    }
  }
};
</script>

<style scoped>
</style>