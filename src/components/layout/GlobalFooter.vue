<template>
  <div class="footer">
    <div class="links">
      <a>Pro首页</a>
      <a><a-icon type="github" /></a>
      <a>Ant Design</a>
    </div>
    <div class="copyright">
      Copyright<a-icon type="copyright" />2018 XXXXXXXXXXXXXXXXXX出品
    </div>
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
export default {
  name: 'GlobalFooter',
  components: {AIcon}
}
</script>

<style lang="less" scoped>
  .footer{
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .copyright{
      color: rgba(0,0,0,.45);
      font-size: 14px;
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: rgba(0,0,0,.45);
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
