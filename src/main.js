import Vue from 'vue'
import App from './App.vue'
import Vant, {Toast} from 'vant';
import 'vant/lib/index.css';
import router from './router/index'
import VueCookie from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(VueCookie)

Vue.prototype.$self_toast = {
  showLoading() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
  },
  clearLoading() {
    Toast.clear()
  },
  showFail(error,msg) {
    console.error(error.message);
    Toast.fail(msg?msg:"请求超时！")
  }
}


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

