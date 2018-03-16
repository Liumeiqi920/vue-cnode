<template>
  <div class="user-info">
    <div class="wrapper info">
      <img :src="userinfo.avatar_url" class="avatar">
      <span class="name">{{userinfo.loginname}}</span>
      <div class="github-information">
        <i class="iconfont icon-github"></i>
        <a :href="githubUrl" target="_blank">{{userinfo.githubUsername}}</a>
      </div>
      <div class="create-time">
        注册时间{{getTimeStr(userinfo.create_at)}}
      </div>
    </div>
    <ul class="wrapper recent-topics">
      <li class="header">最近发布的话题</li>
      <router-link tag="li" v-for="(topic,index) in userinfo.recent_topics" :key="index" class="topic-item"
                   :to="{ path:`/topic/${topic.id}` }">
        <router-link tag="div" :to="{path:`/user/${topic.author.loginname}`}" class="author" @click.stop>
          <img :src="topic.author.avatar_url" class="avatar">
          <span class="name">{{topic.author.loginname}}</span>
        </router-link>
        <div class="title">{{topic.title}}</div>
        <span class="time">{{getTimeStr(topic.last_reply_at)}}</span>
      </router-link>
    </ul>
    <div class="wrapper replies-topics">
      <li class="header">最近参与的话题</li>
      <router-link tag="li" v-for="(topic,index) in userinfo.recent_replies" :key="index" class="topic-item"
                   :to="{ path:`/topic/${topic.id}` }">
        <router-link tag="div" :to="{path:`/user/${topic.author.loginname}`}" class="author">
          <img :src="topic.author.avatar_url" class="avatar">
          <span class="name">{{topic.author.loginname}}</span>
        </router-link>
        <div class="title">{{topic.title}}</div>
        <span class="time">{{getTimeStr(topic.last_reply_at)}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import utils from 'common/js/utils'
import config from 'common/js/config'

export default {
  name: 'userInfo',
  props: {
    loginname: {
      type: String
    }
  },
  watch: {
    $route (data, oldData) {
      this._loadUserInfo()
    }
  },
  created () {
    this._loadUserInfo()
  },
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    githubUrl () {
      return `https://github.com/${this.userinfo.githubUsername}`
    }
  },
  methods: {
    async _loadUserInfo () {
      this.$store.dispatch('startLoading')
      let res = await this.$http.get(config.baseUrl + '/user/' + this.loginname)
      this.userinfo = res.data.data
      console.log(this.userinfo)
      this.$store.dispatch('stopLoading')
    },
    getTimeStr (str) {
      return utils.getTimeStr(str)
    }
  }
}
</script>

<style lang="less" scoped>
  .user-info {
    min-height: 700px;
    .wrapper {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      margin: 30px 0 20px 0;
      padding: 0;
      border-radius: 3px;
      background: #fff;
      list-style: none;
      &.info {
        box-sizing: border-box;
        padding: 40px;
        .avatar {
          width: 70px;
          border-radius: 50%;
        }
        .name {
          position: relative;
          top: -20px;
          left: 10px;
        }
        .github-information {
          display: block;
          padding: 10px 0;
          a {
            text-decoration: none;
          }
        }
        .create-time {
          margin-top: 5px;
          font-size: 14px;
        }
      }
      .header {
        width: 100%;
        padding: 15px 20px;
        box-sizing: border-box;
        background: #eee;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
      }
      .topic-item {
        display: flex;
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .author {
          display: flex;
          max-width: 150px;
          flex-direction: column;
          align-items: center;
          flex: 0 0 30%;
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
        .title {
          flex: 1;
          margin-top: 20px;
          overflow: hidden;
        }
        .time {
          margin-top: 2px;
          font-size: 14px;
        }
      }
    }
  }
</style>
