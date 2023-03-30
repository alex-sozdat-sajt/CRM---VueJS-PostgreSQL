const http = require('http');
export default {
  state:{
    activeuser:'' 
     
  },
  getters: {
    activeuser(state){
      console.log('getters state.activeuser ', state.activeuser)
       
      return state.activeuser
    }
  },
  mutations:{
    setActiveUser(state, payload){
      state.activeuser = ''
      state.activeuser = payload
      console.log('setActiveUser', payload)
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
    // if(state.activeuser){
    //   alert("Активный пользователь уже есть")
    // }
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
                console.log('data1')
                 
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
    // const formData={
    //   user_id: this.email+this.password.length+this.name,
    //   password: this.password,
    //   name: this.name,
    //   email: this.email,

    // };
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
    
       await fetch('http://localhost:8000/deleteActiveUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
        },
        // body: JSON.stringify(id)
      }).then (commit('clearActiveUser'))

   
  //здесь реализовать отчистку логина и пароля в памяти
}

},
 

}