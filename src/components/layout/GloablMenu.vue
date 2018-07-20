<template>
  <a-menu theme="dark" mode="inline" :inlineCollapsed="collapsed">
    <slot></slot>
    <a-menu-item>
      <a-icon type="dashboard" />
      <span>统计分析</span>
    </a-menu-item>
    <a-menu-item>
      <a href="/">
        <a-icon type="user" />
        <span>个人中心</span>
      </a>
    </a-menu-item>
    <a-menu-item>
      <a-icon type="form" />
      <span>个人中心</span>
    </a-menu-item>
    <a-sub-menu>
          <span slot="title">
            <a-icon type="appstore" />
            <span>系统日志</span>
          </span>
      <a-menu-item>
        <span>应用日志</span>
      </a-menu-item>
      <a-menu-item>
        <span>数据库日志</span>
      </a-menu-item>
      <a-menu-item>
        <span>操作日志</span>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import AIcon from 'vue-antd-ui/es/icon/icon'
import AMenu from 'vue-antd-ui/es/menu/index'
const ASubMenu = AMenu.SubMenu
const AMenuItem = AMenu.Item

export default {
  name: 'GloablMenu',
  props: {
    collapsed: Boolean
  },
  components: {AIcon, AMenu, ASubMenu, AMenuItem},
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
