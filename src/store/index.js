import Vue from 'vue'
import Vuex from 'vuex'
import general from '@/store/modules/general'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== `production`,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    general,
    user,
  },
})
