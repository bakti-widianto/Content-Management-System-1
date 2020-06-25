<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
          <!-- To LOGIN -->
          <div class="card-body" v-if="toLogin">
            <h4 class="card-title text-center">
              <strong>Sign in</strong>
            </h4>
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">Email address</label>
                <input
                  type="email"
                  id="inputEmail"
                  v-model="email"
                  class="form-control"
                  placeholder="Email address"
                  required
                />
              </div>

              <hr />

              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                @click="handleLogin"
                type="submit"
              >Login</button>

              <a
                class="d-block text-center mt-2 small"
                @click.prevent="toLogin = !toLogin "
                href
              >Register</a>
              <hr class="my-4" />
            </form>
          </div>

          <!-- to register start -->
          <div class="card-body" v-if="!toLogin">
            <h4 class="card-title text-center">
              <strong>Register</strong>
            </h4>
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">Email address</label>
                <input
                  type="email"
                  id="inputEmail"
                  v-model="email"
                  class="form-control"
                  placeholder="Email address"
                  required
                />
              </div>

              <hr />

              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input
                  type="password"
                  id="inputPassword"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <div class="form-label-group">
                <label for="inputConfirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="inputConfirmPassword"
                  v-model="retypepassword"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                @click="handleRegister"
                type="submit"
              >Register</button>
              <a
                class="d-block text-center mt-2 small"
                @click.prevent="toLogin = !toLogin "
                href
              >Sign in</a>
              <hr class="my-4" />
            </form>
          </div>
          <!-- to Login  end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      retypepassword: "",
      token: null,
      toLogin: true
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      axios
        .post("http://localhost:3000/api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          if (response.data.message == "Login success!") {
            console.log(response.data.data.email);
            localStorage.setItem("Authorization", response.data.token);
            localStorage.setItem("email", response.data.data.email);
            this.$router.push("/home");
            this.$swal({
              icon: "success",
              title: "Login success",
              showConfirmButton: false,
              timer: 1200
            });
          } else if (response.data.message == "Email doesn't exist") {
            return alert("Email doesn't registered");
          } else {
            console.log("connection to api doesn't work");
          }
        })
        .catch(error => console.log(error));
    },
    handleRegister(e) {
      e.preventDefault();
      if (this.password === this.retypepassword) {
        axios
          .post("http://localhost:3000/api/users/register", {
            email: this.email,
            password: this.password,
            retypepassword: this.retypepassword
          })
          .then(response => {
            if (response.data.message == "Email already exist") {
              return alert(
                "this email has been registered, please try again with other email"
              );
            } else {
              console.log(response);
              if (response.data.message == "register success") {
                localStorage.setItem("Authorization", response.data.token);
                localStorage.setItem("email", response.data.data.email);
                this.$router.push("/home");
                this.$swal({
                  icon: "success",
                  title: "You've been registered",
                  text: "welcome to admin page!",
                  showConfirmButton: false,
                  timer: 1200
                });
              } else {
                console.log("something wrong please try again later");
              }
            }
          })
          .catch(error => console.log(error));
      } else {
        return alert(`password doesn't try again`);
      }
    }
  }
};
</script>

<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-img-left {
  width: 45%;
  /* Link to your background image using in the property below! */
  background: scroll center
    url("https://source.unsplash.com/WEQbe2jBg40/414x512");
  background-size: cover;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}
</style>