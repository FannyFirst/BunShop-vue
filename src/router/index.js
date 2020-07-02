import index from "../components/index"
import index_m from "../components/merchant/index"
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: index, name: "index"},
  {path: '/m', component: index_m, name: "merchant"}
]

export default new VueRouter({
  mode: "history",
  routes
})
