<template>
  <admin-layout>
    <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
    <tabs-head
        v-if="multiPage"
        :active="activePage"
        :page-list="pageList"
        @change="changePage"
        @close="remove"
        @refresh="refresh"
        @contextmenu="onContextmenu"
    />
    <div :class="['tabs-view-content', layout, pageWidth]" :style="`margin-top: ${multiPage ? -24 : 0}px`">
      <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
        <a-keep-alive :exclude-keys="excludeKeys" v-if="multiPage && cachePage" v-model="clearCaches">
          <router-view v-if="!refreshing" ref="tabContent" :key="$route.path" />
        </a-keep-alive>
        <router-view ref="tabContent" v-else-if="!refreshing" />
      </page-toggle-transition>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout'
import Contextmenu from '@/components/menu/Contextmenu'
import PageToggleTransition from '@/components/transition/PageToggleTransition'
import {mapState, mapMutations} from 'vuex'
import {getI18nKey} from '@/utils/routerUtil'
import AKeepAlive from '@/components/cache/AKeepAlive'
import TabsHead from '@/layouts/tabs/TabsHead'

export default {
  name: 'TabsView',
  i18n: require('./i18n'),
  components: {TabsHead, PageToggleTransition, Contextmenu, AdminLayout , AKeepAlive },
  data () {
    return {
      clearCaches: [],
      pageList: [],
      activePage: '',
      menuVisible: false,
      refreshing: false,
      excludeKeys: []
    }
  },
  computed: {
    ...mapState('setting', ['multiPage', 'cachePage', 'animate', 'layout', 'pageWidth']),
    menuItemList() {
      return [
        { key: '1', icon: 'vertical-right', text: this.$t('closeLeft') },
        { key: '2', icon: 'vertical-left', text: this.$t('closeRight') },
        { key: '3', icon: 'close', text: this.$t('closeOthers') },
        { key: '4', icon: 'sync', text: this.$t('refresh') },
      ]
    },
    tabsOffset() {
      return this.multiPage ? 24 : 0
    }
  },
  created () {
    this.loadCacheConfig(this.$router?.options?.routes)
    this.loadCachedTabs()
    const route = this.$route
    if (this.pageList.findIndex(item => item.path === route.path) === -1) {
      this.pageList.push(this.createPage(route))
    }
    this.activePage = route.path
    if (this.multiPage) {
      this.$nextTick(() => {
        this.setCachedKey(route)
      })
      this.addListener()
    }
  },
  mounted () {
    this.correctPageMinHeight(-this.tabsOffset)
  },
  beforeDestroy() {
    this.removeListener()
    this.correctPageMinHeight(this.tabsOffset)
  },
  watch: {
    '$router.options.routes': function (val) {
      this.excludeKeys = []
      this.loadCacheConfig(val)
    },
    '$route': function (newRoute) {
      this.activePage = newRoute.path
      const page = this.pageList.find(item => item.path === newRoute.path)
      if (!this.multiPage) {
        this.pageList = [this.createPage(newRoute)]
      } else if (page) {
        page.fullPath = newRoute.fullPath
      } else if (!page) {
        this.pageList.push(this.createPage(newRoute))
      }
      if (this.multiPage) {
        this.$nextTick(() => {
          this.setCachedKey(newRoute)
        })
      }
    },
    'multiPage': function (newVal) {
      if (!newVal) {
        this.pageList = [this.createPage(this.$route)]
        this.removeListener()
      } else {
        this.addListener()
      }
    },
    tabsOffset(newVal, oldVal) {
      this.correctPageMinHeight(oldVal - newVal)
    }
  },
  methods: {
    changePage (key) {
      this.activePage = key
      const page = this.pageList.find(item => item.path === key)
      this.$router.push(page.fullPath)
    },
    remove (key, next) {
      if (this.pageList.length === 1) {
        return this.$message.warning(this.$t('warn'))
      }
      //清除缓存
      let index = this.pageList.findIndex(item => item.path === key)
      this.clearCaches = this.pageList.splice(index, 1).map(page => page.cachedKey)
      if (next) {
        this.$router.push(next)
      } else if (key === this.activePage) {
        index = index >= this.pageList.length ? this.pageList.length - 1 : index
        this.activePage = this.pageList[index].path
        this.$router.push(this.activePage)
      }
    },
    refresh (key, page) {
      page = page || this.pageList.find(item => item.path === key)
      page.loading = true
      this.clearCache(page)
      if (key === this.activePage) {
        this.reloadContent(() => page.loading = false)
      } else {
        // 其实刷新很快，加这个延迟纯粹为了 loading 状态多展示一会儿，让用户感知刷新这一过程
        setTimeout(() => page.loading = false, 500)
      }
    },
    onContextmenu(pageKey, e) {
      if (pageKey) {
        e.preventDefault()
        e.meta = pageKey
        this.menuVisible = true
      }
    },
    onMenuSelect (key, target, pageKey) {
      switch (key) {
        case '1': this.closeLeft(pageKey); break
        case '2': this.closeRight(pageKey); break
        case '3': this.closeOthers(pageKey); break
        case '4': this.refresh(pageKey); break
        default: break
      }
    },
    closeOthers (pageKey) {
      // 清除缓存
      const clearPages = this.pageList.filter(item => item.path !== pageKey && !item.unclose)
      this.clearCaches = clearPages.map(item => item.cachedKey)
      this.pageList = this.pageList.filter(item => !clearPages.includes(item))
      // 判断跳转
      if (this.activePage != pageKey) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    closeLeft (pageKey) {
      const index = this.pageList.findIndex(item => item.path === pageKey)
      // 清除缓存
      const clearPages = this.pageList.filter((item, i) => i < index && !item.unclose)
      this.clearCaches = clearPages.map(item => item.cachedKey)
      this.pageList = this.pageList.filter(item => !clearPages.includes(item))
      // 判断跳转
      if (!this.pageList.find(item => item.path === this.activePage)) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    closeRight (pageKey) {
      // 清除缓存
      const index = this.pageList.findIndex(item => item.path === pageKey)
      const clearPages = this.pageList.filter((item, i) => i > index && !item.unclose)
      this.clearCaches = clearPages.map(item => item.cachedKey)
      this.pageList = this.pageList.filter(item => !clearPages.includes(item))
      // 判断跳转
      if (!this.pageList.find(item => item.path === this.activePage)) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    clearCache(page) {
      page._init_ = false
      this.clearCaches = [page.cachedKey]
    },
    reloadContent(onLoaded) {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
        this.$nextTick(() => {
          this.setCachedKey(this.$route)
          if (typeof onLoaded === 'function') {
            onLoaded.apply(this, [])
          }
        })
      }, 200)
    },
    pageName(page) {
      return this.$t(getI18nKey(page.keyPath))
    },
    /**
     * 添加监听器
     */
    addListener() {
      window.addEventListener('page:close', this.closePageListener)
      window.addEventListener('page:refresh', this.refreshPageListener)
      window.addEventListener('unload', this.unloadListener)
    },
    /**
     * 移出监听器
     */
    removeListener() {
      window.removeEventListener('page:close', this.closePageListener)
      window.removeEventListener('page:refresh', this.refreshPageListener)
      window.removeEventListener('unload', this.unloadListener)
    },
    /**
     * 页签关闭事件监听
     * @param event 页签关闭事件
     */
    closePageListener(event) {
      const {closeRoute, nextRoute} = event.detail
      const closePath = typeof closeRoute === 'string' ? closeRoute : closeRoute.path
      const path = closePath && closePath.split('?')[0]
      this.remove(path, nextRoute)
    },
    /**
     * 页面刷新事件监听
     * @param event 页签关闭事件
     */
    refreshPageListener(event) {
      const {pageKey} = event.detail
      const path = pageKey && pageKey.split('?')[0]
      this.refresh(path)
    },
    /**
     * 页面 unload 事件监听器，添加页签到 session 缓存，用于刷新时保留页签
     */
    unloadListener() {
      const tabs = this.pageList.map(item => ({...item, _init_: false}))
      sessionStorage.setItem(process.env.VUE_APP_TBAS_KEY, JSON.stringify(tabs))
    },
    createPage(route) {
      return {
        keyPath: route.matched[route.matched.length - 1].path,
        fullPath: route.fullPath, loading: false,
        path: route.path,
        title: route.meta && route.meta.page && route.meta.page.title,
        unclose: route.meta && route.meta.page && (route.meta.page.closable === false),
      }
    },
    /**
     * 设置页面缓存的key
     * @param route 页面对应的路由
     */
    setCachedKey(route) {
      const page = this.pageList.find(item => item.path === route.path)
      page.unclose = route.meta && route.meta.page && (route.meta.page.closable === false)
      if (!page._init_) {
        const vnode = this.$refs.tabContent.$vnode
        page.cachedKey = vnode.key + vnode.componentOptions.Ctor.cid
        page._init_ = true
      }
    },
    /**
     * 加载缓存的 tabs
     */
    loadCachedTabs() {
      const cachedTabsStr = sessionStorage.getItem(process.env.VUE_APP_TBAS_KEY)
      if (cachedTabsStr) {
        try {
          const cachedTabs = JSON.parse(cachedTabsStr)
          if (cachedTabs.length > 0) {
            this.pageList = cachedTabs
          }
        } catch (e) {
          console.warn('failed to load cached tabs, got exception:', e)
        } finally {
          sessionStorage.removeItem(process.env.VUE_APP_TBAS_KEY)
        }
      }
    },
    loadCacheConfig(routes, pCache = true) {
      routes.forEach(item => {
        const cacheAble = item.meta?.page?.cacheAble ?? pCache ?? true
        if (!cacheAble) {
          this.excludeKeys.push(new RegExp(`${item.path.replace(/:[^/]*/g, '[^/]*')}\\d*$`))
        }
        if (item.children) {
          this.loadCacheConfig(item.children, cacheAble)
        }
      })
    },
    ...mapMutations('setting', ['correctPageMinHeight'])
  }
}
</script>

<style scoped lang="less">
  .tabs-view{
    margin: -16px auto 8px;
    &.head.fixed{
      max-width: 1400px;
    }
  }
  .tabs-view-content{
    position: relative;
    &.head.fixed{
      width: 1400px;
      margin: 0 auto;
    }
  }
</style>
