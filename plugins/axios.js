export default ({ $axios, error }, inject) => {
	inject('get', async (endpoint, main = false) => {
		try {
			const response = await $axios.$get(endpoint)

			return response
		} catch (err) {
			const message = err.response ? err.response : err
			const status = err.response && err.response.status ? err.response.status : 500

			console.log(message)

			if (main) {
				error({ code: status })
			}
      
			return false
		}
	})
  
	inject('post', async (endpoint, data, main = false) => {
		try {
			const response = await $axios.$post(endpoint, data)

			return response
		} catch (err) {
			const message = err.response ? err.response : err
			const status = err.response && err.response.status ? err.response.status : 500

			console.log(message)

			if (main) {
				error({ code: status })
			}
      
			return false
		}
	})
  
	inject('put', async (endpoint, data, main = false) => {
		try {
			const response = await $axios.$put(endpoint, data)

			return response
		} catch (err) {
			const message = err.response ? err.response : err
			const status = err.response && err.response.status ? err.response.status : 500

			console.log(message)

			if (main) {
				error({ code: status })
			}
      
			return false
		}
	})
  
	inject('delete', async (endpoint, main = false) => {
		try {
			const response = await $axios.$delete(endpoint)

			return response
		} catch (err) {
			const message = err.response ? err.response : err
			const status = err.response && err.response.status ? err.response.status : 500

			console.log(message)

			if (main) {
				error({ code: status })
			}
      
			return false
		}
	})
}