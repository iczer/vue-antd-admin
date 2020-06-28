<template>
  <div class="head-info">
    <span>{{title}}</span>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'HeadInfo',
  props: ['title', 'content', 'bordered']
}
</script>

<style lang="less" scoped>
  .head-info{
    text-align: center;
    padding: 0 24px;
    flex-grow: 1;
    flex-shrink: 0;
    align-self: center;
    span{
      color: rgba(0,0,0,.45);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 4px;
    }
    p{
      color: rgba(0,0,0,.85);
      font-size: 24px;
      margin: 0;
    }
  }
</style>
