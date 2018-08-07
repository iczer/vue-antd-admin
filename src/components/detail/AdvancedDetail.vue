<template>
  <page-layout title="单号：234231029431" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list size="small" :col="2" slot="headerContent" style="margin-left: 44px;">
      <detail-list-item term="创建人">曲丽丽</detail-list-item>
      <detail-list-item term="订购产品">XX服务</detail-list-item>
      <detail-list-item term="创建时间">2018-08-07</detail-list-item>
      <detail-list-item term="关联单据"><a>12421</a></detail-list-item>
      <detail-list-item term="生效日期">2018-08-07 ~ 2018-12-11</detail-list-item>
      <detail-list-item term="备注">请于两个工作日内确认</detail-list-item>
    </detail-list>
    <a-row slot="extra">
      <a-col :xs="24" :sm="12">
        <div class="text">状态</div>
        <div class="heading">待审批</div>
      </a-col>
      <a-col :xs="24" :sm="12">
        <div class="text">订单金额</div>
        <div class="heading">¥ 568.08</div>
      </a-col>
    </a-row>
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>
    <a-card>
      <a-steps :current="1" progressDot>
        <a-step title="创建项目">
          <a-step-item-group slot="description">
            <a-step-item title="曲丽丽" icon="dingding-o"/>
            <a-step-item title="王建豪" icon="dingding-o"/>
            <a-step-item title="2016-12-12 12:32"/>
          </a-step-item-group>
        </a-step>
        <a-step title="部门初审">
          <a-step-item-group slot="description">
            <a-step-item title="周毛毛" icon="dingding-o"/>
            <a-step-item title="催一下"/>
          </a-step-item-group>
        </a-step>
        <a-step title="财务复核">
        </a-step>
        <a-step title="完成">
        </a-step>
      </a-steps>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '../layout/PageLayout'
import AButtonGroup from 'vue-antd-ui/es/button/button-group'
import AButton from 'vue-antd-ui/es/button/button'
import AIcon from 'vue-antd-ui/es/icon/icon'
import DetailList from '../tool/DetailList'
import ARow from 'vue-antd-ui/es/grid/Row'
import ACol from 'vue-antd-ui/es/grid/Col'
import ACard from 'vue-antd-ui/es/card/Card'
import ASteps from 'vue-antd-ui/es/steps/index'
import AStepItem from '../tool/AStepItem'

const DetailListItem = DetailList.Item
const AStep = ASteps.Step
const AStepItemGroup = AStepItem.Group

export default {
  name: 'AdvancedDetail',
  components: {
    AStepItemGroup,
    AStepItem,
    AStep,
    ASteps,
    ACard,
    ACol,
    ARow,
    DetailListItem,
    DetailList,
    AIcon,
    AButton,
    AButtonGroup,
    PageLayout}
}
</script>

<style lang="less" scoped>
  .text{
    color: rgba(0,0,0,.45);
  }
  .heading{
    color: rgba(0,0,0,.85);
    font-size: 20px;
  }
</style>
