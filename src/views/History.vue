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
<Loader v-if="loading"/>
<p class="center" v-else-if="!records.length">Записей пока нет</p>
  <section v-else> 
   <HistoryTable :records="records" />
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
//  console.log('records', records)
// console.log('this.records', this.records)
 
// const categories = await this.$store.dispatch('fetchCategories')
this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'));
 console.log('this.categories', this.categories)
 console.log('records', records)
 const recordstoTable=[]
 for(let i=0; i<records.length; i++){
    console.log('records', records[i])
      for(let j=0; j<this.categories.length; j++){
            console.log('this.categories', this.categories[j])
            if(records[i].category_id === this.categories[j].expense_id){
              console.log('this.cat!!!!!!!!!!!!!!!!!!!!!!egories')
              records[i].categoryName = this.categories[j].expense_items
              records[i].typeClass =  records[i].type === 'income' ? 'green' : 'red'
              records[i].typeText =  records[i].type === 'income' ? 'Доход' : 'Расход'
              
            }
     
      }
  }
this.records = records;
this.loading = false;
// this.records = records.map(record =>{
  // for(let i=1; i<this.categories.length; i++){
  //   if(record.category_id === this.categories[i].expense_id){
  //   console.log('=========', record)
  //    recordstoTable.push(record)
  //   }
    
  // }

    // this.categories.find(c => c.expense_id === record.category_id)
  //  console.log('categories.find', this.categories.find(c => c.expense_id === record.category_id))
  //  console.log('this.records.record_items,', this.records)
  // return {
    // recordstoTable,
    // recordCategory_id: record.category_id,
    //  ...record,
    //  categoryName: this.categories.find(c => c.expense_id === record.category_id).record_items,
    //  categoryName: this.categories.find(c => c.expense_id === record.category_id),
    
    // typeClass: record.type === 'income' ? 'green' : 'red',
    // typeText: record.type === 'income' ? 'Доход' : 'Расход',

  // }
  
// })

  console.log('this.records 1', records)
   
  },
  components: {
    HistoryTable

  }
}
</script>