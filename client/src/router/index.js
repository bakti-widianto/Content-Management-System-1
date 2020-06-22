import Vue from 'vue';
import VueRouter from 'vue-router';

import Data from '../components/Data';
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

export default new VueRouter({
   routes: [
      {
         path: '/',
         name: 'Index',
         component: Index
      },
      {
         path: '/data',
         name: 'Data',
         component: Data
      },
      {
         path: '/datedata',
         name: 'DateData',
         component: DateData
      },
      {
         path: '/home',
         name: 'Home',
         component: Home
      },
      {
         path: '/maps',
         name: 'Map',
         component: Maps
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
         name: 'Map',
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
         redirect: '/'

      }
   ]
})