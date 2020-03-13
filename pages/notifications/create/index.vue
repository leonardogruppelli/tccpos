<template>
  <div>
    <panel title="Create notification">
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
            v-model="form.send_to"
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
				send_to: null
			},
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

			this.form.send_to = null

			if (block) {
				this.apartments = await this.$get(`/combo/apartments/${block}`)
			} else {
				this.apartments = []
			}
		},
		async create() {
			const valid = await this.$refs.observer.validate()

			if (!valid) return

			this.loading = true

			const response = await this.$post('/notifications', this.form)

			if (response) {
				this.$refs.observer.reset()
				this.$router.push('/notifications')
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