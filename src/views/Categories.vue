<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if='loading' />
      <div v-else class="row">
        
        <CategoryCreate @created="addNewCaterory" />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
// import Loader from '../components/app/Loader.vue'

export default {
  name: 'categories',
  data: () => ({
    categories:[],
    loading: false
  }),
  async mounted(){
     console.log('mounted fetchCategories', )
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    console.log('mounted fetchCategories', )

  },
  components:{
    CategoryCreate, CategoryEdit, 
    // Loader
     
  },
  methods: {
    addNewCaterory(category){
      this.categories.push(category)
      console.log(this.categories[0])
    }
  }
  
}
</script>