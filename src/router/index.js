import { createRouter, createWebHistory } from 'vue-router';

import landingpage from '../components/main/landingpage.vue';
import produk from '../components/theme/produk.vue';
import akun from '../components/theme/akun.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
