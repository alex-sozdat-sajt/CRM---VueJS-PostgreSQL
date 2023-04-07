<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if='loading' />
      <div v-else class="row">
        
        <CategoryCreate @created="addNewCaterory" />
        <CategoryEdit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
         />
         <p v-else class="center">Категорий пока нет</p>
        <a v-on:click="sendreq"
        class="waves-effect waves-light btn">fetchCategories</a>
         <a v-on:click="dataFromDb"
        class="waves-effect waves-light btn">dataFromDb</a>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '../components/app/Loader.vue'

export default {
  name: 'categories',
  data: () => ({
    categories:[],
    loading: false,
    updateCount: 0
  }),
  async mounted(){

    console.log('mounted fetchCategories', )
    await this.$store.dispatch('fetchCategories')
    this.loading = false
    console.log('mounted fetchCategories', JSON.parse(localStorage.getItem('categoriesActiveUser')))
    this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))

  },
  components:{
    CategoryCreate, CategoryEdit, 
     Loader
     
  },
  methods: {
    addNewCaterory(category){
      this.categories.push(category)
      console.log(this.categories[0])
    },
    updateCategories(category){
      const idx = this.categories.findIndex(c =>c.id = category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
       
    },
    sendreq(){
      
      this.categories =  this.$store.dispatch('fetchCategories')
    },
      async dataFromDb(){
    alert('dataFromDb')
      const res = await fetch(`http://localhost:8000/dataFromDb`)
      console.log('dataFromDb', res)
     return await res.json()
       
    },
     
    
  }
  
}
</script>