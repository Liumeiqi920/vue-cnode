<template>
  <div class="login">
    <div class="container">
      <input class="input-area" v-model="token" type="text" placeholder="请输入token">
      <button class="submit-button" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
import config from 'common/js/config'

export default {
  name: 'login',
  data () {
    return {
      token: ''
    }
  },
  methods: {
    async submit () {
      try {
        const res = await this.$http.post(config.baseUrl + '/accesstoken', { accesstoken: this.token })
        this.$store.dispatch('setUserInfo', { ...res.data, token: this.token })
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../common/less/mixin.less";

  .login {
    height: 700px;
    .container {
      position: relative;
      margin: 60px 50px;
      width: 80%;
      height: 50px;
      .input-area {
        position: absolute;
        left: 50%;
        width: 500px;
        height: 40px;
        font-size: 20px;
        transform: translateX(-50%);
      }
      .submit-button {
        position: absolute;
        top: 70px;
        left: 50%;
        width: 100px;
        height: 35px;
        background: #28aadc;
        color: #fff;
        border: none;
        transform: translateX(-50%);
      }
    }
  }
</style>
