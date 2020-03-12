<template>
  <div class="toggle">
    <label
      class="toggle__label"
      :class="status"
    >
      <input
        :checked="value"
        @change="update($event.target.checked)"
        type="checkbox"
        class="toggle__input"
      >
      
      <span class="toggle__circle" />
    </label>
  </div>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		status() {
			return {
				'toggle__label--active': this.value
			} 
		}
	},
	methods: {
		update(value) {
			this.$emit('input', value)
		}
	}
}
</script>