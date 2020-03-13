<template>
  <button
    class="knob"
    :class="status"
  >
    <icon
      v-if="icon"
      :icon="icon"
      class="knob__icon"
    />
    
    <span class="knob__title">{{ title }}</span>

    <span class="knob__spinner">
      <icon
        icon="spinner"
        class="loading"
      />
    </span>
  </button>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null
		},
		background: {
			type: String,
			default: 'primary'
		},
		icon: {
			type: String,
			default: null
		},
		flat: {
			type: Boolean,
			default: false
		},
		full: {
			type: Boolean,
			default: false
		},
		center: {
			type: Boolean,
			default: false
		},
		right: {
			type: Boolean,
			default: false
		},
		noMargin: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		status() {
			return [
				!this.title && this.icon && 'knob--rounded',
				this.flat && 'knob--flat',
				this.full && 'knob--full',
				this.center && 'knob--center',
				this.right && 'knob--right',
				this.noMargin && 'knob--no-margin',
				this.loading && 'knob--loading',
				`bg-${this.background}`
			]
		}
	}
}
</script>