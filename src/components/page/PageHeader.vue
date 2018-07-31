<template>
  <div class="page-header">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="#/dashboard">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item :key="item.path" v-for="item in breadcrumb">{{item.name}}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="detail">
      <h1 v-if="title" class="title">{{title}}</h1>
      <div class="content"><slot name="content"></slot></div>
      <div class="extra"><slot name="extra"></slot></div>
    </div>
  </div>
</template>

<script>
import ABreadcrumb from 'vue-antd-ui/es/breadcrumb'

const ABreadcrumbItem = ABreadcrumb.Item
export default {
  name: 'PageHeader',
  components: {ABreadcrumbItem, ABreadcrumb},
  props: {
    title: {
      type: String,
      required: false
    },
    breadcrumb: {
      type: Array,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
  .page-header{
    background: #fff;
    padding: 16px 32px 0;
    border-bottom: 1px solid #e8e8e8;
    .breadcrumb{
      margin-bottom: 16px;
    }
    .detail{
      display: flex;
      .title{
        font-size: 20px;
        font-weight: 500;
        color: rgba(0,0,0,.85);
      }
      .content{
        margin-bottom: 16px;
        flex: auto;
      }
      .extra
      {
        flex: 0 1 auto;
        margin-left: 88px;
        min-width: 450px;
        float: right;
      }
    }
  }
</style>
