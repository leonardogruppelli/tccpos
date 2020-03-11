<template>
  <div class="panel">
    <h3>{{ title }}</h3>

    <slot />
  </div>
</template>

<script>
export default {
	props: {
		title: {
			required: true
		}
	}
}
</script>