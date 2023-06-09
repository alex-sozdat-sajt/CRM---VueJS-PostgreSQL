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
     // .then(dispatch('dataActiveUser', recordData.user_id))
     // this.$message('Запись успешно добавлена')
     }catch (e){
       commit('setError', e)
       throw e
     }		
     
    //  dispatch('fetchCategories')
      
    },
    async fetchRecords({commit, dispatch}){
      const headers = {
        'Content-Type': 'application/json'
      }
      // const body1 = {user_url: '3@mail.ru3Olega'}
      const body = {record_table: 'record_'+JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense']}
       console.log( 'body ', body)
       const response = await fetch('http://localhost:8000/fetchRecords',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
       })
       const data = await  response.json()
       console.log('data', data)
      //  localStorage.removeItem('dataActiveUsertoStorage');
       localStorage.setItem('RecordsActiveUser', JSON.stringify(data));
       return data
    },
    async fetchRecordById({commit, dispatch}, id){
      const headers = {
        'Content-Type': 'application/json'
      }
      // const body1 = {user_url: '3@mail.ru3Olega'}
      const body={}
       body.record_table = 'record_'+JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense'];
       body.record_id = id;
       console.log( 'body ', body)
       const response = await fetch('http://localhost:8000/fetchRecordById',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
       })
       const data = await  response.json()
       console.log('data', data)
      //  localStorage.removeItem('dataActiveUsertoStorage');
      //  localStorage.setItem('RecordsActiveUser', JSON.stringify(data));
       return data
    },
}
}