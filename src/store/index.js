import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		base64Image: '',
		userInformation: null,
		pagination: {
			page: 1,
			page_size: 10,
			page_length: null
		}
	},
	getters: {
		getUser: (state) => state.userInformation,
		model: (state) => state.model
	},
	mutations: {},
	actions: {},
	modules: {}
})
