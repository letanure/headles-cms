const state = () => ({
  loaded: false,
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
  SET_LOADED(state) {
    state.loaded = true
  },
}

const actions = {
  fetch({ commit }, user) {
    commit('SET_SIGNED_IN', user !== null)
    commit('SET_LOADED')
    if (user) {
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
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
  loaded: (state) => {
    return () => state.loaded
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
