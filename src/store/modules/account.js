import PouchDB from 'pouchdb'

var db = new PouchDB('admindb')

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setuser (state, user) {
      state.user = user
      db.get('currUser').then(doc => {
        db.put({
          _id: 'currUser',
          _rev: doc._rev,
          user: user
        })
      })
    }
  }
}
