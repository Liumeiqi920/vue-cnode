<template>
  <div class="add-topic">
    <div class="wrapper">
      <span>选择板块:</span>
      <select class="tab-control" v-model="tab">
        <option v-for="(tab,index) in tabList" :key="index" :value="tab.tab">{{tab.name}}</option>
      </select>
      <input type="text" class="title" v-model="title" placeholder="标题字数10字以上">
      <textarea class="content" v-model="content" placeholder="支持markdown格式"></textarea>
      <button class="submit-button" @click="submit">发送</button>
    </div>
  </div>
</template>

<script>
import config from 'common/js/config'

export default {
  name: 'addTopic',
  data () {
    return {
      tab: 'dev',
      tabList: config.tabList,
      title: '',
      content: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  methods: {
    async submit () {
      let params = {
        accesstoken: this.userInfo.token,
        title: this.title,
        content: this.content,
        tab: this.tab
      }
      let res = await this.$http.post(`${config.baseUrl}/topics`, params)
      this.title = ''
      this.content = ''
      this.$router.push(`/topic/${res.data.topic_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .add-topic {
    min-height: 700px;
    .wrapper {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      padding: 40px;
      margin: 40px 0;
      border-radius: 3px;
      background: #fff;
      box-sizing: border-box;
      .tab-control {
        width: 80px;
        border-radius: 3px;
      }
      .title {
        display: block;
        width: 100%;
        height: 25px;
        margin: 10px 0;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .content {
        display: block;
        width: 100%;
        height: 400px;
        margin: 10px 0;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 25px;
      }
      .submit-button {
        width: 100%;
        height: 40px;
        margin-top: 25px;
        border: none;
        border-radius: 3px;
        color: #fff;
        background: #28aadc;
      }
    }
  }
</style>
