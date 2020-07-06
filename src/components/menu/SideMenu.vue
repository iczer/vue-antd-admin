<template>
  <a-layout-sider :theme="sideTheme" :class="['side-menu', isMobile ? null : 'shadow']" width="256px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
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
    sideTheme() {
      return this.theme == 'light' ? this.theme : 'dark'
    },
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
@import "index";
</style>
