import { createRouter, createWebHistory } from 'vue-router';
import GuoguoAxios from '../views/guoguo-axios';
import TestWithCredentials from "../views/test-withCredentials";
import TestRetry from "../views/test-retry";
import TestJwt from "../views/test-jwt"


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
  },{
    path: '/retry',
    name: 'test-retry',
    component: TestRetry,
  },{
    path: '/jwt',
    name: 'test-jwt',
    component: TestJwt,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
