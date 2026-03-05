import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement)

export default function PriceChart({ history }) {

  if(!history) return null

  const data = {
    labels: history.map(h=>new Date(h.created_at).toLocaleDateString()),
    datasets: [{
      label:"Price",
      data: history.map(h=>h.price),
      borderColor:"blue"
    }]
  }

  return (
    <div className="mt-8">
      <Line data={data}/>
    </div>
  )
}