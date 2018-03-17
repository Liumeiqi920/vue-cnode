<template>
  <div class="topic">
    <div v-if="topic.author" class="topic-wrapper">
      <div class="title-wrapper">
        <h2 class="title">{{topic.title}}</h2>
        <span class="create-time">{{getTimeStr(topic.create_at)}}</span>
        <router-link tag="span" :to="{path:`/user/${topic.author.loginname}`}" class="author">
          <img :src="topic.author.avatar_url" class="avatar">
          <span class="name">{{topic.author.loginname}}</span>
        </router-link>
        <span class="visit-count">{{topic.visit_count}}次浏览</span>
      </div>
      <div class="markdown-body content" v-html="topic.content"></div>
    </div>
    <ul v-if="topic.author" class="replies-wrapper">
      <li class="header">{{replies.length}}回复</li>
      <li class="reply" v-for="(reply,index) in replies" :key="index">
        <router-link tag="div" :to="{path:`/user/${reply.author.loginname}`}" class="author">
          <img :src="reply.author.avatar_url" class="avatar">
          <span class="name">{{reply.author.loginname}}</span>
        </router-link>
        <div class="markdown-body reply-content" v-html="reply.content"></div>
        <span class="index">{{index+1}}楼</span>
        <span class="good">
          <i v-show="!reply.is_uped" class="iconfont icon-good"></i>
          <i v-show="reply.is_uped" class="iconfont icon-good-filling"></i>
          {{reply.ups.length}}
        </span>
      </li>
    </ul>
    <div v-if="ifUserExist" class="editor-wrapper">
      <textarea class="textarea" v-model="inputText" placeholder="支持markdown格式"></textarea>
      <button class="submit-button" @click="submit">发送</button>
    </div>
  </div>
</template>

<script>
import utils from 'common/js/utils'
import config from 'common/js/config'

export default {
  name: 'topic',
  props: {
    id: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    ifUserExist () {
      return this.$store.getters.ifUserExist
    }
  },
  data () {
    return {
      topic: {},
      replies: [],
      inputText: ''
    }
  },
  watch: {
    $route (data, oldData) {
      this.topic = {}
      this.replies = []
      this._loadTopic()
    }
  },
  created () {
    this._loadTopic()
  },
  methods: {
    async _loadTopic () {
      this.$store.dispatch('startLoading')
      let params = { mdrender: true }
      if (this.ifUserExist) {
        params = { ...params, accesstoken: this.userInfo.token }
      }
      let res = await this.$http.get(config.baseUrl + '/topic/' + this.id, { params: params })
      this.topic = res.data.data
      console.log(this.topic)
      this.replies = this.topic.replies
      this.$store.dispatch('stopLoading')
    },
    getTimeStr (str) {
      return utils.getTimeStr(str)
    },
    async submit () {
      let params = { accesstoken: this.userInfo.token, content: this.inputText }
      let res = await this.$http.post(`${config.baseUrl}/topic/${this.id}/replies`, params)
      console.log(res)
      if (res.data.success) {
        console.log('success')
        this._loadTopic()
      } else {
        console.log('defeat')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .topic {
    min-height: 700px;
    .topic-wrapper {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      margin-top: 50px;
      border-radius: 3px;
      background: #fff;
      .title-wrapper {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        .title {
          margin: 0;
          padding: 20px 40px 10px 40px;
        }
        .create-time {
          margin: 0 20px 0 50px;
          font-size: 14px;
        }
        .author {
          .avatar {
            width: 25px;
          }
          .name {
            font-size: 14px;
          }
        }
        .visit-count {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      .content {
        width: 100%;
        padding: 20px 40px;
        box-sizing: border-box;
      }
    }
    .replies-wrapper {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      margin: 30px 0 20px 0;
      padding: 0;
      border-radius: 3px;
      background: #fff;
      list-style: none;
      .header {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        background: #eee;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
      }
      .reply {
        display: flex;
        position: relative;
        width: 100%;
        padding: 30px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .author {
          display: flex;
          max-width: 150px;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          flex: 0 0 25%;
          .avatar {
            display: block;
            width: 50px;
            border-radius: 50%;
          }
          .name {
            margin-top: 5px;
            font-size: 13px;
          }
        }
        .index {
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 14px;
        }
        .good {
          position: absolute;
          right: 20px;
          bottom: 25px;
          font-size: 14px;
        }
        .reply-content {
          flex: 1;
          padding-top: 10px;
          overflow: hidden;
        }
      }
    }
    .editor-wrapper {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      padding: 40px;
      margin-bottom: 50px;
      border-radius: 3px;
      background: #fff;
      box-sizing: border-box;
      .textarea {
        width: 100%;
        height: 150px;
        border: 1px solid #ccc;
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
