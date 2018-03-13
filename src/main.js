import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from './axios'
import 'normalize.css'
import 'github-markdown-css'

Vue.use(Axios)

Vue.config.productionTip = false

if (localStorage.getItem('user')) {
  store.dispatch('setUserInfo', JSON.parse(localStorage.getItem('user')))
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
