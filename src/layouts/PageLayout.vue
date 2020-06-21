<template>
  <div class="page-layout">
    <page-header :breadcrumb="breadcrumb" :title="title" :logo="logo" :avatar="avatar">
      <slot name="action"  slot="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)">{{desc}}</p>
        <div v-if="this.linkList" class="link">
          <template  v-for="(link, index) in linkList">
            <a :key="index" :href="link.href"><a-icon :type="link.icon" />{{link.title}}</a>
          </template>
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div ref="page" :class="['page-content', layout]" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/page/PageHeader'
export default {
  name: 'PageLayout',
  components: {PageHeader},
  props: ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage'],
  data () {
    return {
      breadcrumb: []
    }
  },
  computed: {
    layout () {
      return this.$store.state.setting.layout
    }
  },
  mounted () {
    this.getBreadcrumb()
  },
  updated () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadcrumb = this.$route.matched
    }
  }
}
</script>

<style lang="less" scoped>
  .page-header{
    margin: -24px -24px 0;
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
    &.head{
      margin: 0 auto;
      max-width: 1400px;
    }
  }
</style>
