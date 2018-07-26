<template>
  <div style="margin: -24px -24px 0px">
    <page-header :breadcrumb="breadcrumb"/>
    <div style="margin: 24px 24px 0px">
      <router-view  ref="page"/>
    </div>
  </div>
</template>

<script>
import PageHeader from '../page/PageHeader'
export default {
  name: 'CommonPageLayout',
  components: {PageHeader},
  data () {
    return {
      breadcrumb: []
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
      this.breadcrumb = this.$route.matched
    }
  }
}
</script>

<style scoped>

</style>
