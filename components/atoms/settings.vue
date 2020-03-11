<template>
  <div class="settings">
    <ul class="settings__list">
      <li>
        <nuxt-link
          to="/settings"
          class="settings__list__item"
        >
          <span>settings</span>
          <icon icon="cog" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/profile"
          class="settings__list__item"
        >
          <span>profile</span>
          <icon icon="user" />
        </nuxt-link>
      </li>

      <hr>

      <li>
        <button
          @click="logout"
          class="settings__list__item settings__list__item--logout"
        >
          <span>logout</span>
          <icon icon="sign-out-alt" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	methods: {
		async logout() {
			await this.$auth.logout()
		}
	}
}
</script>