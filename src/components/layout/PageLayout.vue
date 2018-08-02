<template>
  <div style="margin: -24px -24px 0px">
    <page-header :breadcrumb="breadcrumb" :title="title" :logo="avatar">
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent">
        <p style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)">{{desc}}</p>
        <div class="link">
          <template  v-for="(link, index) in linkList">
            <a :key="index" :href="link.href"><a-icon :type="link.icon" />{{link.title}}</a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra"></slot>
    </page-header>
    <div ref="page" style="margin: 24px 24px 0px">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from '../page/PageHeader'
import AIcon from 'vue-antd-ui/es/icon/icon'
export default {
  name: 'PageLayout',
  components: {AIcon, PageHeader},
  props: ['desc', 'title', 'avatar', 'linkList', 'extraImage'],
  data () {
    return {
      breadcrumb: []
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
  .link{
    margin-top: 16px;
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

</style>
