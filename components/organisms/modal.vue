<template>
  <div class="modal__wrapper">
    <div class="modal">
      <div class="modal__header">
        <h4>{{ title }}</h4>

        <button
          @click="close"
          aria-label="Close modal"
        >
          <icon icon="times" />
        </button>
      </div>
      <div class="modal__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: [
		'title' 
	],
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>