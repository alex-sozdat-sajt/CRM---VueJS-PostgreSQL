const http = require('http');
export default {
    actions:{
        async createCategory({commit}, {title, limit}){
					try {
						const uid = await dispatch('getUid')
					}catch (e){
						commit('setError', e)
						throw e
					}
        }
            
    }
}
