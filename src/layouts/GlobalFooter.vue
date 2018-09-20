<template>
  <div class="footer">
    <div class="links">
      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in linkList">
        <a-icon v-if="item.icon" :type="item.icon"/>{{item.name}}
      </a>
    </div>
    <div class="copyright">
      Copyright<a-icon type="copyright" />{{copyright}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  props: ['copyright', 'linkList']
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
