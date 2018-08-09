<template>
  <a-layout>
    <a-layout-sider width="256px" style="z-index: 10" collapsible v-model="collapsed" :trigger="null">
      <div class="logo">
        <a href="/">
          <img src="static/img/vue-antd-logo.png">
          <h1>Vue Ant Pro</h1>
        </a>
      </div>
      <i-menu :collapsed="collapsed" :menuData="menuData" />
    </a-layout-sider>
    <a-layout>
      <gloabl-header :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <gloabl-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import ALayout from 'vue-antd-ui/es/layout'
import GlobalHeader from './GlobalHeader'
import AIcon from 'vue-antd-ui/es/icon/icon'
import IMenu from '../menu/menu'
import GlobalFooter from './GlobalFooter'

const ALayoutSider = ALayout.Sider
const ALayoutHeader = ALayout.Header
const ALayoutContent = ALayout.Content
const ALayoutFooter = ALayout.Footer
const minHeight = window.innerHeight - 64 - 48

let menuData = []

export default {
  name: 'GlobalLayout',
  components: {
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
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  }
}
</script>

<style scoped>
  .logo{
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all .3s;
    transition: all .3s;
    background: #002140;
    overflow: hidden;
  }
  .logo h1{
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    font-weight: 600;
    display: inline-block;
  }
  .logo img{
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
