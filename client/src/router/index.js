import Vue from 'vue';
import VueRouter from 'vue-router';

import Data from '../components/Data';
import DataEdit from '../components/DataEdit';

import DateData from '../components/DateData';
import Home from '../components/Home';
import Maps from '../components/Maps';
import Index from '../components/Index';
import CMap from '../components/CMap';
import Login from '../components/Login';
import Line from '../components/Line';
import Bar from '../components/Bar';
import Pie from '../components/Pie';

Vue.use(VueRouter);

const router = new VueRouter({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'Index',
         component: Index
      },
      {
         path: '/data',
         name: 'Data',
         component: Data,
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/data/edit/:id',
         name: 'Data Edit',
         component: DataEdit,
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/datedata',
         name: 'DateData',
         component: DateData,
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/home',
         name: 'Home',
         component: Home,
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/maps',
         name: 'Map',
         component: Maps,
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/line',
         name: 'Line',
         component: Line
      },
      {
         path: '/pie',
         name: 'Pie',
         component: Pie
      },
      {
         path: '/bar',
         name: 'Bar',
         component: Bar
      },
      {
         path: '/map',
         name: 'CMap',
         component: CMap
      },
      {
         path: '/login',
         name: 'Login',
         component: Login
      },
      {
         path: '/logout',
         name: 'Logout',
         redirect : '/'
      }
   ]
});

router.beforeEach((to, from, next) => {
   if(to.matched.some(record => record.meta.requiresAuth)){
      // check if user is authenticated
      if(localStorage.getItem('Authorization')){
         next();
      }else {
         router.push('/login')
      }
   } else {
      // allow page is not authenticated
      next();
   }

})


export default router;