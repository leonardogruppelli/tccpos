<template>
  <div>
    <panel title="Notifications">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody v-if="notifications.length">
              <tr
                v-for="notification in notifications"
                :key="notification.id"
              >
                <td>{{ notification.title }}</td>
                <td>{{ notification.description }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="100%">
                  no results were found...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table__actions">
          <ul class="table__actions__list">
            <li class="table__actions__item table__actions__item--add">
              <nuxt-link to="/notifications/create">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <!-- <li
              v-for="(notification, index) in notifications"
              :key="notification.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/notifications/update/${notification.id}`">
                <icon
                  icon="pen"
                  class="c-warning"
                />
              </nuxt-link>

              <button
                @click="remove(notification.id, index)"
                aria-label="Delete notification"
              >
                <icon
                  icon="trash"
                  class="c-error"
                />
              </button>
            </li> -->
          </ul>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import Panel from '~/components/organisms/panel'

export default {
	components: {
		Panel
	},
	data() {
		return {
			notifications: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this notification?')){
				const response = await this.$remove(`/notifications/${id}`)

				if (response) {
					this.notifications.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app }) {
		const notifications = await app.$get('/notifications')

		return {
			notifications
		}
	}
}
</script>