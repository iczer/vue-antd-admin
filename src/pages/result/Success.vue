<template>
    <a-card :bordered="false">
      <result :is-success="true" :description="description" :title="title">
        <template slot="action">
          <a-button type="primary">返回列表</a-button>
          <a-button style="margin-left: 8px">查看项目</a-button>
          <a-button style="margin-left: 8px" @click="print">打印</a-button>
        </template>
        <div>
          <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;">项目名称</div>
          <detail-list size="small" style="max-width: 800px; margin-bottom: 8px">
            <detail-list-item term="项目ID">20180724089</detail-list-item>
            <detail-list-item term="负责人">曲丽丽</detail-list-item>
            <detail-list-item term="生效时间">016-12-12 ~ 2017-12-12</detail-list-item>
          </detail-list>
          <a-steps :current="1" progressDot>
            <a-step title="创建项目">
              <a-step-item-group slot="description">
                <a-step-item title="曲丽丽" icon="dingding-o"/>
                <a-step-item title="2016-12-12 12:32"/>
              </a-step-item-group>
            </a-step>
            <a-step title="部门初审">
              <a-step-item-group slot="description">
                <a-step-item title="周毛毛" icon="dingding-o" :iconStyle="{color: '#00A0E9'}"/>
                <a-step-item title="催一下" :titleStyle="{color: '#00A0E9'}"/>
              </a-step-item-group>
            </a-step>
            <a-step title="财务复核"></a-step>
            <a-step title="完成" ></a-step>
          </a-steps>
        </div>
      </result>
    </a-card>
</template>

<script>
import Result from '../../components/result/Result'
import DetailList from '../../components/tool/DetailList'
import AStepItem from '../../components/tool/AStepItem'

const AStepItemGroup = AStepItem.Group
const DetailListItem = DetailList.Item
export default {
  name: 'Success',
  components: {AStepItemGroup, AStepItem, DetailListItem, DetailList, Result},
  data () {
    return {
      title: '提交成功',
      description: '提交结果页用于反馈一系列操作任务的处理结果，\n' +
      ' 如果仅是简单操作，使用 Message 全局提示反馈即可。\n' +
      ' 本文字区域可以展示简单的补充说明，如果有类似展示\n' +
      ' “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。'
    }
  },
  methods: {
    print () {
      window.print()
    }
  }
}
</script>

<style scoped>

</style>
