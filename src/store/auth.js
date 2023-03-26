const http = require('http');
export default {
actions:{
async login({dispatch, commit}, {email, password}){
    try{
        console.log('email ', email)
        console.log('password ', password)
    
             const url = `http://localhost:8000/dataFromDb`;
             http.get(url, res =>{
                
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
                console.log('data1')
                 
                check(data)  
              })
            })
            function check(data){
                console.log('dataHttp check', data)
                 console.log('email ', email)
                for(let i=0; i < data.length; i++){
                       
                    if (email === data[i].e_mail1 && password === data[i].user_password){
                       console.log(`!!${email}!!`     ,data[i].e_mail1)
                       console.log(`ТАКОЙ емеил ${email}, есть, пароль верный Вы вошли`)





                        return false                              
                    } else{
                       console.log(`!!${email}!!`     ,data[i].e_mail1)
                    }
                        
                  }
                  console.log(`ТАКОГО емеил ${email} нет -или не верный пароль`);
                   
                }
      
    }catch (e){
        throw e
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
async logout(){
  await console.log('LOGOUT')
  //здесь реализовать отчистку логина и пароля в памяти
}

}

}