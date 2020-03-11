<template>
  <button
    @click.stop="toggle"
    class="profile"
  >
    <small class="profile__name">{{ $auth.user[0].full_name }}</small>
    <img
      src="https://via.placeholder.com/150"
      alt="Profile Picture"
      class="profile__image"
    >
    <icon
      icon="angle-down"
      class="profile__icon"
      :class="icon"
    />

    <transition name="settings">
      <settings
        v-if="settings"
        v-blur="close"
      />
    </transition>
  </button>
</template>

<script>
import Settings from '~/components/atoms/settings'
import {
	mapGetters,
	mapActions 
} from 'vuex'

export default {
	components: {
		Settings
	},
	computed: {
		...mapGetters([
			'settings'
		]),
		icon() {
			return this.settings && 'profile__icon--active'
		}
	},
	methods: {
		...mapActions([
			'TOGGLE_SETTINGS'
		]),
		toggle() {
			this.TOGGLE_SETTINGS()
		},
		close() {
			this.TOGGLE_SETTINGS(false)
		}
	}
}
</script>