const http = require('http');
export default {
  state: {
    info: {}
  },
  mutations:{
    setInfo(state, info){
      state.info = info[0]
      console.log('setInfo',  state.info)
    },
    clearInfo(state){
      state.info={}
      console.log('clearInfo', state.info)
    }
  },
  actions: {
    async fetchinfo({dispatch, commit}){
        const uid = await dispatch('getActiveUser')
    },
   
  async dataActiveUser({dispatch, commit}, user_id){
    try{
    console.log('dispatch dataActiveUserdataActiveUserdataActiveUser')
    const postData = JSON.stringify({
      user_id: user_id,
    });
   
    const options = {
      hostname: 'localhost:8000',
      // port: 80,
      path: '/dataActiveUser', 
      // url: 'http://localhost:8000/dataActiveUser',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    
    const req = http.request('http://localhost:8000/dataActiveUser', (res) => {
       
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
  }


     
  },
  getters:{
    // info: s=>s.info
    info(state){
      return state.info
    }
     
  }
}