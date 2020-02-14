import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== `production`,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
})
