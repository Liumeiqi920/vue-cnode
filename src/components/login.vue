<template>
  <div class="login">
    <input v-model="token" type="text">
    <button class="submit-button" @click="submit">确定</button>
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
        this.$store.dispatch('setUserInfo', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .login {
    height: 600px;
  }
</style>
