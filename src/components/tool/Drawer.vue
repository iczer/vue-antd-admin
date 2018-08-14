<template>
  <div >
    <div :class="['mask', openDrawer ? 'open' : 'close']" @click="close"></div>
    <div :class="['drawer', openDrawer ? 'open' : 'close']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: ['openDrawer'],
  methods: {
    open () {
      this.$emit('change', true)
    },
    close () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    z-index: 100;
    &.open{
      display: inline-block;
    }
    &.close{
      display: none;
    }
  }
  .drawer{
    position: fixed;
    width: 256px;
    height: 100%;
    transition: all 0.5s;
    z-index: 100;
    &.open{
      left: 0px;
    }
    &.close{
      left: -262px;
    }
    .sider{
      height: 100%;
    }
  }
</style>
