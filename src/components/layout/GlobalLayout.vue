<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <a-layout-sider class="sider" width="256px" :trigger="null">
        <div class="logo">
          <a href="/">
            <img src="static/img/vue-antd-logo.png">
            <h1>Vue Ant Pro</h1>
          </a>
        </div>
        <i-menu :collapsed="true" :menuData="menuData" @select="onMenuSelect"/>
      </a-layout-sider>
    </drawer>
    <a-layout-sider v-else class="sider" width="256px" collapsible v-model="collapsed" :trigger="null">
      <div class="logo">
        <a href="/">
          <img src="static/img/vue-antd-logo.png">
          <h1>Vue Ant Pro</h1>
        </a>
      </div>
      <i-menu :collapsed="collapsed" :menuData="menuData" />
    </a-layout-sider>
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

const ALayoutSider = ALayout.Sider
const ALayoutHeader = ALayout.Header
const ALayoutContent = ALayout.Content
const ALayoutFooter = ALayout.Footer
const minHeight = window.innerHeight - 64 - 24 - 122

let menuData = []

export default {
  name: 'GlobalLayout',
  components: {
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
      console.log(show)
      this.collapsed = show
    },
    onMenuSelect (obj) {
      this.toggleCollapse()
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style lang="less" scoped>
  .sider{
    z-index: 10;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      background: #002140;
      overflow: hidden;
      h1{
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
        font-weight: 600;
        display: inline-block;
      }
      img{
        width: 32px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
