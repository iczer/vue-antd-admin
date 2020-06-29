<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img width="32" src="@/assets/img/logo.png" />
        <h1 v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div v-if="layout == 'head' && !isMobile" class="admin-header-menu">
        <i-menu style="height: 64px; line-height: 64px;" @i18nComplete="setRoutesI18n" :i18n="menuI18n" :theme="headerTheme" mode="horizontal" :options="menuData" @select="onSelect"/>
      </div>
      <div :class="['admin-header-right', headerTheme]">
          <header-search class="header-item" />
          <a-tooltip class="header-item" title="帮助文档" placement="bottom" >
            <a>
              <a-icon type="question-circle-o" />
            </a>
          </a-tooltip>
          <header-notice class="header-item"/>
          <header-avatar class="header-item"/>
          <a-dropdown class="lang header-item">
            <div>
              <a-icon type="global"/> {{langAlias}}
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
          </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch'
import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderlAvatar'
import IMenu from '@/components/menu/menu'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'AdminHeader',
  components: {IMenu, HeaderAvatar, HeaderNotice, HeaderSearch},
  props: ['collapsed', 'menuData'],
  inject: ['menuI18n'],
  data() {
    return {
      langList: [
        {key: 'CN', name: '简体中文', alias: '简体'},
        {key: 'HK', name: '繁體中文', alias: '繁體'},
        {key: 'US', name: 'English', alias: 'English'}
      ]
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'isMobile', 'layout', 'systemName', 'lang']),
    headerTheme () {
      return (this.layout == 'side' && !this.isMobile) ? 'light' : this.theme
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.alias
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggleCollapse')
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    ...mapMutations('setting', ['setLang', 'setRoutesI18n'])
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
  .admin-header{
    padding: 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    z-index: 1;
    position: relative;
    &.light{
      background: #fff;
    }
    &.dark{
      background: #001529;
      .trigger{
        color: white;
      }
    }
    .admin-header-wide{
      &.head{
        max-width: 1400px;
        margin: auto;
      }
      &.side{
        padding-right: 12px;
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
      .admin-header-menu{
        display: inline-block;
      }
      .admin-header-right{
        float: right;
        display: flex;
        &.dark{
          color: #fff;
          a, i{
            color: #fff !important;
          }
          .header-item:hover{
            background-color: @primary-color;
          }
        }
        .header-item{
          padding: 0 12px;
          cursor: pointer;
          align-self: center;
          &:hover{
            background-color: @gray-3;
          }
          i{
            font-size: 16px;
            color: rgba(0,0,0,.65);
          }
        }
      }
    }
  }
</style>
