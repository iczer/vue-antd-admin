<template>
  <page-layout :desc="desc" :title="title" :linkList="linkList">
    <div v-if="this.extraImage && !isMobile" slot="extra" class="extraImg">
      <img :src="extraImage"/>
    </div>
    <page-toggle-transition :animate="animate.name" :direction="animate.direction">
      <keep-alive v-if="multiPage">
        <router-view ref="page" />
      </keep-alive>
      <router-view ref="page" v-else />
    </page-toggle-transition>
  </page-layout>
</template>

<script>
import PageLayout from './PageLayout'
import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'

export default {
  name: 'PageView',
  components: {PageToggleTransition, PageLayout},
  data () {
    return {
      path: '',
      desc: '',
      linkList: [],
      extraImage: ''
    }
  },
  computed: {
    title() {
      let key = this.path.substring(1).replace(new RegExp('/', 'g'), '.') + '.name'
      return this.$t(key)
    },
    ...mapState('setting', ['isMobile', 'multiPage', 'animate', 'routesI18n'])
  },
  created() {
    let i18n = this.routesI18n
    Object.keys(i18n).forEach(key => {
      this.$i18n.mergeLocaleMessage(key, i18n[key])
    })
  },
  mounted () {
    this.getPageHeaderInfo()
  },
  updated () {
    this.getPageHeaderInfo()
  },
  methods: {
    getPageHeaderInfo () {
      this.path = this.$route.path
      const page = this.$refs.page
      if (page) {
        this.desc = page.desc
        this.linkList = page.linkList
        this.extraImage = page.extraImage
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .extraImg{
    margin-top: -60px;
    text-align: center;
    width: 195px;
    img{
      width: 100%;
    }
  }
</style>
