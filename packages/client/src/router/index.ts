import { createRouter, createWebHistory } from 'vue-router';
import GuoguoAxios from '../views/guoguo-axios';
import TestWithCredentials from "../views/test-withCredentials";

const routes = [
  {
    path: '/',
    name: 'guoguo-axios',
    component: GuoguoAxios,
  },
  {
    path: '/test',
    name: 'test-withCredentials',
    component: TestWithCredentials,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
