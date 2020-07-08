<template>
  <a-card class="task-item" type="inner">
    {{content}}
  </a-card>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['content']
}
</script>

<style lang="less" scoped>
  .task-item{
    margin-bottom: 16px;
    box-shadow: 0 1px 1px @shadow-color;
    border-radius: 6px;
    & :hover{
      cursor: move;
      box-shadow: 0 1px 2px @shadow-color;
      border-radius: 6px;
    }
  }
</style>
