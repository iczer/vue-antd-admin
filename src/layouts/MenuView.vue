<template>
  <global-layout>
    <a-tabs v-if="multipage" :active-key="activePage" style="margin-bottom: 8px" :hide-add="true" type="editable-card" @change="changePage" @edit="editPage">
      <a-tab-pane v-on="$listeners" :key="page.fullPath" v-for="page in pageList" :tab="page.name"/>
    </a-tabs>
    <transition name="page-toggle">
      <keep-alive v-if="multipage">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </transition>
  </global-layout>
</template>

<script>
import GlobalLayout from './GlobalLayout'
import ATabs from 'ant-design-vue/es/tabs'
const ATabPane = ATabs.TabPane
export default {
  name: 'MenuView',
  components: {ATabPane, ATabs, GlobalLayout},
  data () {
    return {
      pageList: [],
      linkList: [],
      activePage: ''
    }
  },
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    }
  },
  created () {
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.fullPath)
    this.activePage = this.$route.fullPath
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.activePage = newRoute.fullPath
      if (!this.multipage) {
        this.linkList = [newRoute.fullPath]
        this.pageList = [newRoute]
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath)
        this.pageList.push(newRoute)
      }
    },
    'activePage': function (key) {
      this.$router.push(key)
    },
    'multipage': function (newVal, oldVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath]
        this.pageList = [this.$route]
      }
    }
  },
  methods: {
    changePage (key) {
      this.activePage = key
    },
    editPage (key, action) {
      this[action](key)
    },
    add () {
    },
    remove (key) {
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦')
        return
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key)
      let index = this.linkList.indexOf(key)
      this.linkList = this.linkList.filter(item => item !== key)
      index = index >= this.linkList.length ? this.linkList.length - 1 : index
      this.activePage = this.linkList[index]
    }
  }
}
</script>

<style scoped>

</style>
