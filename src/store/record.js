const http = require('http');
export default {
    actions: {
        async addRecord({commit, dispatch}, recordData){
         console.log('canCreateRecord action ', recordData)
     try {
       await fetch('http://localhost:8000/addRecord', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(recordData)
      }).then(response => {console.log('response.json()', response.json())})
      .then(dispatch('dataActiveUser', recordData.user_id))
      this.$message('Запись успешно добавлена')
     }catch (e){
       commit('setError', e)
       throw e
     }		
     
    //  dispatch('fetchCategories')
      
    }
}
}