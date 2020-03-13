<template>
  <div class="toggle">
    <p class="toggle__text">
      {{ label }}
    </p>

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
			type: Number,
			default: 0
		},
		label: {
			type: String,
			default: null
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
			this.$emit('input', value ? 1 : 0)
		}
	}
}
</script>