import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_USER_INFO = 'SET_USER_INFO'
const TOGGLE_LOADING = 'TOGGLE_LOADING'

export default new Vuex.Store({
  state: {
    userInfo: {},
    loading: true
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    getLoadingStatus (state) {
      return state.loading
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
      commit(SET_USER_INFO, userInfo)
    },
    startLoading ({ commit }) {
      commit(TOGGLE_LOADING, true)
    },
    stopLoading ({ commit }) {
      commit(TOGGLE_LOADING, false)
    }
  }
})
