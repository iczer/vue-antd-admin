<template>
  <div class="page-layout">
    <page-header ref="pageHeader" :style="`margin-top: ${multiPage ? 0 : -24}px`" :breadcrumb="breadcrumb" :title="pageTitle" :logo="logo" :avatar="avatar">
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
    <div ref="page" :class="['page-content', layout, pageWidth]" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
import {mapState, mapMutations} from 'vuex'
import {getI18nKey} from '@/utils/routerUtil'

export default {
  name: 'PageLayout',
  components: {PageHeader},
  props: ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage'],
  data () {
    return {
      page: {},
      pageHeaderHeight: 0,
    }
  },
  watch: {
    $route() {
      this.page = this.$route.meta.page
    }
  },
  updated() {
    if (!this._inactive) {
      this.updatePageHeight()
    }
  },
  activated() {
    this.updatePageHeight()
  },
  deactivated() {
    this.updatePageHeight(0)
  },
  mounted() {
    this.updatePageHeight()
  },
  created() {
    this.page = this.$route.meta.page
  },
  beforeDestroy() {
    this.updatePageHeight(0)
  },
  computed: {
    ...mapState('setting', ['layout', 'multiPage', 'pageMinHeight', 'pageWidth', 'customTitles']),
    pageTitle() {
      let pageTitle = this.page && this.page.title
      return this.customTitle || (pageTitle && this.$t(pageTitle)) || this.title || this.routeName
    },
    routeName() {
      const route = this.$route
      return this.$t(getI18nKey(route.matched[route.matched.length - 1].path))
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
    },
    marginCorrect() {
      return this.multiPage ? 24 : 0
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight']),
    getRouteBreadcrumb() {
      let routes = this.$route.matched
      const path = this.$route.path
      let breadcrumb = []
      routes.filter(item => path.includes(item.path) || item.regex.test(path))
        .forEach(route => {
        const path = route.path.length === 0 ? '/home' : route.path
        breadcrumb.push(this.$t(getI18nKey(path)))
      })
      let pageTitle = this.page && this.page.title
      if (this.customTitle || pageTitle) {
        breadcrumb[breadcrumb.length - 1] = this.customTitle || pageTitle
      }
      return breadcrumb
    },
    /**
     * 用于计算页面内容最小高度
     * @param newHeight
     */
    updatePageHeight(newHeight = this.$refs.pageHeader.$el.offsetHeight + this.marginCorrect) {
      this.correctPageMinHeight(this.pageHeaderHeight - newHeight)
      this.pageHeaderHeight = newHeight
    }
  }
}
</script>

<style lang="less">
  .page-header{
    margin: 0 -24px 0;
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
    &.head.fixed{
      margin: 0 auto;
      max-width: 1400px;
    }
  }
</style>
