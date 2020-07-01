<template>
  <a-layout-sider :theme="theme" :class="['side', isMobile ? null : 'shadow']" width="256px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <div :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <img src="@/assets/img/logo.png">
        <h1>{{systemName}}</h1>
      </router-link>
    </div>
    <i-menu @i18nComplete="setRoutesI18n" :i18n="menuI18n" :theme="theme" :collapsed="collapsed" :options="menuData" @select="onSelect" class="menu"/>
  </a-layout-sider>
</template>

<script>
import IMenu from './menu'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'SideMenu',
  components: {IMenu},
  inject: ['menuI18n'],
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
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'systemName'])
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    ...mapMutations('setting', ['setRoutesI18n'])
  }
}
</script>

<style lang="less" scoped>
  .shadow{
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
  }
  .side{
    z-index: 10;
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;
      background-color: @layout-trigger-background;
      &.light{
        background-color: #fff;
        h1{
          color: @primary-color;
        }
      }
      h1{
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        display: inline-block;
        vertical-align: middle;
      }
      img{
        width: 32px;
        vertical-align: middle;
      }
    }
  }
  .menu{
    padding: 16px 0;
  }
</style>
