import Vue from 'vue'

let id = 0
  
Vue.mixin({
	beforeCreate() {
		this.key = id.toString()
		id += 1
	}
})