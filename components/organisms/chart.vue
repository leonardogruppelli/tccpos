<script>
import { Doughnut } from 'vue-chartjs'

export default {
	extends: Doughnut,
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	props: {
		data: {
			type: Object,
			default: null
		}
	},
	mounted () {
		this.renderChart(this.data, this.options)
	}
}
</script>