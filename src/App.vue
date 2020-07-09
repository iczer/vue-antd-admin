<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>

<script>
import enquireScreen from './utils/device'
import {mapState} from 'vuex'
import themeUtil from '@/utils/themeUtil';

export default {
  name: 'App',
  data() {
    return {
      locale: {}
    }
  },
  created () {
    let _this = this
    this.setLanguage(this.lang)
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
      this.setLanguage(val)
    },
    'theme.mode': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(this.theme.color, val).then(() => {
        setTimeout(closeMessage, 1000)
      })
    },
    'theme.color': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(val, this.theme.mode).then(() => {
        setTimeout(closeMessage, 1000)
      })
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'weekMode', 'lang'])
  },
  methods: {
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    },
    setLanguage(lang) {
      this.$i18n.locale = lang
      switch (lang) {
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
  }
}
</script>

<style lang="less" scoped>
  #id{
  }
</style>
