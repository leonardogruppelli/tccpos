<template>
  <div>
    <panel title="Condominiums">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody v-if="condominiums.length">
              <tr
                v-for="condominium in condominiums"
                :key="condominium.id"
              >
                <td>{{ condominium.name }}</td>
                <td>{{ condominium.address }}</td>
                <td>{{ condominium.tel }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td>no results were found...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table__actions">
          <ul class="table__actions__list">
            <li class="table__actions__item table__actions__item--add">
              <nuxt-link to="/condominiums/create">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <li
              v-for="(condominium, index) in condominiums"
              :key="condominium.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/condominiums/update/${condominium.id}`">
                <icon
                  icon="pen"
                  class="edit"
                />
              </nuxt-link>

              <button
                @click="remove(condominium.id, index)"
                aria-label="Delete condominium"
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
			condominiums: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this condominium?')){
				const response = await this.$delete(`/condominiums/${id}`)

				if (response) {
					this.condominiums.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app }) {
		const condominiums = await app.$get('/condominiums')

		return {
			condominiums
		}
	}
}
</script>