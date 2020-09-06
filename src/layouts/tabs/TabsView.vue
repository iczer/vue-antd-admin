<template>
  <admin-layout>
    <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
    <a-tabs
      v-if="multiPage"
      type="editable-card"
      :active-key="activePage"
      :class="['tabs-view', layout, pageWidth]"
      :hide-add="true"
      @change="changePage"
      @edit="editPage"
      @contextmenu="onContextmenu"
    >
      <a-tab-pane :key="page.fullPath" v-for="page in pageList">
        <span slot="tab" :pagekey="page.fullPath">{{pageName(page)}}</span>
      </a-tab-pane>
    </a-tabs>
    <div class="tabs-view-content" :style="`margin-top: ${multiPage ? -24 : 0}px`">
      <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
        <a-keep-alive v-if="multiPage" v-model="clearCaches">
          <router-view ref="tabContent" :key="$route.fullPath" />
        </a-keep-alive>
        <router-view v-else />
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

export default {
  name: 'TabsView',
  i18n: require('./i18n'),
  components: { PageToggleTransition, Contextmenu, AdminLayout , AKeepAlive },
  data () {
    return {
      clearCaches: [],
      pageList: [],
      cachedKeys: [],
      activePage: '',
      menuVisible: false
    }
  },
  computed: {
    ...mapState('setting', ['multiPage', 'animate', 'layout', 'pageWidth']),
    menuItemList() {
      return [
        { key: '1', icon: 'vertical-right', text: this.$t('closeLeft') },
        { key: '2', icon: 'vertical-left', text: this.$t('closeRight') },
        { key: '3', icon: 'close', text: this.$t('closeOthers') }
      ]
    },
    tabsOffset() {
      return this.multiPage ? 24 : 0
    }
  },
  created () {
    const route = this.$route
    this.pageList.push(route)
    this.activePage = route.fullPath
    if (this.multiPage) {
      window.addEventListener('page:close', this.closePageListener)
    }
  },
  mounted () {
    this.correctPageMinHeight(-this.tabsOffset)
    if(this.multiPage){
      this.cachedKeys.push(this.$refs.tabContent.$vnode.key)
    }
  },
  beforeDestroy() {
    window.removeEventListener('page:close', this.closePageListener)
    this.correctPageMinHeight(this.tabsOffset)
  },
  watch: {
    '$route': function (newRoute) {
      this.activePage = newRoute.fullPath
      if (!this.multiPage) {
        this.pageList = [newRoute]
      } else if (this.pageList.findIndex(item => item.fullPath == newRoute.fullPath) == -1) {
        this.$nextTick(() => {
          this.cachedKeys.push(this.$refs.tabContent.$vnode.key)
        })
        this.pageList.push(newRoute)
      }
    },
    'multiPage': function (newVal) {
      if (!newVal) {
        this.pageList = [this.$route]
        window.removeEventListener('page:close', this.closePageListener)
      } else {
        window.addEventListener('page:close', this.closePageListener)
      }
    },
    tabsOffset(newVal, oldVal) {
      this.correctPageMinHeight(oldVal - newVal)
    }
  },
  methods: {
    changePage (key) {
      this.activePage = key
      this.$router.push(key)
    },
    editPage (key, action) {
      this[action](key) // remove
    },
    remove (key, next) {
      if (this.pageList.length === 1) {
        return this.$message.warning(this.$t('warn'))
      }
      let index = this.pageList.findIndex(item => item.fullPath === key)
      //清除缓存
      this.clearCaches = this.cachedKeys.splice(index, 1)
      this.pageList.splice(index, 1)
      if (next) {
        this.$router.push(next)
      } else if (key === this.activePage) {
        index = index >= this.pageList.length ? this.pageList.length - 1 : index
        this.activePage = this.pageList[index].fullPath
        this.$router.push(this.activePage)
      }
    },
    onContextmenu (e) {
      const pageKey = getPageKey(e.target)
      if (pageKey) {
        e.preventDefault()
        this.menuVisible = true
      }
    },
    onMenuSelect (key, target) {
      let pageKey = getPageKey(target)
      switch (key) {
        case '1': this.closeLeft(pageKey); break
        case '2': this.closeRight(pageKey); break
        case '3': this.closeOthers(pageKey); break
        default: break
      }
    },
    closeOthers (pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey)
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i != index)
      this.cachedKeys = this.cachedKeys.slice(index, index + 1)

      this.pageList = this.pageList.slice(index, index + 1)
      if (this.activePage != pageKey) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    closeLeft (pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey)
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i < index)
      this.cachedKeys = this.cachedKeys.slice(index)

      this.pageList = this.pageList.slice(index)
      if (!this.pageList.find(item => item.fullPath === this.activePage)) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    closeRight (pageKey) {
      const index = this.pageList.findIndex(item => item.fullPath === pageKey)
      // 清除缓存
      this.clearCaches = this.cachedKeys.filter((item, i) => i > index)
      this.cachedKeys = this.cachedKeys.slice(0, index+1)

      this.pageList = this.pageList.slice(0, index + 1)
      if (!this.pageList.find(item => item.fullPath === this.activePage)) {
        this.activePage = pageKey
        this.$router.push(this.activePage)
      }
    },
    pageName(page) {
      return this.$t(getI18nKey(page.matched[page.matched.length - 1].path))
    },
    closePageListener(event) {
      const {closeRoute, nextRoute} = event.detail
      const closePath = typeof closeRoute === 'string' ? closeRoute : closeRoute.path
      this.remove(closePath, nextRoute)
    },
    ...mapMutations('setting', ['correctPageMinHeight'])
  }
}
/**
 * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
 * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
 * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
 * @param target 查询开始目标
 * @param depth 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
 * @returns {String}
 */
function getPageKey (target, depth = 0) {
  if (depth > 2 || !target) {
    return null
  }
  return target.getAttribute('pagekey') || getPageKey(target.firstElementChild, ++depth)
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
  }
</style>
