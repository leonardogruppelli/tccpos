<template>
  <auth />
</template>

<script>
import Auth from '~/components/organisms/auth'

export default {
	layout: 'empty',
	auth: 'guest',
	components: {
		Auth
	}
}
</script>