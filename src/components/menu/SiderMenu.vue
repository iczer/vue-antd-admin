<template>
  <a-layout-sider class="sider" width="256px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <div class="logo">
      <a href="/">
        <img src="static/img/vue-antd-logo.png">
        <h1>Vue Ant Pro</h1>
      </a>
    </div>
    <i-menu :collapsed="collapsed" :menuData="menuData" @select="onSelect"/>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import IMenu from './menu'
export default {
  name: 'SiderMenu',
  components: {IMenu, ALayoutSider},
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
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
