<template>
  <div class="result">
    <div >
      <a-icon :class="[isSuccess ? 'success' : 'error' ,'icon']" :type="isSuccess ? 'check-circle' : 'close-circle'" />
    </div>
    <div class="title">{{title}}</div>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import AIcon from 'vue-antd-ui/es/icon/icon'
export default {
  name: 'Result',
  components: {AIcon},
  props: ['isSuccess', 'title']
}
</script>

<style lang="less" scoped>
  .result{
    text-align: center;
    text-align: center;
    width: 72%;
    margin: 0 auto;
    .icon{
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
    .title{
      font-size: 24px;
      color: rgba(0,0,0,.85);
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 16px;
    }
  }

</style>
