<template>
  <div>
    <panel title="Communications">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody v-if="communications.length">
              <tr
                v-for="communication in communications"
                :key="communication.id"
              >
                <td>{{ communication.title }}</td>
                <td>{{ communication.description }}</td>
                <td>{{ communication.tel }}</td>
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
              <nuxt-link to="/communications/create">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <li
              v-for="(communication, index) in communications"
              :key="communication.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/communications/update/${communication.id}`">
                <icon
                  icon="pen"
                  class="c-warning"
                />
              </nuxt-link>

              <button
                @click="remove(communication.id, index)"
                aria-label="Delete communication"
              >
                <icon
                  icon="trash"
                  class="c-error"
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
			communications: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this communication?')){
				const response = await this.$remove(`/communications/${id}`)

				if (response) {
					this.communications.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app }) {
		const communications = await app.$get('/communications')

		return {
			communications
		}
	}
}
</script>