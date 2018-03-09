<template>
  <div class="home">
    <ul class="tabs-list">
      <li v-for="(tab,index) in tabNameList" :key="index" class="tab" :class="{'active': index === currentTab}"
          @click="changeTab(index)">
        {{tab}}
      </li>
    </ul>
    <div class="main-container">
      <ul class="posts-list">
        <router-link tag="li" class="post-item" v-for="(topic,index) in topics" :key="index"
                     :to="{ path:`/topic/${topic.id}` }">
          <div class="author">
            <img :src="topic.author.avatar_url" class="avatar">
            <span class="name">{{topic.author.loginname}}</span>
          </div>
          <div class="content">
            <p class="title">{{topic.title}}</p>
            <span v-show="topic.top" class="top">置顶</span>
            <span class="reply-count">{{topic.reply_count}}回答</span>
            <span class="visit-count">{{topic.visit_count}}看过</span>
            <span class="time">{{getTimeStr(topic.last_reply_at)}}</span>
          </div>
        </router-link>
      </ul>
      <ul class="page-list">
        <li class="page" @click="changePageList(0)">&lt;</li>
        <li v-for="(page,index) in pageList" :key="index" class="page" :class="{'active': page === currentPage}"
            @click="changePage(page)">{{page}}
        </li>
        <li class="page" @click="changePageList(1)">&gt;</li>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from 'common/js/utils'

const baseUrl = 'https://cnodejs.org/api/v1'
export default {
  name: 'home',
  created () {
    this._loadTopics()
  },
  computed: {
    searchKey () {
      return {
        page: this.currentPage,
        tab: this.tabList[this.currentTab],
        limit: 10,
        mdrender: true
      }
    }
  },
  data () {
    return {
      topics: {},
      tabList: ['all', 'good', 'share', 'ask', 'job', 'dev'],
      tabNameList: ['全部', '精华', '分享', '问答', '招聘', '测试'],
      currentTab: 0,
      currentPage: 1,
      pageList: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    async _loadTopics () {
      this.$store.dispatch('startLoading')
      let res = await this.$http.get(baseUrl + '/topics', { params: this.searchKey })
      this.topics = res.data.data
      console.table(this.topics)
      this.$store.dispatch('stopLoading')
    },
    changeTab (number) {
      if (this.currentTab !== number) {
        this.currentTab = number
        this.currentPage = 1
        this._loadTopics()
      }
    },
    changePage (number) {
      if (this.currentPage !== number) {
        this.currentPage = number
        this._loadTopics()
      }
    },
    changePageList (b) {
      if (b === 1) {
        this.pageList = this.pageList.map(e => e + 5)
      } else if (b === 0) {
        this.pageList = this.pageList.map(e => e - 5 > 0 ? e - 5 : e)
      }
    },
    getTimeStr (str) {
      return utils.getTimeStr(str)
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    position: relative;
    min-height: 85%;
    .tabs-list {
      min-height: 50px;
      margin: 0;
      padding: 0;
      background: #fff;
      list-style: none;
      font-size: 0;
      .tab {
        display: inline-block;
        width: 90px;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        color: rgb(178, 192, 206);
        user-select: none;
        &:hover {
          color: rgb(24, 24, 24);
        }
        &.active {
          position: relative;
          color: rgb(24, 24, 24);
          &::after {
            content: '';
            position: absolute;
            width: 80%;
            height: 3px;
            left: 10%;
            bottom: 0;
            background: #000;
          }
        }
      }
    }
    .main-container {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      .posts-list {
        padding: 0;
        margin: 50px 0 30px 0;
        min-height: 600px;
        list-style: none;
        .post-item {
          display: flex;
          min-height: 100px;
          padding: 5px 10px;
          margin-bottom: 4px;
          border-radius: 3px;
          background: rgb(255, 255, 255);
          user-select: none;
          .author {
            display: flex;
            max-width: 150px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            flex: 0 1 30%;
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
          .content {
            flex: 1;
            margin-left: 20px;
            overflow: hidden;
            .title {
              margin: 15px 0;
            }
          }
        }
      }
      .page-list {
        margin: 0 0 50px 0;
        padding: 0;
        font-size: 0;
        list-style: none;
        .page {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-left: 1px solid rgb(178, 192, 206);
          background: #fff;
          text-align: center;
          line-height: 40px;
          color: #888;
          font-size: 14px;
          user-select: none;
          &:first-child {
            border-left: none;
          }
          &:hover {
            background: rgb(40, 170, 220);
            color: #fff;
          }
          &.active {
            background: rgb(40, 170, 220);
            color: #fff;
          }
        }
      }
    }
  }
</style>
