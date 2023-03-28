export default {
  state: {
    info: {}
  },
  actions: {
    async fetchinfo({dispatch, commit}){
        const uid = await dispatch('getUid')
    }
  },
  getters:{
    info: s=>s.info
  }
}