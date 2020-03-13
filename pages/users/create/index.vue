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
          <combo
            v-model="form.user_type_id"
            label="type"
            prefix="user-tag"
            :options="types"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-if="$auth.user.user_type_id == 1 && form.user_type_id == 2"
          v-slot="{ classes, errors }"
          rules="required"
        >
          <combo
            v-model="form.condominium_id"
            label="condominium"
            prefix="building"
            :options="condominiums"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-if="form.user_type_id == 5"
          v-slot="{ classes, errors }"
          rules="required"
        >
          <combo
            v-model="block"
            label="block"
            prefix="hotel"
            :options="blocks"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-if="apartments && block"
          v-slot="{ classes, errors }"
          rules="required"
        >
          <combo
            v-model="form.apartment_id"
            label="apartment"
            prefix="home"
            :options="apartments"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <!-- <validation-provider
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
        </validation-provider> -->
      </validation-observer>

      <knob
        @click.native="$router.go(-1)"
        title="Back"
        background="black"
        icon="arrow-left"
      />

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
import Combo from '~/components/molecules/combo'
import Knob from '~/components/atoms/knob'

export default {
	components: {
		Panel,
		ValidationObserver,
		ValidationProvider,
		Control,
		Combo,
		Knob
	},
	data() {
		return {
			form: {
				full_name: null,
				email: null,
				identifier: null,
				user_type_id: null,
				condominium_id: null,
				apartment_id: null
				// password: null,
				// confirm: null
			},
			types: [],
			condominiums: [],
			block: null,
			blocks: [],
			apartments: [],
			loading: false
		}
	},
	watch: {
		block(value) {
			return this.search()
		}
	},
	methods: {
		async search() {
			const block = this.block

			this.form.apartment_id = null

			if (block) {
				this.apartments = await this.$get(`/combo/apartments/${block}`)
			} else {
				this.apartments = []
			}
		},
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
		const condominiums = await app.$get('/combo/condominiums')
		const blocks = await app.$get('/combo/blocks')
		
		return {
			types,
			condominiums,
			blocks
		}
	}
}
</script>