// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/lazy'
import 'ant-design-vue/dist/antd.css'
import Viser from 'viser-vue'
import axios from 'axios'
import message from 'ant-design-vue/es/message'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'

Vue.prototype.$axios = axios
Vue.prototype.$message = message
Vue.config.productionTip = false
Vue.use(Viser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user)
    })
  }
})
