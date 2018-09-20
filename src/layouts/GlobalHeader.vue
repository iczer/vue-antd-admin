<template>
  <a-layout-header :class="[theme, 'global-header']">
    <div :class="['global-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
        <img width="32" src="static/img/vue-antd-logo.png" />
        <h1 v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div v-if="layout === 'head'" class="global-header-menu">
        <i-menu style="height: 64px; line-height: 64px;" :theme="theme" mode="horizontal" :menuData="menuData" @select="onSelect"/>
      </div>
      <div :class="['global-header-right', theme]">
          <header-search class="header-item" />
          <a-tooltip class="header-item" title="帮助文档" placement="bottom" >
            <a>
              <a-icon type="question-circle-o" />
            </a>
          </a-tooltip>
          <header-notice class="header-item"/>
          <header-avatar class="header-item"/>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch'
import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderlAvatar'
import IMenu from '../components/menu/menu'

export default {
  name: 'GlobalHeader',
  components: {IMenu, HeaderAvatar, HeaderNotice, HeaderSearch},
  props: ['collapsed', 'menuData'],
  computed: {
    isMobile () {
      return this.$store.state.setting.isMobile
    },
    layout () {
      return this.$store.state.setting.layout
    },
    theme () {
      return this.layout === 'side' ? 'light' : this.$store.state.setting.theme
    },
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggleCollapse')
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover{
      color: #1890ff;
    }
  }
  .header-item{
    padding: 0 12px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
    i{
      font-size: 16px;
      color: rgba(0,0,0,.65);
    }
  }
  .global-header{
    padding: 0 12px 0 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    &.light{
      background: #fff;
    }
    &.dark{
      background: #001529;
    }
    .global-header-wide{
      &.head{
        max-width: 1400px;
        margin: auto;
      }
      &.side{
      }
      .logo {
        height: 64px;
        line-height: 58px;
        vertical-align: top;
        display: inline-block;
        padding: 0 12px 0 24px;
        cursor: pointer;
        font-size: 20px;
        &.pc{
          padding: 0 12px 0 0;
        }
        img {
          display: inline-block;
          vertical-align: middle;
        }
        h1{
          display: inline-block;
          font-size: 16px;
        }
        &.dark h1{
          color: #fff;
        }
      }
      .global-header-menu{
        display: inline-block;
      }
      .global-header-right{
        float: right;
        &.dark{
          color: #fff;
          i{
            color: #fff;
          }
        }
      }
    }
  }
</style>
