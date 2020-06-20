<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import enquireScreen from './utils/device'
import {mapState} from 'vuex'

export default {
  name: 'App',
  created () {
    let _this = this
    enquireScreen(isMobile => {
      _this.$store.commit('setting/setDevice', isMobile)
    })
  },
  mounted() {
   this.setWeekModeTheme(this.weekMode)
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val)
    }
  },
  computed: {
    ...mapState('setting', ['weekMode'])
  },
  methods: {
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #id{
  }
</style>
