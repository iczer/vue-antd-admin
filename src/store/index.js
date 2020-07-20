import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import setting from './modules/setting'
import PouchDB from 'pouchdb'

const db = new PouchDB('adminDb')

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    setting
  }
})
// 读取用户信息
db.get('currUser')
  .then(doc => store.commit('account/setUser', doc.user))
  .catch(() => {})

export default store
