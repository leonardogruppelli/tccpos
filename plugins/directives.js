import Vue from 'vue'

Vue.directive('blur', {
	bind: function(el, binding, vnode) {
		el.clickout = function (event) {
			if (!(el == event.target || el.contains(event.target))) {
				vnode.context[binding.expression](event)
			}
		}
    
		document.addEventListener('click', el.clickout)
	},
	unbind: function(el) {
		document.removeEventListener('click', el.clickout)
	}
})