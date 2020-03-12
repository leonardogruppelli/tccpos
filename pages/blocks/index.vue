<template>
  <div>
    <panel title="Blocks">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
            <tbody v-if="blocks.length">
              <tr
                v-for="block in blocks"
                :key="block.id"
              >
                <td>{{ block.description }}</td>
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
              <nuxt-link to="/blocks/create">
                <icon
                  icon="plus"
                  class="add"
                />
              </nuxt-link>
            </li>

            <li
              v-for="(block, index) in blocks"
              :key="block.id"
              class="table__actions__item"
            >
              <nuxt-link :to="`/apartments/${block.id}`">
                <icon
                  icon="home"
                  class="c-info"
                />
              </nuxt-link>

              <nuxt-link :to="`/blocks/update/${block.id}`">
                <icon
                  icon="pen"
                  class="c-warning"
                />
              </nuxt-link>

              <button
                @click="remove(block.id, index)"
                aria-label="Delete block"
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
			blocks: []
		}
	},
	methods: {
		async remove(id, index) {
			if(confirm('Are you sure you want to delete this block?')){
				const response = await this.$remove(`/blocks/${id}`)

				if (response) {
					this.blocks.splice(index, 1)
				}
			}
		}
	},
	async asyncData({ app }) {
		const blocks = await app.$get('/blocks')

		return {
			blocks
		}
	}
}
</script>