const http = require('http');
export default {
  state: {
    info: {}
  },
  mutations:{
    setInfo(state, info){
      state.info = info
       
      console.log('setInfo',  info)
    },
    clearInfo(state){
      state.info={}
      console.log('clearInfo', state.info)
    },
    reLoadFromLocalStorageDataActiveUsertoStorage(state, data){
      console.log('reLoadFromLocalStorageDataActiveUsertoStorageState', data)
      state.dataActiveUsertoStorage = data
     }

  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate){
      // updatedataActiveUser
      // у пользователя поменяется остаток на счете после поступления или расхода
      try{

      }catch(e){
        commit
      }

    },
    async fetchinfo({dispatch, commit}){
        const uid = await dispatch('getActiveUser')
    },
   
  async dataActiveUser({dispatch, commit}, user_id){
    //получение данных пользователя из БД
    try{
     
    const postData = JSON.stringify({
      user_id: user_id,
    });
    console.log('dispatch dataActiveUserdataActiveUserdataActiveUser', postData)
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: '/dataActiveUser', 
      // url: 'http://localhost:8000/dataActiveUser',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
       
    };
    
    const req = http.request(options, (res) => {
       
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        const data = JSON.parse(chunk)
        console.log('BODY: ', data[0]);
        commit('setInfo', data.user_id)
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // Write data to request body
    req.write(postData);
    req.end();
  }
  catch(e){

  }
  },
  reLoadFromLocalStorageDataActiveUsertoStorage({commit}){
    const reLoadFromLocalStorageDataActiveUsertoStorage = JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))
    console.log('reLoadFromLocalStorageDataActiveUsertoStorage', reLoadFromLocalStorageDataActiveUsertoStorage)
  commit('reLoadFromLocalStorageDataActiveUsertoStorage', reLoadFromLocalStorageDataActiveUsertoStorage) 
  }

     
  },
  getters:{
    // info: s=>s.info
    info(state){
      return state.info
    },
    reLoadFromLocalStorageDataActiveUsertoStorage(state){
      console.log(' state.reLoadFromLocalStorageDataActiveUsertoStorage',  state.dataActiveUsertoStorage)
      return state.dataActiveUsertoStorage
    }
     
  }
}