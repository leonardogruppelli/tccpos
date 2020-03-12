<template>
  <div>
    <panel title="Update Block">
      <validation-observer
        @submit="update"
        ref="observer"
        tag="form"
        class="form form--three"
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
        @click.native="update"
        title="Update"
        icon="pen"
        background="warning"
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
		async update() {
			try {
				const valid = await this.$refs.observer.validate()

				if (!valid) return

				this.loading = true
        
				const { id } = this.$route.params

				const response = await this.$put(`/blocks/${id}`, this.form)

				if (response) {
					this.$refs.observer.reset()
					this.$router.push('/blocks')
				}
      
				this.loading = false
			} catch (error) {
				console.log(error)
			}
			
		}
	},
	async asyncData({ app, route }) {
		const { id } = route.params

		const block = await app.$get(`/blocks/${id}`)
    
		return {
			form: {
				description: block.description
			}
		}
	}
}
</script>