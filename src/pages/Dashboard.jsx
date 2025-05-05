import { DoughnutChart } from "../cmps/DooughnutChart.jsx";
import { LineChart } from "../cmps/LineChart.jsx";


export function Dashboard() {
    return (
        <div className="dashboard-container">
            <DoughnutChart data={[40, 50, 10]} labels={['Blue', 'Yellow', 'Red']} />
            <LineChart />
        </div>
    )

}