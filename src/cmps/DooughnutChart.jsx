import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutChart({ data, labels }) {
    const chartData = {
        labels,
        datasets: [{
            data,
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Customize colors
            borderWidth: 1
        }]
    }

    return (
        <div className="doughnut-chart-container">
            <Doughnut data={chartData} />
        </div>
    )
}