import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: () =>import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () =>import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () =>import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () =>import('../views/Categories.vue')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {layout: 'main', auth: true},
    component: () =>import('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () =>import('../views/History.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {layout: 'main'},
    component: () =>import('../views/Home.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: () =>import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () =>import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () =>import('../views/Record.vue')
  },
  {
    path: '/main',
    name: 'MainLayout',
     meta: {layout: 'main'},
    // component: () =>import('../components/app/Sidebar1.vue')
    component: () =>import('../layouts/MainLayout.vue')
  },
  
   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
const currentUser = true
const requiereAuth = to.matched.some(record => record.meta.auth)
if(requiereAuth && !currentUser){
  next('/login?message=login')

}else{
  next()
}
})
 

export default router
