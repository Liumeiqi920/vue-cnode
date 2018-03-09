<template>
  <div class="loading" v-show="loading">
    <i class="iconfont icon-load-c"></i>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  @import "../common/less/mixin.less";

  .loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(50, 50, 50, 0.6);
    z-index: 100;
    transition: 1s linear;
    .center();
    .iconfont {
      font-size: 45px;
      color: #000;
      .rotate();
    }
  }
</style>
