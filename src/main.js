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
router.beforeEach((to, from, next) => {
  // 处理左侧滚动不影响右边
  // $('html, body, #page').removeClass('scroll-hide');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.ifUserExist) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
