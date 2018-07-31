<template>
  <div style="margin: -24px -24px 0px">
    <page-header :breadcrumb="breadcrumb" :title="title">
      <div slot="content">
        <template v-if="this.$slots.desc">
          <slot name="desc"></slot>
        </template>
        <template v-else>
          {{desc}}
        </template>
      </div>
      <div slot="extra">
        <slot name="extra"></slot>
      </div>
    </page-header>
    <div ref="page" style="margin: 24px 24px 0px">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '../page/PageHeader'
export default {
  name: 'PageLayout',
  components: {PageHeader},
  props: ['desc', 'title'],
  data () {
    return {
      breadcrumb: []
    }
  },
  mounted () {
    this.getBreadcrumb()
  },
  beforeUpdate () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadcrumb = this.$route.matched
    }
  }
}
</script>

<style scoped>

</style>
