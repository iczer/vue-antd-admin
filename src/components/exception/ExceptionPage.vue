<template>
  <div class="exception-page" :style="{minHeight: layoutMinHeight - 64 + 'px'}">
    <div class="img">
      <img :src="config[type].img" />
    </div>
    <div class="content">
      <h1>{{config[type].title}}</h1>
      <div class="desc">{{config[type].desc}}</div>
      <div class="action">
        <a-button type="primary" >返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig'

export default {
  name: 'ExceptionPage',
  props: ['type'],
  data () {
    return {
      config: Config
    }
  },
  inject: ['layoutMinHeight']
}
</script>

<style lang="less" scoped>
  .exception-page{
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    .img{
      display: inline-block;
      padding-right: 52px;
      zoom: 1;
      img{
        height: 360px;
        max-width: 430px;
      }
    }
    .content{
      display: inline-block;
      h1{
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc{
        color: rgba(0,0,0,.45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

</style>
