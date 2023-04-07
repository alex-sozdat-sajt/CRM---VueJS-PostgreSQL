const http = require('http');
export default {
	state: {
    categoriesActiveUser: ''
  },

	mutations:{
		createCategory(){
			
	},
	categoriesActiveUser(state, data){
		console.log('categoriesActiveUser', data)
	  state.categoriesActiveUser = data
	}

},
     actions:{
			async fetchCategories({dispatch, commit}){
				console.log('fetchCategoriesfetchCategoriesfetchCategoriesfetchCategories')
				const tablenamefromls = JSON.parse(localStorage.getItem('dataActiveUsertoStorage'))['expense'].toLowerCase()
				const tablename ={table_name:tablenamefromls}
				console.log('tablename',  JSON.stringify(tablename))
				try{
				const options = {
					hostname: 'localhost',
					port:  '8000',
					path: '/fetchCategories', 
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Content-Length': '',
					},
				};
				const req = http.request(options, (res) => {
					console.log(`STATUS: ${res.statusCode}`);
					console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
					res.setEncoding('utf8');
					res.on('data', (chunk) => {
						const data = JSON.parse(chunk)
						console.log('categories: ', data[0]);
						localStorage.setItem('categoriesActiveUser', JSON.stringify(data));
						// commit('setInfo', data.user_id)
						commit('categoriesActiveUser', data)
						return data
					});
					res.on('end', () => {
						console.log('No more data in response.');
					

					});
				});
				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
				// Write data to request body
				req.write(JSON.stringify(tablename));
				req.end();
				 
			}
			catch(e){
		
			}
			},
			async updateCategory({commit, dispatch}, categoryData){
				 	console.log('action updateCategory', categoryData)
				try {
					await fetch('http://localhost:8000/updateCategory', {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
					 },
					 body: JSON.stringify(categoryData)
				 })
				 this.$message('Категория успешно обновлена')
				}catch (e){
					commit('setError', e)
					throw e
				}		
				
				dispatch('fetchCategories')
			},

			
			async createCategory({store, commit, dispatch}, category){
					try {
						console.log('createCategory category', category)
						console.log('reLoadFromLocalStorageDataActiveUsertoStorage', this.getters.reLoadFromLocalStorageDataActiveUsertoStorage)
						const categoryTableName = this.getters.reLoadFromLocalStorageDataActiveUsertoStorage['expense']
						console.log('categoryTableName', typeof(categoryTableName))
						category.expense = categoryTableName.toLowerCase()
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
            
    },
		getters:{
			categoriesActiveUser_g(state){
				 
					return state.categoriesActiveUser
			 
			}

		}
}
