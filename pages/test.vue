<template>
  <div>
    <validation-observer
      @submit="submit"
      ref="observer"
      tag="form"
      class="form form--two"
    >
      <validation-provider
        v-slot="{ classes, errors }"
        rules="required"
      >
        <control
          v-model="value"
          label="title"
          prefix="heading"
          :classes="classes"
          :error="errors[0]"
        />
      </validation-provider>

      <validation-provider
        v-slot="{ classes, errors }"
        rules="required"
      >
        <combo
          v-model="select"
          label="title"
          prefix="heading"
          :options="options"
          :classes="classes"
          :error="errors[0]"
        />
      </validation-provider>
    </validation-observer>

    <toggle
      v-model="is"
      label="require confirmation"
    />
    {{ is }}
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Control from '~/components/molecules/control'
import Combo from '~/components/molecules/combo'
import Toggle from '~/components/atoms/toggle'

export default {
	components: {
		ValidationObserver,
		ValidationProvider,
		Control,
		Combo,
		Toggle
	},
	data() {
		return {
			value: null,
			select: null,
			is: 0,
			options: [
				{
					id: 1,
					name: 'Admin'
				},
				{
					id: 2,
					name: 'User'
				}
			]
		}
	},
	methods: {
		submit() {
			console.log(value)
		}
	}
}
</script>