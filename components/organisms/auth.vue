<template>
  <div class="auth">
    <div class="auth__logo">
      <logo />
    </div>

    <div class="auth__form">
      <h1 class="auth__title">
        Auth
      </h1>

      <validation-observer
        tag="form"
        @submit.prevent="login"
        ref="observer"
        class="form form--one"
      >
        <validation-provider
          v-slot="{ classes, errors }"
          rules="required|email"
        >
          <control
            v-model="form.email"
            label="e-mail"
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
            v-model="form.password"
            type="password"
            label="password"
            prefix="key"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>
      </validation-observer>

      <knob
        @click.native="login"
        icon="sign-in-alt"
        right
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Control from '~/components/molecules/control'
import Knob from '~/components/atoms/knob'

export default {
	components: {
		Logo,
		ValidationObserver,
		ValidationProvider,
		Control,
		Knob
	},
	data() {
		return {
			form: {
				email: null,
				password: null
			},
			loading: false
		}
	},
	methods: {
		async login() {
			try {
				this.loading = true
        
				const valid = await this.$refs.observer.validate()

				if (!valid) return
        
				await this.$auth.loginWith('local', {
					data: this.form
				})
			} catch (err) {
				console.log(err)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>