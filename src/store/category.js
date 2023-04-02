const http = require('http');
export default {

	mutation:{
		createCategory(){
			
	},
},
    actions:{
			async fetchCategories({commit, dispatch}){																					  
			  
				const expenseTable = (localStorage.getItem('dataActiveUsertoStorage'))
				// ['expense'].toLowerCase()  
				 
				console.log('actions expenseTable', expenseTable)
				
				await fetch('http://localhost:8000/fetchCategories', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
        body: 'alex_3_14'
      })
        .then(console.log('Данные получены'))
			},
        async createCategory({store, commit, dispatch}, category){
					try {
						console.log('createCategory category', category)
						console.log('reLoadFromLocalStorageDataActiveUsertoStorage', this.getters.reLoadFromLocalStorageDataActiveUsertoStorage)
						const categoryTableName = this.getters.reLoadFromLocalStorageDataActiveUsertoStorage['expense']
						category.expense = categoryTableName
						console.log('category', category)
						// const uid = await dispatch('getUid')
						await fetch('http://localhost:8000/addCategory', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json;charset=utf-8'
						 },
							
						 body: JSON.stringify(category)
							
					 })
						 

						
					}catch (e){
						commit('setError', e)
						throw e
					}
        }
            
    }
}
