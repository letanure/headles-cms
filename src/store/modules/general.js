const state = () => ({
  hasFormChanged: false,
})

const mutations = {
  SET_FORM_UNSAVED(state) {
    state.hasFormChanged = true
  },
  SET_FORM_PRISTINE(state) {
    state.hasFormChanged = false
  },
}

const actions = {
  formChanged({ commit }, hasChanges) {
    if (hasChanges) {
      commit('SET_FORM_UNSAVED')
    } else {
      commit('SET_FORM_PRISTINE')
    }
  },
  clearFormChanged({ commit }) {
    commit('SET_FORM_PRISTINE')
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
