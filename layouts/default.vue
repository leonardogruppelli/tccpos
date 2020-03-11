<template>
  <div class="content">
    <bar />
    <transition name="sidebar">
      <sidebar v-if="sidebar" />
    </transition>
    <main
      class="main"
      role="main"
    >
      <nuxt />
    </main>
  </div>
</template>

<script>
import Bar from '~/components/organisms/bar'
import Sidebar from '~/components/organisms/sidebar'
import {
	mapGetters 
} from 'vuex'

export default {
	components: {
		Bar,
		Sidebar
	},
	computed: {
		...mapGetters([
			'sidebar' 
		])
	}
}
</script>