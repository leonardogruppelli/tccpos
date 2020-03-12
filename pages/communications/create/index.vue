<template>
  <div>
    <panel title="Create communication">
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
            v-model="form.title"
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
          <control
            v-model="form.description"
            label="description"
            prefix="align-justify"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-slot="{ classes, errors }"
          rules="required"
        >
          <combo
            v-model="form.send_type"
            label="send to"
            prefix="tag"
            :options="types"
            :classes="classes"
            :error="errors[0]"
          />
        </validation-provider>

        <validation-provider
          v-if="form.send_type > 1 && blocks"
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
          v-if="form.send_type > 2 && apartments && block"
          v-slot="{ classes, errors }"
          rules="required"
        >
          <combo
            v-model="apartment"
            label="apartment"
            prefix="home"
            :options="apartments"
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
				title: null,
				description: null,
				send_type: null,
				send_to: null
			},
			type: null,
			types: [
				{
					id: 1,
					name: 'Condomínio'
				},
				{
					id: 2,
					name: 'Bloco'
				},
				{
					id: 3,
					name: 'Apartamento'
				}
			],
			block: null,
			blocks: [],
			apartment: null,
			apartments: [],
			loading: false
		}
	},
	watch: {
		form: {
			handler(value) {
				if (value.send_type != this.type) {
					this.type = value.send_type
					return this.search()
				}
			},
			deep: true
		},
		async block(value) {
			if (this.form.send_type == 2) {
				this.form.send_to = value
			}

			return this.search()
		},
		async apartment(value) {
			if (this.form.send_type == 3) {
				this.form.send_to = value
			}
		}
	},
	methods: {
		async search() {
			const type = this.form.send_type
			const block = this.block
			const apartments = this.apartments

			if (type == 1) {
				this.block = null
			}
      
			if (type == 2) {
				this.form.send_to = this.block
			}

			if (type < 3 || (type == 3 && !block)) {
				this.apartment = null
				this.apartments = []
				return
			}

			if (type == 3 && block) {
				this.apartment = null
				this.apartments = await this.$get(`/combo/apartments/${block}`)
			}
		},
		async create() {
			const valid = await this.$refs.observer.validate()

			if (!valid) return

			this.loading = true

			const response = await this.$post('/communications', this.form)

			if (response) {
				this.$refs.observer.reset()
				this.$router.push('/communications')
			}
      
			this.loading = false
		}
	},
	async asyncData({ app }) {
		const blocks = await app.$get('/combo/blocks')

		return {
			blocks
		}
	}
}
</script>