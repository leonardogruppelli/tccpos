<template>
  <i
    class="las"
    :class="`la-${name}`"
  />
</template>

<script>
export default {
	props: [
		'name'
	]
}
</script>