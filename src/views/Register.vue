<template>
    <div>


<form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
        <input
            id="email"
            type="text"
             v-model.trim="email"
             :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
         class="helper-text invalid"
         v-if="$v.email.$dirty && !$v.email.required"
         >Поле Email не должно быть пустымы</small>
         <small
         class="helper-text invalid"
         v-else-if="$v.email.$dirty && !$v.email.email"
         >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim = "password"
             :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
         class="helper-text invalid"
         v-if="$v.password.$dirty && !$v.password.required"
         >Введите пароль</small>
          <small
         class="helper-text invalid"
         v-else-if="$v.password.$dirty && !$v.password.minLength"
         >Пароль должен быть  2 символов. Сейчас он {{password.length}}</small>
      </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
           v-model.trim="name"
           :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="name">Имя</label>
      <small
       class="helper-text invalid"
       v-if="$v.name.$dirty && !$v.name.required"
       >Введите ваше имя</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model ="agree"/>
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>
     

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
           <thead>
          <tr>
            <th class="text-left">
             user_id
            </th>
            <th class="text-left">
             name
            </th>
            <th class="text-left">
             user_password
            </th>
            <th class="text-left">
            e_mail
            </th>
             
          </tr>
        </thead>
         <tbody>
        <tr
          v-for="item in response_from_DB"
          :key="item.name"
        >
          <td> {{item.user_id}} </td>
          <td> {{item.name}} </td>
          <td> {{item.user_password}} </td>
          <td> {{item.e_mail1}} </td>
          
            
         
        </tr>
      </tbody>
        </div>
        <div class="card-action">
         <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
           @click="dataFromDb"
      >
        Получить данные
        <i class="material-icons right">send</i>
      </button>
    </div>
    <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
           @click="deletFromDb"
      >
        Удалить все из базы
        <i class="material-icons right">send</i>
      </button>
    </div>
        </div>
      </div>
    </div>
   
</div>
</template>
<script>
const http = require('http');
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: ()=>({

    email: '',
    password: '',
    name: '',
    agree: false,
    response_from_DB:[],

  }),
  validations:{
    email:{email, required},
    password: {required, minLength: minLength(3)},
    name: {required},
    agree: {checked: v => v}
  },
  methods:{
    async submitHandler(){

      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      
      const formData={
        user_id: this.email+this.password.length+this.name,
        password: this.password,
        name: this.name,
        email: this.email,

      };
       
      console.log('formData ', formData)
      let chek_e_mail=(mail)=>{
        let data = this.response_from_DB
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
       if(chek_e_mail(this.email)){
            console.log(JSON.stringify(formData))
          let response = await fetch('http://localhost:8000/crmadduser', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(formData)
           
        })
          .then(console.log('alert(`ЕМЕИЛ ЗАРЕГАН`);'))
        //.then(this.dataFromDb())
        // this.$router.push('/')
         let result = await response;
      }
       // this.dataFromDb(); //функция не срабатывает потому что исполняется быстрее нежели изменения дойдут до таблицы
         
         
        
        
    },
    //  chek_e_mail(mail){
    //    console.log('mail', mail);
       
    //    for(let i=0; i <= this.response_from_DB.length; i++){
    //         console.log(`data[${i}].e_mail1` , this.response_from_DB[`${i}`].e_mail1);
    //         if (mail == this.response_from_DB[`${i}`].e_mail1){
    //            console.log('ТАКОЙ емеил уже есть выберите другой')
    //            alert('ТАКОЙ емеил уже есть выберите другой');
    //            return false
    //         }else{
    //           return true
    //         }
    //       }
    //  },      
    dataFromDb(){
     
      this.reqest_button_name='todo'; 
        this.var='';
        this.var_req_to_db='';
        const url = `http://localhost:8000/dataFromDb`;
      http.get(url, res =>{
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
          // console.log('lines', lines)
          });
        res.on('end', () => {
          const data = JSON.parse(lines.join())['rows'];
          // console.table(data)
           console.log('data', data)
         
           this.response_from_DB = data;
            console.dir(' this.response_from_DB ',  this.response_from_DB);
          //  console.log('data[5]e_mail1', data[5].e_mail1);
          //  for(let i=0; i <= data.length; i++){
          //   console.log(`data[${i}].e_mail1` , data[`${i}`].e_mail1);
          //  }
          

        })
      })
    },
     
    async deletFromDb(){
      console.log('Delete')
        let id = {id: this.todo_id_delet};
          console.log('id from form', id)
        let response = await fetch('http://localhost:8000/todoDeletAll', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
          },
          // body: JSON.stringify(id)
        }).then(this.dataFromDb())
    }
  }
}

// chek_e_mail=(this.email)=>{
//        console.log('mail', mail);
       
//        for(let i=0; i <= this.response_from_DB.length; i++){
//             console.log(`data[${i}].e_mail1` , this.response_from_DB[`${i}`].e_mail1);
//             if (mail == this.response_from_DB[`${i}`].e_mail1){
//                console.log('ТАКОЙ емеил уже есть выберите другой')
//                alert('ТАКОЙ емеил уже есть выберите другой');
//                return false
//             }else{
//               return true
//             }
//           }
//     }
</script>

 