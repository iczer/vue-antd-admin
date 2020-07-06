<template>
  <div class="result">
    <div >
      <a-icon :class="[isSuccess ? 'success' : 'error' ,'icon']" :type="isSuccess ? 'check-circle' : 'close-circle'" />
    </div>
    <div class="title" v-if="title">{{title}}</div>
    <div class="desc" v-if="description">{{description}}</div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['isSuccess', 'title', 'description']
}
</script>

<style lang="less" scoped>
  .result{
    text-align: center;
    width: 72%;
    margin: 0 auto;
    .icon{
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .success {
      color: @success-color;
    }
    .error {
      color: @error-color;
    }
    .title{
      font-size: 24px;
      color: @title-color;
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 16px;
    }
    .desc{
      font-size: 14px;
      line-height: 22px;
      color: @text-color-second;
      margin-bottom: 24px;
    }
    .content{
      background-color: @background-color-light;
      padding: 24px 40px;
      border-radius: 2px;
      text-align: left;
    }
    .action{
      margin-top: 32px;
    }
  }

</style>
