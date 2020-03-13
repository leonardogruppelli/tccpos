<template>
  <div>
    <panel title="Create block">
      <validation-observer
        @submit="create"
        ref="observer"
        tag="form"
        class="form form--two"
      >
        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.description"
            label="description"
            prefix="align-justify"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>
      </validation-observer>

      <knob
        @click.native="$router.go(-1)"
        title="Back"
        background="black"
        icon="arrow-left"
      />

      <knob
        @click.native="create"
        title="Add"
        icon="plus"
        right
        :loading="loading"
      />
    </panel>
  </div>
</template>

<script>
import Panel from '~/components/organisms/panel'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Control from '~/components/molecules/control'
import Knob from '~/components/atoms/knob'

export default {
	components: {
		Panel,
		ValidationObserver,
		ValidationProvider,
		Control,
		Knob
	},
	data() {
		return {
			form: {
				description: null
			},
			loading: false
		}
	},
	methods: {
		async create() {
			const valid = await this.$refs.observer.validate()

			if (!valid) return

			this.loading = true

			const response = await this.$post('/blocks', this.form)

			if (response) {
				this.$refs.observer.reset()
				this.$router.push('/blocks')
			}
      
			this.loading = false
		}
	}
}
</script>