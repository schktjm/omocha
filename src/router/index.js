import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pazzle15 from '../views/Pazzle15.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'pazzle',
    component: Pazzle15,
  },
  {
    path: '/hello',
    name: 'hello',
    component: Home,
  }
]

const router = new VueRouter({
  routes
})

export default router
