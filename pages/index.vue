<template>
  <div>
    <panel title="dashboard">
      <cards :cards="cards" />
      <chart :data="chart" />
    </panel>
  </div>
</template>

<script>
import Panel from '~/components/organisms/panel'
import Cards from '~/components/organisms/cards'
import Chart from '~/components/organisms/chart'
import color from 'randomcolor'

export default {
	components: {
		Panel,
		Cards,
		Chart
	},
	data() {
		return {
			cards: [],
			chart: [],
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	async asyncData({ app }) {
		const data = await app.$get('/count')
		const cards = data
		const chart = {
			labels: [],
			datasets: [
				{
					backgroundColor: [],
					data: []
				}
			]
		}

		data.withusers.forEach(item => {
			chart.labels.push(item.name)
			chart.datasets[0].backgroundColor.push([ 
				color() 
			])
			chart.datasets[0].data.push([ 
				item.__meta__.users_count 
			])
		})
    
		return {
			cards,
			chart
		}
	}
}
</script>