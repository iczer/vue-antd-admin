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
</style>
