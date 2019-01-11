<template>
  <a-dropdown :trigger="['click']">
    <template slot="overlay">
      <a-spin :spinning="loadding">
        <a-tabs :tabBarStyle="{textAlign: 'center'}" :style="{backgroundColor: 'white', width: '297px'}">
          <a-tab-pane tab="通知" key="1" :style="{padding: '0 24px'}">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">
            暂无消息
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            暂无待办
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-badge count="12">
        <a-icon :class="['header-notice-icon', theme]" type="bell" />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false
    }
  },
  computed: {
    theme () {
      return this.$store.state.setting.layout === 'side' ? 'light' : this.$store.state.setting.theme
    }
  },
  methods: {
    fetchNotice () {
      if (this.loadding) {
        this.loadding = false
        return
      }
      this.loadding = true
      setTimeout(() => {
        this.loadding = false
      }, 2000)
    }
  }
}
</script>

<style lang="less">
  .header-notice{
    display: inline-block;
    transition: all 0.3s;
    span {
      vertical-align: initial;
    }
    .header-notice-icon{
      font-size: 16px;
      padding: 4px;
      &.dark{
        color: #fff;
      }
      &.light{
        color: rgba(0,0,0,.65);
      }
    }
  }
  .ant-dropdown-menu-container{
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
  }
</style>
