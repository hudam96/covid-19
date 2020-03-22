import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Statistics',
    component: ()=> import('../pages/Statistics/_index')
  },
]

const router = new VueRouter({
  routes,
  mode : "history"
})

export default router
