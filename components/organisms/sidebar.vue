<template>
  <aside
    class="sidebar"
    v-blur="close"
  >
    <ul class="sidebar__list">
      <li class="sidebar__item sidebar__item--top">
        <span>
          <logo />

          <h5>Menu</h5>
        </span>

        <close />
      </li>

      <li class="sidebar__item sidebar__item--separator">
        <small>administration</small>
      </li>

      <li>
        <nuxt-link
          to="/"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="chart-bar"
          />
          <span class="sidebar__item__text">home</span>
        </nuxt-link>
      </li>
      
      <li>
        <nuxt-link
          to="/users"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="user"
          />
          <span class="sidebar__item__text">users</span>
        </nuxt-link>
      </li>

      <li v-if="$auth.user.user_type_id == 1">
        <nuxt-link
          to="/condominiums"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="building"
          />
          <span class="sidebar__item__text">condominiums</span>
        </nuxt-link>
      </li>

      <li v-if="$auth.user.user_type_id == 2">
        <nuxt-link
          to="/blocks"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="hotel"
          />
          <span class="sidebar__item__text">blocks</span>
        </nuxt-link>
      </li>

      <li v-if="$auth.user.user_type_id > 1">
        <nuxt-link
          to="/communications"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="bell"
          />
          <span class="sidebar__item__text">communications</span>
        </nuxt-link>
      </li>

      <li class="sidebar__item sidebar__item--separator">
        <small>content</small>
      </li>

      <li>
        <nuxt-link
          to="/reports"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="newspaper"
          />
          <span class="sidebar__item__text">reports</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link
          to="/help"
          class="sidebar__item"
          exact
        >
          <icon
            class="sidebar__item__icon"
            icon="question"
          />
          <span class="sidebar__item__text">help</span>
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline'
import Close from '~/components/atoms/close'
import {
	mapActions
} from 'vuex'

export default {
	components: {
		Logo,
		Close
	},
	methods: {
		...mapActions([
			'TOGGLE_SIDEBAR'
		]),
		close() {
			this.TOGGLE_SIDEBAR(false)
		}
	}
}
</script>
