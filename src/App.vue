<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/es/locale-provider/zh_CN'
import enquireScreen from './utils/device'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      locale: zh_CN
    }
  },
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
    },
    lang(val) {
      this.$i18n.locale = val
      switch (val) {
        case 'CN':
          this.locale = require('ant-design-vue/es/locale-provider/zh_CN').default
          break
        case 'HK':
          this.locale = require('ant-design-vue/es/locale-provider/zh_TW').default
          break
        case 'US':
        default:
          this.locale = require('ant-design-vue/es/locale-provider/en_US').default
          break
      }
    }
  },
  computed: {
    ...mapState('setting', ['weekMode', 'lang'])
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
