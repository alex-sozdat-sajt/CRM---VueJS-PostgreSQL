<template>
      <div  >
    

    <main class="app-content">
      <div class="app-page">
  <Loader v-if="loading" />

<div  v-else-if="record">
  
  <div >
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{record[0].type === 'income' ? 'Доход' : 'Расход'}}
         
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card red"
        :class="{
        'red': record[0].record_type === 'outcome',
        'green': record[0].record_type === 'income'
        }">
          <div class="card-content white-text">
            <p>Описание: {{record[0].record_items}}</p>
            <p>Сумма: {{record[0].record_value | currency}}</p>
            <p>Категория:{{record.categoryName}}</p>

            <small>{{record[0].record_date | date('datetime')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p class="center" v-else>Запись с id = {{$route.params.id}} не найдена<p/>
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
// import Loader from "../components/app/Loader.vue"

export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
     
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
     console.log(' mounted record', record)
    const category = await this.$store.dispatch('fetchCategoryById', record[0].category_id)
     console.log(' category data', category)
    this.record = {
      ...record,
      categoryName: category[0].expense_items
    }
    //  this.record = null

    this.loading = false
     
  }
   
}
</script>