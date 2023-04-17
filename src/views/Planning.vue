<template>
    <div>
    

    <main class="app-content">
      <div class="app-page">


<div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{bill | currency('RUB')}}</h4>
  </div>
    <Loader v-if="loading"/>
      <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить новую категорию</router-link></p>

  <section v-else>
      <div v-for="cat of categories" :key="cat.expense_id">
      <p>
        <strong>{{cat.expense_items}}</strong>
       10 из {{cat.expense_limit}}
      </p> 
      <div class="progress" >
        <div
            class="determinate green"
            :class=[cat.progressColor]
            style="width:40%"
        ></div>
      </div>
    </div>
  </section>
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
import {mapGetters} from 'vuex'
export default {
  name: 'planing',
  data: () => ({
    loading: true,
    categories:[],
    bill: JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['bill'],

  }),
  computed: {
    //...mapGetters('info')
  },
  async mounted() {
  const records = await this.$store.dispatch('fetchRecords')
  // const categories = await this.$store.dispatch('fetchCategories')
  this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'));
  // const categories = JSON.parse(localStorage.getItem('categoriesActiveUser'));
  // this.categories = categories.map(cat => {
  //   .filter(r => )
  // })

    console.log('this.categories ', this.categories)

  this.loading = false
  }
}
</script>