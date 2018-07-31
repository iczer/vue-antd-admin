<template>
  <page-layout :desc="desc">
    <router-view  ref="page"/>
  </page-layout>
</template>

<script>
import PageHeader from '../page/PageHeader'
import PageLayout from './PageLayout'
export default {
  name: 'PageView',
  components: {PageLayout, PageHeader},
  data () {
    return {
      title: '',
      desc: ''
    }
  },
  mounted () {
    this.getPageHeaderInfo()
  },
  beforeUpdate () {
    this.getPageHeaderInfo()
  },
  methods: {
    getPageHeaderInfo () {
      this.title = this.$route.name
      this.desc = this.$refs.page.desc
    }
  }
}
</script>

<style scoped>

</style>
