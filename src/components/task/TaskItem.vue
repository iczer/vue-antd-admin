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
    box-shadow: 0 1px 1px rgba(27,31,35,0.1);
    border-radius: 6px;
    color: #24292e;
    & :hover{
      cursor: move;
      box-shadow: 0 1px 1px rgba(27,31,35,0.15);
      border-radius: 6px;
    }
  }
</style>
