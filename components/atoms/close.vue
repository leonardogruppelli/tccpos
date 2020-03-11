<template>
  <button
    @click="close"
    class="close"
  >
    <span class="close__line" />
    <span class="close__line" />
  </button>
</template>

<script>
import {
	mapActions 
} from 'vuex'

export default {
	methods: {
		...mapActions([
			'TOGGLE_SIDEBAR'
		]),
		close() {
			this.TOGGLE_SIDEBAR(false)
		}
	}
}
</script>