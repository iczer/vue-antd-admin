<template>
  <admin-layout>
    <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
    <a-tabs
      @contextmenu.native="e => onContextmenu(e)"
      v-if="multiPage"
      :active-key="activePage"
      :style="`margin: -16px auto 8px; ${layout == 'head' ? 'max-width: 1400px;' : ''}`"
      :hide-add="true"
      type="editable-card"
      @change="changePage"
      @edit="editPage">
      <a-tab-pane :key="page.fullPath" v-for="page in pageList">
        <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
      </a-tab-pane>
    </a-tabs>
    <div class="tabs-view-content">
      <page-toggle-transition :animate="animate.name" :direction="animate.direction">
        <keep-alive v-if="multiPage">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </page-toggle-transition>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from './AdminLayout'
import Contextmenu from '../components/menu/Contextmenu'
import PageToggleTransition from '../components/transition/PageToggleTransition'
import {mapState} from 'vuex'

export default {
  name: 'TabsView',
  components: {PageToggleTransition, Contextmenu, AdminLayout},
  data () {
    return {
      pageList: [],
      linkList: [],
      activePage: '',
      menuVisible: false,
      menuItemList: [
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其它' }
      ]
    }
  },
  computed: {
    ...mapState('setting', ['multiPage', 'animate', 'layout'])
  },
  created () {
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.fullPath)
    this.activePage = this.$route.fullPath
  },
  watch: {
    '$route': function (newRoute) {
      this.activePage = newRoute.fullPath
      if (!this.multiPage) {
        this.linkList = [newRoute.fullPath]
        this.pageList = [newRoute]
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath)
        this.pageList.push(newRoute)
      }
    },
    'activePage': function () {
      // this.$router.push(key)
    },
    'multiPage': function (newVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath]
        this.pageList = [this.$route]
      }
    }
  },
  methods: {
    changePage (key) {
      this.activePage = key
      this.$router.push(key)
    },
    editPage (key, action) {
      this[action](key)
    },
    remove (key) {
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦')
        return
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key)
      let index = this.linkList.indexOf(key)
      this.linkList = this.linkList.filter(item => item !== key)
      if (key == this.activePage) {
        index = index >= this.linkList.length ? this.linkList.length - 1 : index
        this.activePage = this.linkList[index]
        this.$router.push(this.activePage)
      }
    },
    onContextmenu (e) {
      const pagekey = this.getPageKey(e.target)
      if (pagekey !== null) {
        e.preventDefault()
        this.menuVisible = true
      }
    },
    /**
     * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
     * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
     * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
     * @param target 查询开始目标
     * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
     * @returns {String}
     */
    getPageKey (target, depth) {
      depth = depth || 0
      if (depth > 2) {
        return null
      }
      let pageKey = target.getAttribute('pagekey')
      pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
      return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
    },
    onMenuSelect (key, target) {
      let pageKey = this.getPageKey(target)
      switch (key) {
        case '1':
          this.closeLeft(pageKey)
          break
        case '2':
          this.closeRight(pageKey)
          break
        case '3':
          this.closeOthers(pageKey)
          break
        default:
          break
      }
    },
    closeOthers (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index, index + 1)
      this.pageList = this.pageList.slice(index, index + 1)
      this.activePage = this.linkList[0]
    },
    closeLeft (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index)
      this.pageList = this.pageList.slice(index)
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0]
      }
    },
    closeRight (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(0, index + 1)
      this.pageList = this.pageList.slice(0, index + 1)
      if (this.linkList.indexOf(this.activePage < 0)) {
        this.activePage = this.linkList[this.linkList.length - 1]
      }
    }
  }
}
</script>

<style scoped lang="less">
  .tabs-view-content{
    position: relative;
  }
</style>
