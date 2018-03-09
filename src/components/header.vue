<template>
  <header class="header">
    <ul class="nav">
      <router-link :to="{name:'home'}" tag="li" class="link"><i class="iconfont icon-home"></i></router-link>
      <router-link :to="{name:'home'}" tag="li" class="link"><i class="iconfont icon-comments"></i></router-link>
      <router-link :to="{name:'home'}" tag="li" class="link"><i class="iconfont icon-bianji"></i></router-link>
      <router-link :to="{name:'home'}" tag="li" class="link"><i class="iconfont icon-account"></i></router-link>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'cHeader'
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
        color: #fff;
        &:hover {
          color: azure;
        }
        .iconfont {
          font-size: 25px;
        }
      }
    }
  }
</style>
