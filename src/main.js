import Vue from 'vue'
import App from './App.vue'
import router from './router/lazy'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import 'animate.css/source/animate.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user)
    })
  },
}).$mount('#app')
