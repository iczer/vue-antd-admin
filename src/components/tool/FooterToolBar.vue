<template>
  <div class="toolbar">
    <div style="float: left">
      <slot name="extra"></slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterToolBar'
}
</script>

<style lang="less" scoped>
  .toolbar{
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
    background: #fff;
    border-top: 1px solid #e8e8e8;
    padding: 12px 24px;
    z-index: 9;
  }
</style>
