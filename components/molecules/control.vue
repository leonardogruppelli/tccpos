<template>
  <div
    class="control"
    :class="isSelect"
  >
    <div class="control__wrapper">
      <label
        :for="tag"
        @click.prevent="focus(true, true)"
        class="control__input"
        :class="status"
      >
        <span
          v-if="prefix"
          class="control__input__icon"
          :class="size"
        >
          <icon :icon="prefix" />
        </span>

        <input
          v-if="!select && !mask"
          ref="input"
          @input="update($event.target.value)"
          @blur="focus(false)"
          :id="tag"
          :value="value"
        >

        <input
          v-else-if="!select && mask"
          ref="input"
          @input="update($event.target.value)"
          @blur="focus(false)"
          v-mask="mask"
          :id="tag"
          :value="value"
        >

        <select
          v-else
          ref="input"
          @input="update($event.target.value)"
          :id="tag"
          :value="value"
          readonly
        >
          <option value="">Select an option...</option>
          <option
            v-for="option in options"
            :value="option.id"
            :key="option.id"
          >{{ option.name }}</option>
        </select>

        <span
          class="control__input__label"
          :class="position"
        >{{ label }}</span>

        <span
          v-if="loading"
          class="control__input__icon"
        >
          <icon
            icon="circle-notch"
            class="loading"
          />
        </span>

        <span
          v-else-if="select"
          class="control__input__icon"
        >
          <icon icon="caret-down" />
        </span>

        <slot
          v-else-if="!icon"
          name="after"
        />

        <span
          v-else
          class="control__input__icon"
        >
          <icon :icon="icon" />
        </span>
      </label>

      <!-- <transition name="select">
        <ul
          v-show="select && options && focused"
          class="control__dropdown"
        >
          <li
            @click="update(null)"
            class="control__dropdown__item"
            :class="selected(null)"
          >
            Select an option...
          </li>

          <li
            v-for="option in options"
            @click="update(option.value)"
            :key="option.value"
            class="control__dropdown__item"
            :class="selected(option.value)"
          >
            {{ option.name }}
          </li>
        </ul>
      </transition> -->
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
			tag: `control-${this.key}`,
			focused: false
		}
	},
	props: {
		value: {
			required: true
		},
		type: {
			type: String,
			default: 'text'
		},
		label: {
			type: String,
			default: null
		},
		placeholder: {
			type: String,
			default: null
		},
		prefix: {
			type: String,
			default: null
		},
		icon: {
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
		select: {
			type: Boolean,
			default: false
		},
		options: {
			type: Array,
			default() {
				return null
			}
		},
		classes: {
			type: Object,
			default() {
				return null
			} 
		},
		error: {
			type: String,
			default: null
		}
	},
	computed: {
		isSelect() {
			return this.select && 'control--select'
		},
		status() {
			const classes = []

			if (this.focused) {
				classes.push('control__input--focused')
			}

			if (this.value) {
				classes.push('control__input--filled')
			}
      
			return [
				...classes,
				this.classes 
			]
		},
		size() {
			return this.prefix && 'control__input__icon--prefix'
		},
		position() {
			return this.prefix && 'control__input__label--offset'
		}
	},
	methods: {
		update(value) {
			this.$emit('input', value)
		},
		focus(value, label) {
			if (label) {
				if (!this.focused) {
					this.$refs.input.focus()
					this.focused = true
				}
        
				return
			}

			if (!value) {
				setTimeout(() => {
					this.focused = false
				}, 100)
        
				return
			}

			this.focused = value
		},
		selected(value) {
			return this.value == value && 'control__dropdown__item--selected'
		}
	}
}
</script>