import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer,
 Legend
} from "recharts"

export default function PriceChart({ history }){

 if(!history || history.length === 0){
  return <p className="mt-6">No price history yet</p>
 }

 const stores = [...new Set(history.map(h => h.store))]

 const grouped = {}

 history.forEach(item => {

  const time = new Date(item.created_at).toLocaleTimeString()

  if(!grouped[time]){
   grouped[time] = { time }
  }

  grouped[time][item.store] = item.price

 })

 const data = Object.values(grouped)

 const colors = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#ea580c"
 ]

 return(

  <div className="mt-10">

   <h2 className="text-xl font-bold mb-3">
    Price History Comparison
   </h2>

   <ResponsiveContainer width="100%" height={350}>

    <LineChart data={data}>

     <CartesianGrid strokeDasharray="3 3"/>

     <XAxis dataKey="time"/>

     <YAxis/>

     <Tooltip/>

     <Legend/>

     {stores.map((store,index)=>(
      <Line
       key={store}
       type="monotone"
       dataKey={store}
       stroke={colors[index % colors.length]}
       strokeWidth={3}
       connectNulls={true}
      />
     ))}

    </LineChart>

   </ResponsiveContainer>

  </div>

 )

}