export default ({ $axios, error }, inject) => {
	const url = 'https://callmai-admin.herokuapp.com/api/v1'

	inject('get', async (endpoint, main = false) => {
		try {
			const response = await $axios.$get(url + endpoint)

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
			const response = await $axios.$post(url + endpoint, data)

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
			const response = await $axios.$put(url + endpoint, data)

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
  
	inject('remove', async (endpoint, main = false) => {
		try {
			const response = await $axios.$delete(url + endpoint)

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