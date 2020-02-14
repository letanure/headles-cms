import Vue from 'vue'
import './plugins/element'
import './registerServiceWorker'
import { auth } from '@/firebase/auth'
import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'App',
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

auth.onAuthStateChanged((user) => {
  store.dispatch('user/fetch', user)
})
