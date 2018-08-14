<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <sider-menu v-else :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <a-layout>
      <global-header :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import ALayout from 'ant-design-vue/es/layout'
import GlobalHeader from './GlobalHeader'
import AIcon from 'ant-design-vue/es/icon/icon'
import IMenu from '../menu/menu'
import GlobalFooter from './GlobalFooter'
import Drawer from '../tool/Drawer'
import SiderMenu from '../menu/SiderMenu'

const ALayoutSider = ALayout.Sider
const ALayoutHeader = ALayout.Header
const ALayoutContent = ALayout.Content
const ALayoutFooter = ALayout.Footer
const minHeight = window.innerHeight - 64 - 24 - 122

let menuData = []

export default {
  name: 'GlobalLayout',
  components: {
    SiderMenu,
    Drawer,
    GlobalFooter,
    AIcon,
    GlobalHeader,
    ALayout,
    ALayoutSider,
    ALayoutHeader,
    ALayoutContent,
    ALayoutFooter,
    IMenu},
  data () {
    return {
      minHeight: minHeight + 'px',
      collapsed: false,
      menuData: menuData
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.setting.isMobile
    }
  },
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onDrawerChange (show) {
      this.collapsed = show
    },
    onMenuSelect () {
      this.toggleCollapse()
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="less" scoped>
</style>
