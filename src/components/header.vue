<template>
  <header class="header">
    <ul class="nav">
      <router-link :to="{name:'home'}" tag="li" class="link">
        <i class="iconfont icon-home"></i>
      </router-link>
      <router-link :to="{name:'home'}" tag="li" class="link">
        <i class="iconfont icon-comments"></i>
      </router-link>
      <router-link :to="{name:'home'}" tag="li" class="link">
        <i class="iconfont icon-bianji"></i>
      </router-link>
      <router-link v-if="JSON.stringify(user)==='{}'" :to="{name:'login'}" tag="li" class="link">
        <i class="iconfont icon-account"></i>
      </router-link>
      <router-link v-if="JSON.stringify(user)!=='{}'" :to="{path:`/user/${user.loginname}`}" tag="li"
                   class="link">
        <img :src="user.avatar_url" class="avatar">
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
