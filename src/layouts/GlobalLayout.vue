<template>
  <a-layout :class="['global-layout', fixedSider ? 'fixed-sider' : '']">
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <sider-menu :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <drawer :open-drawer="showSetting" placement="right"  @change="onSettingDrawerChange">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'"/>
      </div>
      <setting />
    </drawer>
    <a-layout class="global-layout-main beauty-scroll">
      <global-header :style="headerStyle" :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      <a-layout-header v-if="fixedHeader"></a-layout-header>
      <a-layout-content class="global-layout-content">
        <div :style="`min-height: ${minHeight}px; position: relative`">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :link-list="footerLinks" :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import Drawer from '../components/tool/Drawer'
import SiderMenu from '../components/menu/SiderMenu'
import Setting from '../components/setting/Setting'
import {mapState} from 'vuex'

const minHeight = window.innerHeight - 64 - 24 - 122

let menuData = []

export default {
  name: 'GlobalLayout',
  components: {Setting, SiderMenu, Drawer, GlobalFooter, GlobalHeader},
  data () {
    return {
      minHeight: minHeight,
      collapsed: false,
      menuData: menuData,
      showSetting: false
    }
  },
  provide() {
    return{
      layoutMinHeight: minHeight,
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout', 'footerLinks', 'copyright', 'fixedHeader', 'fixedSider']),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout == 'side' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      let transition = this.fixedHeader ? 'transition: width 0.2s' : ''
      return `width: ${width}; position: ${position}; ${transition}`
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
    },
    onSettingDrawerChange (val) {
      this.showSetting = val
    },
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="less" scoped>
  .global-layout{
    &.fixed-sider{
      height: 100vh;
      .global-layout-main{
        overflow: scroll;
      }
    }
    .global-layout-main{
      .global-header{
        top: 0;
        right: 0;
      }
    }
    .global-layout-content{
      padding: 24px 24px 0;
      min-height: auto;
    }
    .setting{
      background-color: #1890ff;
      color: #fff;
      border-radius: 5px 0 0 5px;
      line-height: 40px;
      font-size: 22px;
      width: 40px;
      height: 40px;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    }
  }
</style>
