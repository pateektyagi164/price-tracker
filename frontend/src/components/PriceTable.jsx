export default function PriceTable({ results, product }){

 if(!results || results.length === 0){
  return <p>No results found</p>
 }

 const best = results.reduce((min,item)=>
  item.price < min.price ? item : min
 )

 return(

  <div className="mt-6">

   <h2 className="text-xl font-bold mb-3">
    Results for {product}
   </h2>

   <table className="w-full border">

    <thead>

     <tr className="bg-gray-200">

      <th className="p-2">Store</th>
      <th className="p-2">Price</th>

     </tr>

    </thead>

    <tbody>

     {results.map((r,i)=>(
      <tr key={i} className="text-center">

       <td className="p-2">{r.store}</td>
       <td className="p-2">₹{r.price}</td>

      </tr>
     ))}

    </tbody>

   </table>

   <div className="mt-4 p-4 bg-green-100 rounded">

    <strong>Best place to buy:</strong>

    {best.store} — ₹{best.price}

   </div>

  </div>

 )

}