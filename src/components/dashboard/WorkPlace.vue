<template>
  <page-layout>
    <div slot="desc" class="desc">
      <div class="avatar">
        <a-avatar size="large" shape="circle" :src="currUser.avatar" />
      </div>
      <div class="content">
        <div class="title">{{currUser.timefix}}，{{currUser.name}}，{{currUser.welcome}}</div>
        <div>{{currUser.position}}</div>
      </div>
    </div>
    <div slot="extra">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="项目数" content="56" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="团队内排名" content="8/24" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="项目访问" content="2,223"/>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row style="margin: 0 -12px">
        <a-col style="padding: 0 12px" :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card style="margin-bottom: 24px;" :bordered="false" title="进行中的项目" :body-style="{padding: 0}">
            <a slot="extra">全部项目</a>
            <a-card-grid :key="i" v-for="(item, i) in projects">
              <a-card :bordered="false" :body-style="{padding: 0}">
                <a-card-meta :description="item.desc">
                  <div slot="title" class="card-title">
                    <a-avatar size="small" :src="item.logo" />
                    <a>Alipay</a>
                  </div>
                </a-card-meta>
                <div class="project-item">
                  <a href="/#/">科学搬砖组</a>
                  <span class="datetime">9小时前</span>
                </div>
              </a-card>
            </a-card-grid>
          </a-card>
          <a-card title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="n" v-for="n in 6">
                <a-list-item-meta>
                  <a-avatar slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  <div slot="title">
                    曲丽丽 在 <a>高逼格设计天团</a> 新建项目 <a>六月迭代</a>
                  </div>
                  <div slot="description">9小时前</div>
                </a-list-item-meta>

              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
          <a-card title="XX指数" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div style="min-height: 400px;">
              <radar />
            </div>
          </a-card>
          <a-card title="团队" :bordered="false">
            <a-row>
              <a-col :span="12" v-for="n in 5" :key="n">
                <a class="member">
                  <a-avatar size="small" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  <span>程序员日常</span>
                </a>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import PageHeader from '../page/PageHeader'
import PageLayout from '../layout/PageLayout'
import AAvatar from 'vue-antd-ui/es/avatar/Avatar'
import HeadInfo from '../tool/HeadInfo'
import ARow from 'vue-antd-ui/es/grid/Row'
import ACol from 'vue-antd-ui/es/grid/Col'
import ACard from 'vue-antd-ui/es/card/Card'
import ACardGrid from 'vue-antd-ui/es/card/Grid'
import ACardMeta from 'vue-antd-ui/es/card/Meta'
import AList from 'vue-antd-ui/es/list/index'
import AListItem from 'vue-antd-ui/es/list/Item'
import AButton from 'vue-antd-ui/es/button/button'
import AIcon from 'vue-antd-ui/es/icon/icon'
import Radar from '../chart/Radar'

const AListItemMeta = AListItem.Meta

export default {
  name: 'WorkPlace',
  components: {
    Radar,
    AIcon,
    AButton,
    AListItemMeta,
    AListItem,
    AList,
    ACardMeta,
    ACardGrid,
    ACard,
    ACol,
    ARow,
    HeadInfo,
    AAvatar,
    PageLayout,
    PageHeader},
  data () {
    return {
      currUser: {},
      projects: []
    }
  },
  mounted () {
    this.currentUser()
    this.getProjectList()
  },
  methods: {
    currentUser () {
      this.$axios({
        method: 'get',
        url: '/user/current'
      }).then(res => {
        this.currUser = res.data
      })
    },
    getProjectList () {
      this.$axios({
        method: 'get',
        url: '/project'
      }).then(res => {
        this.projects = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .desc{
    display: flex;
    .avatar {
      flex: 0 1 72px;
      margin-bottom: 8px;
      & > span {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
      }
    }
    .content {
      position: relative;
      top: 4px;
      flex: 1 1 auto;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      .title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 12px;
      }
    }
  }
  .card-title {
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;
      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .item-group{
    padding: 20px 0 8px 24px;
    font-size: 0;
    a{
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }
  .member{
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
</style>
