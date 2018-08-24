<template>
    <a-card class="task-card" size="large" :title="title" :bordered="false" :bodyStyle="{backgroundColor: '#e1e4e8'}">
      <div slot="extra">
        <a-icon class="add" type="plus" draggable="true"/>
        <a-icon class="more" style="margin-left: 8px" type="ellipsis" />
      </div>
      <slot></slot>
    </a-card>
</template>

<script>
import ACard from 'ant-design-vue/es/card/Card'
import AIcon from 'ant-design-vue/es/icon/icon'
export default {
  name: 'TaskCard',
  components: {AIcon, ACard},
  props: ['title'],
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .task-card{
    width: 33.33%;
    font-size: 24px;
    font-weight: bolder;
    background-color: #e1e4e8;
    .add{
      cursor: pointer;
    }
    .more{
      cursor: pointer;
    }
  }
</style>
