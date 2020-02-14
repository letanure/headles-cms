const state = () => ({
  user: {
    signedIn: false,
    data: null,
  },
})

const mutations = {
  SET_SIGNED_IN(state, value) {
    state.user.signedIn = value
  },
  SET_USER(state, data) {
    state.user.data = data
  },
}

const actions = {
  fetch({ commit }, user) {
    commit('SET_SIGNED_IN', user !== null)
    if (user) {
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email,
      })
    } else {
      commit('SET_USER', null)
    }
  },
}

const getters = {
  user(state) {
    return state.user
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
