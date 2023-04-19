<template>
    <div>
    

    <main class="app-content">
      <div class="app-page">

<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <section>
   <HistoryTable />
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
import HistoryTable from '@/components/HistoryTable'
export default {
  name: 'history',
  data:()=>({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted(){

//  const records = await this.$store.dispatch('fetchRecords')
 const records = JSON.parse(localStorage.getItem('RecordsActiveUser'))
 console.log('records', records)
// console.log('this.records', this.records)
 
// const categories = await this.$store.dispatch('fetchCategories')
this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'));
this.records = records.map(record =>{
  return {
    ...record,
    categoryName: this.categories.find(c => c.id === record.category_id).record_items,
    typeClass: record.type === 'income' ? 'green' : 'red',
    typeText: record.type === 'income' ? 'Доход' : 'Расход',

  }
  
    
})
  console.log('this.records', this.records)
  },
  components: {
    HistoryTable

  }
}
</script>