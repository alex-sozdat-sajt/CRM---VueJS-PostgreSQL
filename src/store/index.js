import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import router from '../router'
import info from './info.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null 
    }
  },
  // 
  actions: {
async fetchCurrency(){
  // var myHeaders = new Headers();
  // myHeaders.append("apikey", "s0FBmhzljPBmwCE0hUiwXHSp7ZtdcuVo");
  
  // var requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow',
  //   headers: myHeaders
  // };
  
  //  const res = fetch("https://api.apilayer.com/exchangerates_data/convert?to=eur&from=rub&amount=1", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  //   return await jJSON.parse(res)
  //  const key = process.env.VUE_APP_FIXER
  // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`)
     return await res.json()

}
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  }
})
