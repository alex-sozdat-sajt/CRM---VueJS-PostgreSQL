const http = require('http');
export default {

	mutation:{
		createCategory(){
			
	},
},
     actions:{
			async fetchCategories({commit, dispatch}){	
			
        let response = await fetch('http://localhost:8000/fetchCategories', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify('alex_3_14')
         
      })
        .then(console.log('alert(`ЕМЕИЛ ЗАРЕГАН`);'))

		// async fetchCategories({commit, dispatch}){	
		// 		// const data = localStorage.getItem('dataActiveUsertoStorage')
		// 		const data = { username: "example" };
		// 		try {
		// 			const response = await fetch("http://localhost:8000/fetchCategories", {
		// 				method: "POST", // or 'PUT'
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify(data),
		// 			});
			
		// 			const result = await response.json();
		// 			console.log("Success:", result);
		// 		} catch (error) {
		// 			console.error("Error:", error);
		// 		}
			 
			
			// const url = `http://localhost:8000/fetchCategories`;
			// await  http.get(url, res =>{
			// 		 // console.log(res.req._header);
			// 		console.dir('res.headers', res.headers);
			// 		if (res.statusCode != 200){
			// 			const {statusCode, statusMessage} = res;
			// 			console.log(`Status Code: ${statusCode} ${statusMessage}`);
			// 			return;
			// 		}
			// 		res.setEncoding('utf8');
			// 		const lines = [];
			// 		res.on('data', chunk => {
			// 			lines.push(chunk);
						 
			// 			});
			// 		res.on('end', () => {
			// 			const data = JSON.parse(lines.join());
						 
			// 			 console.log('data2', data)
			// 				return data
						//  this.response_from_DB = data;
						//  console.dir(' this.response_from_DB ',  this.response_from_DB);
						
						
	
				// 	})
				// })

					// const url = `http://localhost:8000/fetchCategories`;
			// const postData = JSON.stringify({
			// 	msg: 'Hello World!',
			//   });
			  
			//   const options = {
			// 	hostname: 'localhost',
			// 	port: 8000,
			// 	path: '/fetchCategories',
			// 	method: 'POST',
			// 	headers: {
			// 	  'Content-Type': 'application/json',
			// 	  'Content-Length': Buffer.byteLength(postData),
			// 	},
			//   };
			  
			//   const req = http.request(options, (res) => {
			// 	console.log(`STATUS: ${res.statusCode}`);
			// 	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
			// 	res.setEncoding('utf8');
			// 	res.on('data', (chunk) => {
			// 	  console.log(`BODY: ${chunk}`);
			// 	});
			// 	res.on('end', () => {
			// 	  console.log('No more data in response.');
			// 	});
			//   });
			  
			//   req.on('error', (e) => {
			// 	console.error(`problem with request: ${e.message}`);
			//   });
			  
			//   // Write data to request body
			//   req.write(postData);
			//   req.end();
		
	// 		async fetchCategories({commit, dispatch}){																					  
	// 			const nameofexpenseTable = JSON.parse((localStorage.getItem('dataActiveUsertoStorage')))['expense'].toLowerCase()  
	// 			console.log('actions nameofexpenseTable', nameofexpenseTable)
	// 			await fetch('http://localhost:8000/fetchCategories', {
    //      method: 'POST',
    //      headers: {
    //        'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     // body: JSON.stringify(nameofexpenseTable) 
	// 	body: 'alex_3_14' 
    //   })
	//   .then((response) => {
	// 	return response.json();
	//   })
	//   .then((data) => {
	// 	console.log(data);
	//   });  
	//   .then((response) => {console.log(response.body)});
	  	
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
