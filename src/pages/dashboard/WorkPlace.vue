<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
      <div class="title">{{currUser.timefix}}，{{currUser.name}}，{{currUser.welcome}}</div>
      <div>{{currUser.position}}</div>
    </div>
    <div slot="extra">
      <a-row>
        <a-col :sm="7" :xs="24">
          <head-info title="项目数" content="56" :bordered="true"/>
        </a-col>
        <a-col :sm="9" :xs="24">
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
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" title="进行中的项目" :body-style="{padding: 0}">
            <a slot="extra">全部项目</a>
            <div>
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
            </div>
          </a-card>
          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title" v-html="item.template" />
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
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{item.name}}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import PageHeader from '../../components/page/PageHeader'
import PageLayout from '../../layouts/PageLayout'
import HeadInfo from '../../components/tool/HeadInfo'
import Radar from '../../components/chart/Radar'

export default {
  name: 'WorkPlace',
  components: {Radar, HeadInfo, PageLayout, PageHeader},
  data () {
    return {
      projects: [],
      loading: true,
      activities: [],
      teams: []
    }
  },
  computed: {
    currUser () {
      return this.$store.state.account.user
    }
  },
  mounted () {
    this.getProjectList()
    this.getActivites()
    this.getTeams()
  },
  methods: {
    getProjectList () {
      this.$axios({
        method: 'get',
        url: '/project'
      }).then(res => {
        this.projects = res.data
        this.loading = false
      })
    },
    getActivites () {
      this.$axios({
        method: 'get',
        url: '/work/activity'
      }).then(res => {
        this.activities = res.data
      })
    },
    getTeams () {
      this.$axios({
        method: 'get',
        url: '/work/team'
      }).then(res => {
        this.teams = res.data
      })
    }
  }
}
</script>

<style lang="less">
  .project-list {
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
      .ant-card-meta-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
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
  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0,0,0,.65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }
</style>
