import { createRouter, createWebHistory } from 'vue-router';

import landingpage from '../components/main/landingpage.vue';
import produk from '../components/theme/blue-store/produk.vue';
import akun from '../components/theme/blue-store/akun.vue';
import orangeproduk from '../components/theme/orange-store/orangeproduk.vue';
import orangeakun from '../components/theme/orange-store/orangeakun.vue';

const routes = [
  {
    name: 'Landingpage',
    path: '/',
    component: landingpage,
  },
  {
    name: 'Produk',
    path: '/produk',
    component: produk,
  },
  {
    name: 'Akun',
    path: '/akun',
    component: akun,
  },
  {
    name: 'OrangeProduk',
    path: '/orangeproduk',
    component: orangeproduk,
  },
  {
    name: 'OrangeAkun',
    path: '/orangeakun',
    component: orangeakun,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
