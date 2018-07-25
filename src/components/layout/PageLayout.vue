<template>
  <div style="margin: -24px -24px 0px">
    <page-header :breadcrumb="breadcrumb" :title="title">
      <div slot="content">{{desc}}</div>
    </page-header>
    <div style="margin: 24px 24px 0px">
      <router-view  ref="page"/>
    </div>
  </div>
</template>

<script>
import PageHeader from '../page/PageHeader'
export default {
  name: 'PageLayout',
  components: {PageHeader},
  data () {
    return {
      title: '',
      breadcrumb: [],
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
      this.breadcrumb = this.$route.matched
      this.desc = this.$refs.page.desc
    }
  }
}
</script>

<style scoped>

</style>
