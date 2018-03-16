import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_USER_INFO = 'SET_USER_INFO'
const TOGGLE_LOADING = 'TOGGLE_LOADING'

export default new Vuex.Store({
  state: {
    userInfo: {},
    loading: false
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getLoadingStatus (state) {
      return state.loading
    },
    ifUserExist (state) {
      return !(JSON.stringify(state.userInfo) === '{}')
    }
  },
  mutations: {
    [SET_USER_INFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [TOGGLE_LOADING] (state, boolean) {
      state.loading = boolean
    }
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      localStorage.setItem('user', JSON.stringify(userInfo))
      commit(SET_USER_INFO, userInfo)
    },
    removeUserInfo ({ commit }) {
      localStorage.removeItem('user')
      commit(SET_USER_INFO, {})
    },
    startLoading ({ commit }) {
      commit(TOGGLE_LOADING, true)
    },
    stopLoading ({ commit }) {
      commit(TOGGLE_LOADING, false)
    }
  }
})
