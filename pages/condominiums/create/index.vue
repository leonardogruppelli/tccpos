<template>
  <div>
    <panel title="Create condominium">
      <validation-observer
        @submit="create"
        ref="observer"
        tag="form"
        class="form form--three"
      >
        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.name"
            label="name"
            prefix="pen"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.address"
            label="address"
            prefix="map-marker-alt"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.tel"
            label="phone"
            prefix="phone"
            :mask="['(##) ####-####', '(##) #####-####']"
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
				name: null,
				address: null,
				tel: null
			},
			loading: false
		}
	},
	methods: {
		async create() {
			const valid = await this.$refs.observer.validate()

			if (!valid) return

			this.loading = true

			const response = await this.$post('/condominiums', this.form)

			if (response) {
				this.$refs.observer.reset()
				this.$router.push('/condominiums')
			}
      
			this.loading = false
		}
	}
}
</script>