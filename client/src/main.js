import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCft3E7rwTLXS6YRtktlsRi-gKG-0-B-zY'
  }
})

Vue.use(VueSweetalert2);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
