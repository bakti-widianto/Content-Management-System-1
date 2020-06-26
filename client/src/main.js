import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import axios from 'axios';

Vue.use(VueSweetalert2);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// assign prototype axios to each vue instance
Vue.prototype.$axios = axios;