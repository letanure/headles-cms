import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import './plugins/element'

Vue.config.productionTip = false

new Vue({
  name: 'App',
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
