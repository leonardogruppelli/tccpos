<template>
  <div>
    <panel title="Apartments">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
            <tbody v-if="apartments.length">
              <tr
                v-for="apartment in apartments"
                :key="apartment.id"
              >
                <td>{{ apartment.description }}</td>
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
              <nuxt-link :to="`/apartments/create/${$route.params.block}`">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <li
              v-for="(apartment, index) in apartments"
              :key="apartment.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/apartments/update/${$route.params.block}/${apartment.id}`">
                <icon
                  icon="pen"
                  class="c-warning"
                />
              </nuxt-link>

              <button
                @click="remove(apartment.id, index)"
                aria-label="Delete apartment"
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
			apartments: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this apartment?')){
				const response = await this.$remove(`/apartments/${id}`)

				if (response) {
					this.apartments.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app, route }) {
		const { block } = route.params
		const apartments = await app.$get(`/apartments/${block}/blocks`)

		return {
			apartments
		}
	}
}
</script>