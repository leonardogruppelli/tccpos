<template>
  <div class="combo">
    <div
      ref="select"
      @click="focus(true)"
      class="combo__wrapper"
    >
      <label class="combo__label">
        <input
          :type="type"
          :value="text"
          class="combo__input"
          :class="{...classes, ...status}"
          readonly
        >

        <span
          v-if="prefix"
          class="combo__icon combo__icon--prefix"
        >
          <icon :icon="prefix" />
        </span>

        <span class="combo__text">{{ label }}</span>

        <span class="combo__bar" />

        <span
          v-if="loading"
          class="combo__icon"
        >
          <icon
            icon="spinner"
            class="loading"
          />
        </span>

        <span
          v-else
          class="combo__icon"
        >
          <icon icon="caret-down" />
        </span>
      </label>

      <transition name="select">
        <ul
          v-show="focused"
          class="combo__dropdown"
        >
          <li
            @click="update(null)"
            class="combo__dropdown__item"
          >
            Select an option...
          </li>

          <li
            v-for="option in options"
            @click="update(option.id, option.name)"
            :key="option.id"
            class="combo__dropdown__item"
          >
            {{ option.name }}
          </li>
        </ul>
      </transition>
    </div>

    <span class="combo__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
	data() {
		return {
			text: this.value,
			focused: false
		}
	},
	props: {
		value: {
			required: true
		},
		options: {
			type: Array,
			default() {
				return {}
			} 
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
			type: String,
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
	watch: {
		value(value) {
			if (!value) this.text = null
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
		focus(value) {
			this.focused = value
		},
		close(event) {
			const { target } = event
			const select = this.$refs.select
			
			if(!(select == target || select.contains(target))) {
				this.focused = false
			}
		},
		update(value, text) {
			this.$emit('input', value)
			this.text = text
		}
	}
}
</script>