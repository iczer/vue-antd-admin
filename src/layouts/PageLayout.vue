<template>
  <div class="page-layout">
    <page-header :i18n="routesI18n" :breadcrumb="breadcrumb" :title="pageTitle" :logo="logo" :avatar="avatar">
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{desc}}</p>
        <div v-if="this.linkList" class="link">
          <template  v-for="(link, index) in linkList">
            <a :key="index" :href="link.href"><a-icon :type="link.icon" />{{link.title}}</a>
          </template>
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div ref="page" :class="['page-content', layout]" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
import {mapState} from 'vuex'
export default {
  name: 'PageLayout',
  components: {PageHeader},
  props: ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage'],
  data () {
    return {
      page: {}
    }
  },
  watch: {
    $route() {
      this.page = this.$route.meta.page
    }
  },
  created() {
    let i18n = this.routesI18n
    Object.keys(i18n).forEach(key => {
      this.$i18n.mergeLocaleMessage(key, i18n[key])
    })
    this.page = this.$route.meta.page
  },
  computed: {
    ...mapState('setting', ['layout', 'routesI18n']),
    pageTitle() {
      let pageTitle = this.page && this.page.title
      return this.title || this.$t(pageTitle) || this.routeName
    },
    routeName() {
      return this.$t(this.$route.path.substring(1).replace(new RegExp('/', 'g'), '.') + '.name')
    },
    breadcrumb() {
      let page = this.page
      let breadcrumb = page && page.breadcrumb
      if (breadcrumb) {
        let i18nBreadcrumb = []
        breadcrumb.forEach(item => {
          i18nBreadcrumb.push(this.$t(item))
        })
        return i18nBreadcrumb
      } else {
        return this.getRouteBreadcrumb()
      }
    }
  },
  methods: {
    getRouteBreadcrumb() {
      let routes = this.$route.matched
      let breadcrumb = []
      routes.forEach(route => {
        let path = route.path
        let key = path.length == 0 ? '/home' : path
        breadcrumb.push(this.$t(key.substring(1).replace(new RegExp('/', 'g'), '.') + '.name'))
      })
      return breadcrumb
    }
  }
}
</script>

<style lang="less">
  .page-header{
    margin: -24px -24px 0;
  }
  .link{
    /*margin-top: 16px;*/
    line-height: 24px;
    a{
      font-size: 14px;
      margin-right: 32px;
      i{
        font-size: 22px;
        margin-right: 8px;
      }
    }
  }
  .page-content{
    position: relative;
    padding: 24px 0 0;
    &.side{
    }
    &.head{
      margin: 0 auto;
      max-width: 1400px;
    }
  }
</style>
