const state = () => ({
  navigationBlocked: false,
})

const mutations = {
  NAVIGATION_BLOCKED(state) {
    state.navigationBlocked = true
  },
  NAVIGATION_ALlOWED(state) {
    state.navigationBlocked = false
  },
}

const actions = {
  blockNavigation({ commit }, hasChanges) {
    if (hasChanges) {
      commit('NAVIGATION_BLOCKED')
    } else {
      commit('NAVIGATION_ALlOWED')
    }
  },
  allowNavigation({ commit }) {
    commit('NAVIGATION_ALlOWED')
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
