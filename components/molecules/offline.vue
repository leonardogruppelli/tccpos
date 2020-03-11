<template>
  <div class="error">
    <h1 class="error__title">
      an error ocurred
    </h1>
    <p class="error__text">
      something happend while trying to load the page
    </p>

    <nuxt-link
      to="#"
      @click.native.prevent="refresh"
      class="error__link error__link--offline"
    >
      <span class="error__link__icon error__link__icon--offline" />
      try again
    </nuxt-link>
  </div>
</template>

<script>
export default {
	methods: {
		refresh() {
			window.location.reload()
		}
	}
}
</script>