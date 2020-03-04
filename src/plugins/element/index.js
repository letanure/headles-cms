import Vue from 'vue'
import { Loading } from 'element-ui'
import './sass-variables.scss'

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
