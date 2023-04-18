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
       {{cat.spend | currency}} из {{cat.expense_limit | currency}}
      </p> 
      <div class="progress" v-tooltip="cat.tooltip"
       
      >
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent+'%'}"
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
import currencyFilter from '@/filters/currency.filter'
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
  // const records = await this.$store.dispatch('fetchRecords')
  // const categories = await this.$store.dispatch('fetchCategories')
  const categories = JSON.parse(localStorage.getItem('categoriesActiveUser'));
  
   
  this.categories = categories.map(cat => {
    const spend = cat.expense_limit - cat.remains
     
     const percent = spend/cat.expense_limit * 100
     const progressPercent = percent > 100 ? 100 : percent
     const progressColor = percent < 60
     ? 'green'
     : percent < 100
      ? 'yellow'
      : 'red'
       console.log('categories spend', cat, spend, progressColor)
  const tooltipValue = cat.expense_limit - spend;
  const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
  return {
      ...cat,
      progressPercent,
      progressColor,
      spend,
      tooltip
    }


  })

   console.log('this.categories ', this.categories)

  this.loading = false
  }
}
</script>