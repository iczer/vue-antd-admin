import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'

Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
Vue.use(Plugins)

const i18n = initI18n(router, 'CN', 'US')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
