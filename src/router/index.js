import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/home'
import topic from 'components/topic'
import login from 'components/login'
import userInfo from 'components/userInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: topic,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user/:loginname',
      name: 'userInfo',
      component: userInfo,
      props: true
    }
    // ,
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ],
  // 设置跳转时滑动
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
