<template>
  <page-layout title="单号：234231029431" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" class="advanced-detail-header" style="margin-left: 44px;">
      <detail-list-item term="创建人">曲丽丽</detail-list-item>
      <detail-list-item term="订购产品">xx服务</detail-list-item>
      <detail-list-item term="订购产品">xx服务</detail-list-item>
      <detail-list-item term="订购产品">xx服务</detail-list-item>
    </detail-list>
    <template slot="extra">
      2333
    </template>
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '../layout/PageLayout'
import AButtonGroup from 'vue-antd-ui/es/button/button-group'
import AButton from 'vue-antd-ui/es/button/button'
import AIcon from 'vue-antd-ui/es/icon/icon'
import DetailList from '../tool/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'AdvancedDetail',
  components: {DetailListItem, DetailList, AIcon, AButton, AButtonGroup, PageLayout}
}
</script>

<style lang="less">
  .advanced-detail-header{
    .term,.content{
      padding-bottom: 8px;
    }
  }
</style>
