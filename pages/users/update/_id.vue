<template>
  <div>
    <panel title="Create user">
      <validation-observer
        @submit="update"
        ref="observer"
        tag="form"
        class="form form--two"
      >
        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.full_name"
            label="name"
            prefix="pen"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required|email"
        >
          <control
            v-model="form.email"
            label="email"
            prefix="at"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.identifier"
            mask="###.###.###-##"
            label="identifier"
            prefix="id-card"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>
      </validation-observer>

      <nuxt-link to="/users">
        <knob
          title="Back"
          background="black"
          icon="arrow-left"
        />
      </nuxt-link>

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
				full_name: null,
				email: null,
				identifier: null
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

				const response = await this.$put(`/users/${id}`, this.form)

				if (response) {
					this.$refs.observer.reset()
					this.$router.push('/users')
				}
      
				this.loading = false
			} catch (error) {
				console.log(error)
			}
		}
	},
	async asyncData({ app, route }) {
		const { id } = route.params

		const user = await app.$get(`/users/${id}`)
    
		return {
			form: {
				full_name: user.full_name,
				email: user.email,
				identifier: user.identifier
			}
		}
	}
}
</script>