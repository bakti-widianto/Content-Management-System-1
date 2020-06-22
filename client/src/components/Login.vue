<template>
  <div class="container">
    <div class="cover-container d-flex w-100 h-80 p-3 mt-5 flex-column">
        <header class="masthead mb-auto">
        </header>

        <main role="main" class="inner cover">
            <div class="card">
               <!-- card-header start -->
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <a class="bg-primary text-white btn-lg btn-block login text-center" href="">Login</a>
                        </div>
                        <div class="col">
                            <a class="btn btn-outline-primary btn-lg btn-block register text-center" href="">Register
                            </a>
                        </div>
                    </div>
                </div>
               <!-- card-header end -->


               <!-- card-body start -->
                <div class="card-body" id="login-form">
                    <div class="alert alert-danger" id="failedResponseLog" role="alert" style="display: none">
                    </div>
                    <form action="" id="submit-login">
                        <div class="form-label-group">
                            <input type="email" id="inputEmailLog" class="form-control" placeholder="Email address"
                                required autofocus>
                            <label for="inputEmailLog">Email address</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputPasswordLog" class="form-control" placeholder="Password"
                                required>
                            <label for="inputPasswordLog">Password</label>
                        </div>

                        <button type="submit" class="btn btn-info btn-login btn-block">Log In</button>
                    </form>
                </div>
                <div class="card-body" id="register-form" style="display: none">
                    <div class="alert alert-danger" id="failedResponseReg" role="alert" style="display: none">
                    </div>
                    <form action="" id="submit-register">
                        <div class="form-label-group">
                            <input type="email" id="inputEmailReg" class="form-control" placeholder="Email address"
                                required autofocus>
                            <label for="inputEmailReg">Email address</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputPasswordReg" class="form-control" placeholder="Password"
                                required>
                            <label for="inputPasswordReg">Password</label>
                        </div>

                        <div class="form-label-group">
                            <input type="password" id="inputPasswordConfirmationReg" class="form-control"
                                placeholder="Confirmation Password" required>
                            <label for="inputPasswordConfirmationReg">Confirm Password</label>
                        </div>
                        <button type="submit" class="btn btn-info btn-register btn-block">Register Now</button>
                    </form>
                </div>
            </div>
        </main>

        <footer class="mastfoot mt-auto">
        </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Login"
    };
  }
};
</script>