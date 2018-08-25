<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import enquireScreen from './utils/device'

export default {
  name: 'App',
  created () {
    let _this = this
    enquireScreen(isMobile => {
      _this.$store.commit('setting/setDevice', isMobile)
    })
  }
}
</script>

<style lang="less">
  //拖拽控件全局样式
  :global{
    .dragable-ghost{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-chose{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-drag{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
  }
</style>
