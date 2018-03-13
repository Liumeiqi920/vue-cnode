<template>
  <div id="app">
    <c-header></c-header>
    <router-view class="container"></router-view>
    <c-footer></c-footer>
    <loading :loading="loading"></loading>
  </div>
</template>

<script>
import cHeader from 'components/header'
import cFooter from 'components/footer'
import loading from 'components/loading'

export default {
  name: 'App',
  computed: {
    loading () {
      return this.$store.getters.getLoadingStatus
    }
  },
  components: {
    cHeader,
    cFooter,
    loading
  }
}
</script>

<style lang="less">
  @import "./assets/font.less";
  html,body{
    height: 100%;
  }
  #app {
    width: 100%;
    background: rgb(220, 230, 235);
  }
</style>
