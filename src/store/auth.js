const http = require('http');
export default {
  state:{
    activeuser:'',
    dataActiveUsertoStorage:{}
  },
  
  mutations:{
    dataActiveUsertoStorage(state, dataActiveUsertoStorage){
      console.log('dataActiveUsertoStorage', dataActiveUsertoStorage)
      state.dataActiveUsertoStorage = dataActiveUsertoStorage
    },

    setActiveUser(state, payload){
      // state.activeuser = 'setItem(key, value)'
      console.log('CALL mutations setActiveUser', payload)
      state.activeuser = localStorage.getItem('ActiveUser')
      state.activeuser = payload
      
      console.log('state activeuser', state.activeuser )
    },
    clearActiveUser(state){
      console.log('state activeuser 1', state.activeuser)
      state.activeuser = ''
      console.log('state activeuser 2', state.activeuser)
    }
  },
actions:{
async login({dispatch, commit}, {email, password, thi}){
    try{
        console.log('email ', email)
        console.log('password ', password)
        localStorage.removeItem('ActiveUser')   
             const url = `http://localhost:8000/dataFromDb`;
             http.get(url, res =>{
                
              console.log('res.headers', res.headers);
              if (res.statusCode != 200){
                const {statusCode, statusMessage} = res;
                console.log(`Status Code: ${statusCode} ${statusMessage}`);
                return;
              }
              res.setEncoding('utf8');
              const lines = [];
              res.on('data', chunk => {
                lines.push(chunk);
                 
                });
                res.on('end', () => {
                const data = JSON.parse(lines.join())['rows'];
                console.log('dataFromDb', data)
                 
                check(data)  
              })
            })
            async function check(data){
                console.log('dataHttp check', data)
                 console.log('email ', email)
                 const router=function(){
                  thi.$router.push('/')
                 }
                for(let i=0; i < data.length; i++){
                       
                    if (email === data[i].e_mail1 && password === data[i].user_password){
                       console.log(`!!${email}!!`     ,data[i].e_mail1)
                       console.log(`ТАКОЙ емеил ${email}, есть, пароль верный Вы вошли`)
                       
                      //  const dataActiveUser = Object.assign({name, user_id, bill}, data[i]); 

                      const dataActiveUser  = data[i] 
                      const dataActiveUsertoStorage  = {...dataActiveUser, user_password: ''};
                      localStorage.setItem('dataActiveUsertoStorage', JSON.stringify(dataActiveUsertoStorage)) 
                      await commit('dataActiveUsertoStorage', dataActiveUsertoStorage)
                       
                      console.log('dataActiveUser', dataActiveUser)
                      console.log('dataActiveUsertoStrage', dataActiveUsertoStorage)
                      const aciveUser={
                        user_id: data[i].user_id,
                        user_status:'active'
                      }
                      
                      await fetch('http://localhost:8000/setactiveuser', {
                       method: 'POST',
                       headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                      },
                       
                      body: JSON.stringify(aciveUser)
                       
                    })
                    .then(commit('setActiveUser', aciveUser.user_id))
                    .then(console.log( 'setActiveUser', data[i].user_id))
                    .then(dispatch('dataActiveUser', aciveUser.user_id))
                    .then(router())

                     return false                              
                    } else{
                       console.log(`!!${email}!!`     ,data[i].e_mail1)
                    }
                        
                  }
                  alert(`ТАКОГО емеил ${email} нет -или не верный пароль`);
                   
                }
      
    }catch (e){
         commit('setError', e)
    }

},
async register({dispatch}, formData){
  try{
    console.log('formData ', formData)
   
    const uid = dispatch('getUid');
    console.log('РЕГИСТРАЦИЯ', uid)
    // uid пока не возвращается
    //здесь сделать запись в БД + 10000р начальное значение счета
    let chek_e_mail=(mail)=>{

      let data = dispatch('dataFromDb');
       console.log(' !!!!!!!!tdata!!!!!!!', data.length)
       console.log(' !!!!!!!!tdata!!!!!!!', data)
      //  console.log(' !!!!!!!!this.response_from_DB!!!!!!!', this.response_from_DB)
       console.log(' !!!!!!!!mail!!!!!!!', mail)
        for(let i=0; i < data.length; i++){
          
          if (mail === data[`${i}`].e_mail1){
             console.log(`!!${mail}!!`     ,data[`${i}`].e_mail1)
             console.log(`ТАКОЙ емеил ${mail} уже есть выберите другой`)
             alert(`ТАКОЙ емеил ${mail} уже есть выберите другой`);
                  
          } else{
             console.log(`!!${mail}!!`     ,data[`${i}`].e_mail1)
          }
              
        }
        alert(`ТАКОГО емеил ${mail} еще нет`);
        return true
       }
     if(chek_e_mail(formData.email)){
          console.log(JSON.stringify(formData))
        let response = await fetch('http://localhost:8000/crmadduser', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
         
      })
        .then(console.log('alert(`ЕМЕИЛ ЗАРЕГАН`);'))
      
      // this.$router.push('/')
      //  let result = await response;
    }
    


  }catch (e){
    console.log(e)
    commit('setError', e)
    throw e
  }
  //здесь сделать регистрацию логина и пароля в БД и создание таблицы для каждого пользователя

},
async getActiveUser({commit}){
  console.log('CALL action getActiveUser'); 
await fetch('http://localhost:8000/getActiveUser')
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log(' RESPONSE data action getActiveUser', data);
  commit('setActiveUser',  data[0].user_id)
  localStorage.setItem('ActiveUser', data[0].user_id);
  console.log('localStorage.setItem  data[0].user_id');
});
 
},
getUid(){
  //получение ID пользователя из БД
  const user = '000';
  return user ? user.uid : null;
},
async dataFromDb({dispatch, commit}){
  console.log('Вызван 2')
   
    const url = `http://localhost:8000/dataFromDb`;
    await  http.get(url, res =>{
         // console.log(res.req._header);
        console.dir('res.headers', res.headers);
        if (res.statusCode != 200){
          const {statusCode, statusMessage} = res;
          console.log(`Status Code: ${statusCode} ${statusMessage}`);
          return;
        }
        res.setEncoding('utf8');
        const lines = [];
        res.on('data', chunk => {
          lines.push(chunk);
           
          });
        res.on('end', () => {
          const data = JSON.parse(lines.join())['rows'];
           
           console.log('data2', data)
            return data
          //  this.response_from_DB = data;
          //  console.dir(' this.response_from_DB ',  this.response_from_DB);
          
          

        })
      })

},
async logout({commit}){
  console.log('LOGOUT')
      localStorage.removeItem('ActiveUser')
       await fetch('http://localhost:8000/deleteActiveUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
        },
        // body: JSON.stringify(id)
      }).then (commit('clearActiveUser'))
      .then (commit('clearInfo'))

   
  //здесь реализовать отчистку логина и пароля в памяти
}

},
getters: {
  activeuser(state){
    console.log('getters state.activeuser ', state.activeuser)
     
    return state.activeuser
  },
  dataActiveUsertoStorage(state){
    console.log('getters dataActiveUsertoStorage ', state.dataActiveUsertoStorage)
     
    return state.dataActiveUsertoStorage
  }
},

}