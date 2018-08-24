<template>
  <a-card class="task-item" type="inner">
    {{content}}
  </a-card>
</template>

<script>
import ACard from 'ant-design-vue/es/card/Card'
export default {
  name: 'TaskItem',
  props: ['content'],
  components: {ACard}
}
</script>

<style lang="less" scoped>
  .task-item{
    margin-bottom: 16px;
    transition: all .3s;
    & :hover{
      cursor: move;
    }
  }
</style>
