const http = require('http');
export default {
    actions: {
        async canCreateRecord({commit, dispatch}, record){
     try{

     }  catch(e){  
        commit('setError', e)
        throw e
      }     
    }
}
}