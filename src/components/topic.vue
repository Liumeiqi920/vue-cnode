<template>
  <div class="topic">
    <div class="topic-wrapper">
      <div class="title-wrapper">
        <h2 class="title">{{topic.title}}</h2>
      </div>
      <div class="markdown-body content" v-html="topic.content"></div>
    </div>
    <ul class="replies-wrapper">
      <li class="header">{{replies.length}}回复</li>
      <li class="reply" v-for="(reply,index) in replies" :key="index">
        <div class="author">
          <img :src="reply.author.avatar_url" class="avatar">
          <span class="name">{{reply.author.loginname}}</span>
        </div>
        <div class="markdown-body reply-content" v-html="reply.content"></div>
        <span class="index">{{index+1}}楼</span>
        <span class="good">
          <i v-show="!reply.isuped" class="iconfont icon-good"></i>
          <i v-show="reply.isuped" class="iconfont icon-good-filling"></i>
          {{reply.ups.length}}
        </span>
      </li>
    </ul>
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
  data () {
    return {
      topic: {},
      replies: []
    }
  },
  created () {
    this._loadTopic()
  },
  methods: {
    async _loadTopic () {
      this.$store.dispatch('startLoading')
      let res = await this.$http.get(config.baseUrl + '/topic/' + this.id, { params: { mdrender: true } })
      this.topic = res.data.data
      this.replies = this.topic.replies
      console.log(this.topic)
      this.$store.dispatch('stopLoading')
    },
    getTimeStr (str) {
      return utils.getTimeStr(str)
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
        .title {
          margin: 0;
          padding: 20px 40px;
          border-bottom: 1px solid #ccc;
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
          flex: 0 0 30%;
          .avatar {
            display: block;
            width: 60px;
            border-radius: 50%;
          }
          .name {
            margin-top: 5px;
            font-size: 13px;
          }
        }
        .reply-content{
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
</style>
