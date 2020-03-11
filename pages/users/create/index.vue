<template>
  <div>
    <panel title="Create user">
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

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <control
            v-model="form.user_type_id"
            label="type"
            prefix="user-tag"
            select
            :options="types"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
          name="password"
        >
          <control
            v-model="form.password"
            type="password"
            label="password"
            prefix="key"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required|confirmed:password"
        >
          <control
            v-model="form.confirm"
            type="password"
            label="confirm password"
            prefix="lock"
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
        @click.native="create"
        title="Create"
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
				full_name: null,
				email: null,
				identifier: null,
				user_type_id: null,
				password: null,
				confirm: null
			},
			types: [],
			loading: false
		}
	},
	methods: {
		async create() {
			try {
				const valid = await this.$refs.observer.validate()

				if (!valid) return

				this.loading = true

				const response = await this.$post('/users', this.form)

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
	async asyncData({ app }) {
		const types = await app.$get('/combo/usertypes')
		
		return {
			types
		}
	}
}
</script>