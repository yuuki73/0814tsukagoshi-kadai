import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import FavoriteList from '../views/FavoriteList.vue'
import SearchView from '@/views/SearchView.vue' 
import LoginView from "../views/LoginView.vue"  

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  //今回は不要
    {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
  // 購入ページのルートを追加
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView
  },

    {
    path: '/favorites',             
    name: 'favorites',
    component: FavoriteList
  },

  {
    path: '/search',          
    name: 'search',
    component: SearchView
  },

  {
    path: "/login",   
    name: "Login",
    component: LoginView
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router