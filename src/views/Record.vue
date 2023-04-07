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

  <form class="form" v-else>
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
      <span class="helper-text invalid">amount пароль</span>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
           class="{invalid: $v.title.$dirty && !$v.title.required}"
      >
      <label for="description">Описание</label>
      <span
            class="helper-text invalid">description пароль</span>
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
  computed:{
    categoriesActiveUser_c () {
     
    return this.$store.getters.categoriesActiveUser_g
  }
  },
  async mounted(){
     
    await this.$store.dispatch('fetchCategories')
    this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))
    console.log('this.categories', this.categories)
    this.loading = false
    console.log('M.FormSelect.init(this.$refs.select', M.FormSelect.init(this.$refs.select))
    setTimeout(()=>{this.select =  M.FormSelect.init(this.$refs.select)},0)
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