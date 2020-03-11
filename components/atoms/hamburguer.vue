<template>
  <button
    ref="hamburguer"
    @click.stop="open"
    id="hamburguer"
    class="hamburguer"
  >
    <span class="hamburguer__line" />
    <span class="hamburguer__line" />
    <span class="hamburguer__line" />
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
		open() {
			this.TOGGLE_SIDEBAR(true)
		}
	}
}
</script>