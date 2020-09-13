<template>
  <div >
    <div :class="['mask', visible ? 'open' : 'close']" @click="close"></div>
    <div :class="['drawer', placement, visible ? 'open' : 'close']">
      <div ref="drawer" class="content beauty-scroll">
        <slot></slot>
      </div>
      <div v-if="showHandler" :class="['handler-container', placement, visible ? 'open' : 'close']" ref="handler" @click="toggle">
        <slot v-if="$slots.handler" name="handler"></slot>
        <div v-else class="handler">
          <a-icon :type="visible ? 'close'  : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    placement: {
      type: String,
      required: false,
      default: 'left'
    },
    showHandler: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    open () {
      this.$emit('change', true)
    },
    close () {
      this.$emit('change', false)
    },
    toggle () {
      this.$emit('change', !this.visible)
    }
  }
}
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: @shadow-color;
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
    transition: all 0.5s;
    height: 100vh;
    z-index: 100;
    &.left{
      left: 0px;
      &.open{
        .content{
          box-shadow: 2px 0 8px @shadow-color;
        }
      }
      &.close{
        transform: translateX(-100%);
      }
    }
    &.right{
      right: 0px;
      .content{
        float: right;
      }
      &.open{
        .content{
          box-shadow: -2px 0 8px @shadow-color;
        }
      }
      &.close{
        transform: translateX(100%);
      }
    }
  }
  .content{
    display: inline-block;
    height: 100vh;
    overflow-y: auto;
  }
  .handler-container{
    position: absolute;
    display: inline-block;
    text-align: center;
    transition: all 0.5s;
    cursor: pointer;
    top: 200px;
    z-index: 100;
    .handler {
      height: 40px;
      width: 40px;
      background-color: @base-bg-color;
      font-size: 26px;
      box-shadow: 0 2px 8px @shadow-color;
      line-height: 40px;
    }
    &.left{
      right: -40px;
      .handler{
        border-radius: 0 5px 5px 0;
      }
    }
    &.right{
      left: -40px;
      .handler{
        border-radius: 5px 0 0 5px;
      }
    }
  }
</style>
