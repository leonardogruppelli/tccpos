<template>
  <div class="search">
    <validation-observer ref="observer">
      <validation-provider
        v-slot="{ classes, errors }"
        rules="required"
      >
        <control
          v-model="search"
          label="search"
          :classes="classes"
          :error="errors[0]"
        >
          <template v-slot:after>
            <span class="control__input__icon">
              <icon icon="search" />
            </span>
          </template>
        </control>
      </validation-provider>
    </validation-observer>
  </div>
</template>

<script>
import {
	ValidationObserver,
	ValidationProvider 
} from 'vee-validate'
import Control from '~/components/molecules/control'

export default {
	components: {
		ValidationObserver,
		ValidationProvider,
		Control
	},
	data() {
		return {
			search: null
		}
	}
}
</script>