import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router/index'
import VueCookie from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(VueCookie)



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

