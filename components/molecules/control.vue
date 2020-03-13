<template>
  <div class="control">
    <div
      ref="wrapper"
      @click="focus(true)"
      @focus="focus(true, true)"
      class="control__wrapper"
      tabindex="0"
    >
      <label class="control__label">
        <input
          v-if="mask"
          ref="input"
          @input="update($event.target.value)"
          :type="type"
          :value="value"
          v-mask="mask"
          class="control__input"
          :class="{...classes, ...status}"
        >

        <input
          v-else
          ref="input"
          @input="update($event.target.value)"
          :type="type"
          :value="value"
          class="control__input"
          :class="{...classes, ...status}"
        >

        <span
          v-if="prefix"
          class="control__icon control__icon--prefix"
        >
          <icon :icon="prefix" />
        </span>

        <span class="control__text">{{ label }}</span>

        <span class="control__bar" />

        <span
          v-if="loading"
          class="control__icon"
        >
          <icon
            icon="spinner"
            class="loading"
          />
        </span>

        <span
          v-else-if="sufix"
          class="control__icon"
        >
          <icon :icon="sufix" />
        </span>
      </label>
    </div>

    <span class="control__error">{{ error }}</span>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
	directives: {
		mask
	},
	data() {
		return {
			focused: false
		}
	},
	props: {
		value: {
			required: true
		},
		label: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: 'text'
		},
		prefix: {
			type: String,
			default: null
		},
		sufix: {
			type: String,
			default: null
		},
		mask: {
			default: null
		},
		loading: {
			type: Boolean,
			default: false
		},
		classes: {
			type: Object,
			default() {
				return {}
			} 
		},
		error: {
			type: String,
			default: null
		}
	},
	computed: {
		status() {
			return {
				'--focused': this.focused,
				'--filled': this.value
			}
		}
	},
	mounted () {
		document.addEventListener('click', this.close)
	},
	destroyed () {
		document.removeEventListener('click', this.close)
	},
	methods: {
		focus(value, tab) {
			this.focused = value
			if (tab) {
				this.$refs.input.focus()
			}
		},
		close(event) {
			const { target } = event
			const wrapper = this.$refs.wrapper
			
			if(!(wrapper == target || wrapper.contains(target))) {
				this.focused = false
			}
		},
		update(value) {
			this.$emit('input', value)
		}
	}
}
</script>