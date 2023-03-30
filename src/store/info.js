export default {
  state: {
    info: {}
  },
  actions: {
    async fetchinfo({dispatch, commit}){
        const uid = await dispatch('getUid')
    },
    async dataActiveUser({dispatch, commit}, user_id){
     console.log('dataActiveUserdataActiveUserdataActiveUser')
     await fetch('http://localhost:8000/dataActiveUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
     },
      
     body: JSON.stringify(user_id)
      
   })
   .then((response) => {
    console.log( 'dataActiveUser response', response)
    return response.json();
  })
  //  .then(commit('setActiveUser', aciveUser.user_id))
  //  .then(console.log( 'setActiveUser', data[i].user_id))
  //  .then(dispatch('dataActiveUser'))
      
  }


     
  },
  getters:{
    info: s=>s.info
  }
}