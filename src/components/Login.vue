<template>
<div class="animsition page-login-v3 layout-full" style="animation-duration: 800ms; opacity: 1;">
  <div
    class="page vertical-align text-center"
    data-animsition-in="fade-in"
    data-animsition-out="fade-out"
  >
    <div class="page-content vertical-align-middle">
      <div class="panel">
        <div class="panel-body">
          <div class="brand">
            <img
              class="brand-img"
              src="assets/images/logoImage.png"
              alt="..."
            />
          </div>
          <form v-on:submit.prevent="submitForm" method="post" action="#" autocomplete="off">
            <div
              class="form-group form-material floating"
              data-plugin="formMaterial"
            >
              <input type="email" v-model="email" class="form-control" />
              <label class="floating-label">Email</label>
            </div>
            <div
              class="form-group form-material floating"
              data-plugin="formMaterial"
            >
              <input type="password" v-model="password" name="password" class="form-control" />
              <label class="floating-label">Password</label>
            </div>
            <div class="form-group clearfix">
              <div
                class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left"
              >
                <input type="checkbox" id="inputCheckbox" name="remember" />
                <label for="inputCheckbox">Remember me</label>
              </div>
              <a class="float-right" href="forgot-password.html"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block btn-lg mt-40"
            >
              Sign in
            </button>
          </form>
          <p>
            Still no account? Please go to
            <a href="register-v3.html">Sign up</a>
          </p>
        </div>
      </div>
      <footer class="page-copyright page-copyright-inverse">
        <p>WEBSITE BY amazingSurge</p>
        <p>© 2017. All RIGHT RESERVED.</p>
        <div class="social">
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-twitter" aria-hidden="true"></i>
          </a>
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-facebook" aria-hidden="true"></i>
          </a>
          <a class="btn btn-icon btn-pure" href="javascript:void(0)">
            <i class="icon bd-google-plus" aria-hidden="true"></i>
          </a>
        </div>
      </footer>
    </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    submitForm() {
      if(this.email === null || this.password == null ) {
        Vue.$toast.open({
            message: 'Your username or password is missing',
            type: 'error',
        });
        return '';
      }
      let params = {"email": this.email, "password":  this.password};
      axios
        .post("https://api-test.stringeex.com/v1/account", params).then(response => {
            let checkLoginSuccess = response.data.login_false;
            if(checkLoginSuccess > 0) {
                Vue.$toast.open({
                    message: response.data.msg,
                    type: 'error',
                });
            } else {
              Vue.$toast.open({
                  message: 'Login Successfully',
                  type: 'success',
              });
              localStorage.setItem('user-token', response.data.account_auth_token) // store the token in localstorage
              this.$router.push({ name: "contactList" });
            }   
        })
        .catch(error => {
            Vue.$toast.open({
              message: error.message,
              type: 'warning',
            });
        });
    }
  }
};
</script>
