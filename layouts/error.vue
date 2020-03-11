<template>
  <div>
    <not-found v-if="error.code == 404" />
    <offline v-else />
  </div>
</template>

<script>
import NotFound from '~/components/molecules/not-found'
import Offline from '~/components/molecules/offline'

export default {
	layout: 'empty',
	components: {
		NotFound,
		Offline
	},
	props: [
		'error' 
	]
}
</script>