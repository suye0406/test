import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Login')
    }, {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Login')
    },{
      path: '*',
      redirect: '/',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Login')
    }
  ]
})
