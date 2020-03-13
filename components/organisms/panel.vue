<template>
  <div class="panel">
    <div class="panel__header">
      <nuxt-link
        v-if="back"
        :to="back"
      >
        <knob
          icon="long-arrow-alt-left"
          flat
          no-margin
        />
      </nuxt-link>
      
      <h3>{{ title }}</h3>
    </div>

    <div class="panel__content">
      <slot />
    </div>
  </div>
</template>

<script>
import Knob from '~/components/atoms/knob'

export default {
	components: {
		Knob
	},
	props: {
		title: {
			required: true
		},
		back: {
			type: String,
			default: null
		}
	}
}
</script>