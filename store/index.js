export const state = () => ({
	loggedIn: false,
	user: {},
	strategy: 'local',
	sidebar: false,
	settings: false
})

export const mutations = {
	TOGGLE_SIDEBAR(state, value) {
		if (value !== undefined) {
			state.sidebar = value
			return
		}

		state.sidebar = !state.sidebar
	},
	TOGGLE_SETTINGS(state, value) {
		if (value !== undefined) {
			state.settings = value
			return
		}

		state.settings = !state.settings
	},
	CLEAR(state) {
		state.sidebar = false
		state.settings = false
	}
}

export const actions = {
	TOGGLE_SIDEBAR({
		commit
	}, value) {
		commit('TOGGLE_SIDEBAR', value)
	},
	TOGGLE_SETTINGS({
		commit
	}, value) {
		commit('TOGGLE_SETTINGS', value)
	},
	CLEAR({
		commit 
	}) {
		commit('CLEAR')
	}
}

export const getters = {
	loggedIn: state => state.loggedIn,
	user: state => state.user,
	sidebar: state => state.sidebar,
	settings: state => state.settings
}