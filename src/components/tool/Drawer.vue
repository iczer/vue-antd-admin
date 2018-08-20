<template>
  <div >
    <div :class="['mask', openDrawer ? 'open' : 'close']" @click="close"></div>
    <div :class="['drawer', placement, openDrawer ? 'open' : 'close']">
      <div style="position: relative; height: 100%">
        <slot></slot>
      </div>
      <div class="button" @click="handle">
        <a-icon type="bars" />
      </div>
    </div>
  </div>
</template>

<script>
import AIcon from 'ant-design-vue/es/icon/icon'
export default {
  name: 'Drawer',
  components: {AIcon},
  props: {
    openDrawer: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'left'
    }
  },
  methods: {
    open () {
      this.$emit('change', true)
    },
    close () {
      this.$emit('change', false)
    },
    handle () {
      this.$emit('change', !this.openDrawer)
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
    height: 100%;
    transition: all 0.5s;
    z-index: 100;
    &.left{
      &.open{
      }
      &.close{
        transform: translateX(-100%);
      }
    }
    &.right{
      &.open{
        right: 0;
      }
      &.close{
        right: -100%;
      }
    }
    .sider{
      height: 100%;
    }
  }
  .button{
    height: 40px;
    width: 40px;
    background-color: #fff;
    border-radius: 0 5px 5px 0;
    position: fixed;
    left: 256px;
    top: 200px;
    z-index: 100;
    font-size: 26px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    text-align: center;
    line-height: 40px;
  }
</style>
