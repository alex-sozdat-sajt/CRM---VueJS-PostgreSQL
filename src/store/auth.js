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

}
}

}