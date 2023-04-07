<template>
     <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
              <div class="input-field" >
                <select v-model='current'
                ref="select">
                  <option
                  v-for="c of categories"
                  :key="c.expense_id"
                  :value="c.expense_items"
                  >{{c.expense_items}}</option>
                </select>
                <label>Выберите категорию</label>
              </div>

              <div class="input-field">
                <input v-model="title" type="text" id="name">
                <label for="name">Название</label>
                <span class="helper-text invalid">TITLE</span>
              </div>

              <div class="input-field">
                <input v-model="limit"
                    id="limit"
                    type="number"
                >
                <label for="limit">Лимит</label>
                <span class="helper-text invalid">LIMIT</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
</template>
<script>
export default {
  // props:{
    // categories:{
    //   type: Array,
    //   required: true,
       
    // }
  // },
  data: () => ({
    current: null,
    title:'',
    limit: 10,
    id:'',
    select: null,
    categories: JSON.parse(localStorage.getItem('categoriesActiveUser')),
  }),
  watch:{
    current(value){
      console.log('this.categories', this.categories)
        console.log('this.categories.expense_items', this.categories[0]['expense_items'])
      console.log('this.categories value', value)
      for(let i=0;i<this.categories.length; i++){
          if(this.categories[i]['expense_items'] === value){
             this.title = this.categories[i]['expense_items']
             this.limit = this.categories[i]['expense_limit']
         }
      }

      // const{expense_items, expense_limit} = this.categories.find(c => c.expense_items === value)
      // console.log('current(value)', value)
      //   this.title = expense_items
      //   this.limit = expense_limit
    }
  },
  created(){
    
    this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))
    this.current = this.categories[0]['expense_items']
    this.id = this.categories[0]['expense_id']
    this.title = this.categories[0]['expense_items']
    this.limit = this.categories[0]['expense_limit']
  },
  methods:{
    updatethiscategoriesfromLS(){
    console.log('!!!!!!!!!!updatethiscategoriesfromLS!!!!!!!!!!!!!!!!!!')
    this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))
    this.current = this.categories[0]['expense_items']
    this.id = this.categories[0]['expense_id']
    this.title = this.categories[0]['expense_items']
    this.limit = this.categories[0]['expense_limit']
    },
    async submitHandler(){
      
      // if(this.$v.$invalid){
      //   this.$v.$touch()
      //   return
      // }
      try {
        console.log('categoryData')
       const categoryData = {
         expense_idf: this.id,
         expense_itemsf: this.title,
         expense_limitf: this.limit,
         expense_user_tablef: JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense'].toLowerCase()
        }
         console.log('categoryData', categoryData.expense_user_tablef)
         console.log('this.categories', this.categories[1]['expense_id'])

                                    
        await this.$store.dispatch('updateCategory', categoryData)
        this.updatethiscategoriesfromLS()
        this.$emit('updated', categoryData)
      
      }catch(e){}
    }
  },
  mounted(){
   console.log('this.categories LLL', M.FormSelect.init(this.$refs.select))
    this.select = M.FormSelect.init(this.$refs.select);
    // this.categories = JSON.parse(localStorage.getItem('categoriesActiveUser'))
    // console.log('mounted this.categories', this.categories)
  },
  destroyed(){
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>