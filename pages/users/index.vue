<template>
  <div>
    <panel title="Users">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
              >
                <td>{{ user.full_name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table__actions">
          <ul class="table__actions__list">
            <li class="table__actions__item table__actions__item--add">
              <nuxt-link to="/users/create">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <li
              v-for="user in users"
              :key="user.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/users/update/${user.id}`">
                <icon
                  icon="pen"
                  class="edit"
                />
              </nuxt-link>

              <button
                @click="remove(user.id, index)"
                aria-label="Delete user"
              >
                <icon
                  icon="trash"
                  class="delete"
                />
              </button>
            </li>
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
			users: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this user?')){
				const response = await this.$delete(`/users/${id}`)

				if (response) {
					this.users.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app }) {
		try {
			const users = await app.$get('/users')

			return {
				users
			}
		} catch (err) {
			console.log(err)
		}
	}
}
</script>