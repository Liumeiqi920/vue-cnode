<template>
  <header class="header">
    <ul class="nav">
      <router-link :to="{name:'home'}" tag="li" class="link">
        <i class="iconfont icon-home"></i>
      </router-link>
      <router-link :to="{name:'addTopic'}" tag="li" class="link">
        <i class="iconfont icon-bianji"></i>
      </router-link>
      <router-link v-if="!ifUserExist" :to="{name:'login'}" tag="li" class="link">
        <i class="iconfont icon-account"></i>
      </router-link>
      <router-link tag="li" v-if="ifUserExist" :to="{path:`/user/${user.loginname}`}"
                   @mouseover.native="toggleLogout(0)"
                   @mouseout.native="toggleLogout(1)" class="link avatar-container">
        <img :src="user.avatar_url" class="avatar">
        <ul v-show="showLogout" class="logout-wrapper">
          <li v-show="ifUserExist" @click.stop="logout">登出</li>
        </ul>
      </router-link>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'cHeader',
  computed: {
    user () {
      return this.$store.getters.getUserInfo
    },
    ifUserExist () {
      return this.$store.getters.ifUserExist
    }
  },
  data () {
    return {
      showLogout: false
    }
  },
  methods: {
    toggleLogout (flag) {
      this.showLogout = (flag !== 1)
    },
    logout () {
      this.$store.dispatch('removeUserInfo')
      this.showLogout = false
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    position: relative;
    height: 60px;
    width: 100%;
    background: rgb(40, 170, 220);
    .nav {
      height: 60px;
      margin: 0;
      padding: 0 10px;
      font-size: 0;
      .link {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 80px;
        text-align: center;
        line-height: 60px;
        font-size: 0;
        vertical-align: top;
        color: #fff;
        &:hover .iconfont {
          color: #000;
        }
        &.avatar-container .logout-wrapper {
          position: absolute;
          margin: 0;
          padding: 0;
          left: 0;
          top: 60px;
          width: 80px;
          border: 1px solid #ccc;
          background: #fff;
          font-size: 0;
          list-style: none;
          z-index: 1000;
          li {
            text-align: center;
            line-height: 40px;
            height: 40px;
            border-bottom: 1px solid #ccc;
            color: #000;
            font-size: 14px;
            user-select: none;
            &:last-child {
              border-bottom: none;
            }
          }
        }
        .iconfont {
          font-size: 25px;
        }
        .avatar {
          margin-top: 12px;
          display: inline-block;
          width: 35px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
