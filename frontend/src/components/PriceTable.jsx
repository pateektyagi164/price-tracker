export default function PriceTable({ results }) {

  if(!results) return null

  return (

    <table className="mt-6 border w-full">

      <thead className="bg-gray-100">

        <tr>
          <th className="p-2">Store</th>
          <th className="p-2">Product</th>
          <th className="p-2">Price</th>
        </tr>

      </thead>

      <tbody>

        {results.map((item,index)=>(
          <tr key={index}>

            <td className="p-2">{item.store}</td>
            <td className="p-2">{item.name}</td>
            <td className="p-2">₹{item.price}</td>

          </tr>
        ))}

      </tbody>

    </table>

  )
}