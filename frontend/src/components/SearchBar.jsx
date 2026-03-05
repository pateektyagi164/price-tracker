import { useState } from "react"

export default function SearchBar({ onSearch }){

 const [query,setQuery] = useState("")

 const handleSubmit = (e)=>{
  e.preventDefault()
  onSearch(query)
 }

 return(

  <form onSubmit={handleSubmit} className="mb-6">

   <input
    className="border p-2 mr-2"
    placeholder="Search product"
    value={query}
    onChange={(e)=>setQuery(e.target.value)}
   />

   <button className="bg-blue-500 text-white px-4 py-2">
    Search
   </button>

  </form>

 )

}