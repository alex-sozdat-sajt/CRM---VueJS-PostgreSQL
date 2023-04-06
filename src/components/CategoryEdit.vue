<template>
     <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>

            <form>
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
    select: null,
    categories: JSON.parse(localStorage.getItem('categoriesActiveUser')),
    // categories:[{'id':1, 'title': 'привет 1' },
    //               {'id':2, 'title': 'привет 2' },
    //               {'id':3, 'title': 'привет 3' },]
  }),
  watch:{
    current(value){
      const{expense_items, expense_limit} = this.categories.find(c => c.expense_items === value)
      console.log('current(value)', value)
       
        this.title = expense_items
        this.limit = expense_limit

      
    }
  },
  created(){
    const {expense_id, expense_items, expense_limit} = this.categories[0]
    console.log('expense_id, expense_items, expense_limit', expense_id, expense_items, expense_limit)
    this.current = expense_id
    this.title = expense_items
    this.limit = expense_limit
    
    

  },
  mounted(){
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