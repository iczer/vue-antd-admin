import PouchDB from 'pouchdb'

let db = new PouchDB('adminDb')

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      db.get('currUser').then(doc => {
        db.put({
          _id: 'currUser',
          _rev: doc._rev,
          user: user
        })
      }).catch(e => {
        if (e.status === 404) {
          db.put({
            _id: 'currUser',
            user: user
          })
        } else {
          throw e
        }
      })
    }
  }
}
