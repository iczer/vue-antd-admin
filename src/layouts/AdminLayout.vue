<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <drawer v-if="isMobile" v-model="drawerOpen">
      <side-menu :theme="theme.mode" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <side-menu :class="[fixedSideBar ? 'fixed-side' : '']" :theme="theme.mode" v-else-if="layout === 'side' || layout === 'mix'" :menuData="sideMenuData" :collapsed="collapsed" :collapsible="true" />
    <div v-if="fixedSideBar && !isMobile" :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`" class="virtual-side"></div>
    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'"/>
      </div>
      <setting />
    </drawer>
    <a-layout class="admin-layout-main beauty-scroll">
      <admin-header :style="headerStyle" :menuData="headMenuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      <a-layout-header v-if="fixedHeader"></a-layout-header>
      <a-layout-content class="admin-layout-content">
        <div :style="`min-height: ${minHeight}px; position: relative`">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <page-footer :link-list="footerLinks" :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from './header/AdminHeader'
import PageFooter from './footer/PageFooter'
import Drawer from '../components/tool/Drawer'
import SideMenu from '../components/menu/SideMenu'
import Setting from '../components/setting/Setting'
import {mapState, mapMutations, mapGetters} from 'vuex'

const minHeight = window.innerHeight - 64 - 24 - 122

export default {
  name: 'AdminLayout',
  components: {Setting, SideMenu, Drawer, PageFooter, AdminHeader},
  data () {
    return {
      minHeight: minHeight,
      collapsed: false,
      showSetting: false,
      drawerOpen: false
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
    isMobile(val) {
      if(!val) {
        this.drawerOpen = false
      }
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout', 'footerLinks', 'copyright', 'fixedHeader', 'fixedSideBar',
      'hideSetting']),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout !== 'head' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      let transition = this.fixedHeader ? 'transition: width 0.2s' : ''
      return `width: ${width}; position: ${position}; ${transition}`
    },
    headMenuData() {
      const {layout, menuData, firstMenu} = this
      return layout === 'mix' ? firstMenu : menuData
    },
    sideMenuData() {
      const {layout, menuData, subMenu} = this
      return layout === 'mix' ? subMenu : menuData
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const {firstMenu} = this
        for (let menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    }
  },
  created() {
    this.correctPageMinHeight(minHeight - 1)
    this.setActivated(this.$route)
  },
  beforeDestroy() {
    this.correctPageMinHeight(-minHeight + 1)
  }
}
</script>

<style lang="less" scoped>
  .admin-layout{
    .side-menu{
      &.fixed-side{
        position: fixed;
        height: 100vh;
        left: 0;
        top: 0;
      }
    }
    .virtual-side{
      transition: all 0.2s;
    }
    .admin-layout-main{
      .admin-header{
        top: 0;
        right: 0;
      }
    }
    .admin-layout-content{
      padding: 24px 24px 0;
      min-height: auto;
    }
    .setting{
      background-color: @primary-color;
      color: @base-bg-color;
      border-radius: 5px 0 0 5px;
      line-height: 40px;
      font-size: 22px;
      width: 40px;
      height: 40px;
      box-shadow: -2px 0 8px @shadow-color;
    }
  }
</style>
