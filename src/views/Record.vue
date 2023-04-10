<template>
     <div>
    

    <main class="app-content">
      <div class="app-page">

<div>
  <div class="page-title">

    <h3>Новая запись</h3>
  </div>
  <Loader  v-if='loading'/>
  <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить новую категорию</router-link></p>

  <form class="form" v-else @submit.prevent="handleSubmit">
    <div class="input-field" >
      <select 
       ref="select" v-model="category">
        <option
        v-for="cat in categories"
        :key="cat.expense_id"
        :value="cat.expense_id"
        > {{cat.expense_items}}
        </option>
      </select>
      <label>Выберите категорию</label>
    </div>
    <h3>Новая запись</h3>
    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
             v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
         
      >
      <label for="amount">Сумма</label>
      
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
           
      >
      <label for="description">Описание</label>
            <span 
                     
               
                >Введите описание</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>

</div>
</main>

<div class="fixed-action-btn">
  <a class="btn-floating btn-large blue" href="#">
    <i class="large material-icons">add</i>
  </a>
</div>
</div>
</template>
<script>
 import {required, minValue} from 'vuelidate/lib/validators'
 import {mapGetters} from 'vuex'
import Loader from '../components/app/Loader.vue'
export default {
  name: 'record', 
  data:()=>({
    loading: false,
    select:null,
    categories:JSON.parse(localStorage.getItem('categoriesActiveUser')),
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  
  methods:{
   async handleSubmit(){
      // console.log(this.$v.limit)
        // if(this.$v.$invalid){
        //   this.$v.$touch()
        //   return 
        // }
          
         if(this.canCreateRecord){
         
          try{
             const recordData = {
              categoryId: this.category, 
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON(),
              recordTableName: 'record_'+JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense'],
              DataTableName: JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense'],
              email: JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['e_mail1'],
              bill: JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['bill'],
               
            }
             console.log('canCreateRecord ', recordData)
           await this.$store.dispatch('addRecord', recordData)
            const bill = this.type === 'income'
            ? this.reLoadFromLocalStorageDataActiveUsertoStorage.bill + this.amount
            : this.info.bill - this.amount
            //далее обновление счета в базе данных
            await this.$store.dispatch('updateInfo', {bill})
            this.$message('Запись успешно создана')
            this.$v.reset() //очистка полей формы
            this.amount = 1
            this.description = ''

          }catch(e){  }
            console.log('Запись успешно создана')
            
    } else {
       this.$message(`Недостаточно средст на счете (${this.amount - this.reLoadFromLocalStorageDataActiveUsertoStorage.bill})`)
     
    }
    }
      

    
    
  },
  computed:{ 
    ...mapGetters(['reLoadFromLocalStorageDataActiveUsertoStorage']),
    categoriesActiveUser_c () {
     
    return this.$store.getters.categoriesActiveUser_g
  },
  canCreateRecord(){
    if(this.type === 'income'){return true}
    return this.reLoadFromLocalStorageDataActiveUsertoStorage.bill >=this.amount
  },
  },
  async mounted(){
     
    await this.$store.dispatch('fetchCategories')
    this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))
    console.log('this.categories', this.categories)
    this.loading = false
    console.log('M.FormSelect.init(this.$refs.select', M.FormSelect.init(this.$refs.select))
    setTimeout(()=>{this.select =  M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
    },0)
    if(this.categories.length){
      this.category = this.categories[0].expense_id
    }
  },
   destroyed(){
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
   components:{
     
     Loader
     
  },
}
</script>