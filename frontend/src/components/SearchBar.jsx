import { useState } from "react"

export default function SearchBar({ onSearch }) {

  const [query,setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (

    <form onSubmit={handleSubmit} className="flex gap-2">

      <input
        className="border p-2 rounded w-80"
        placeholder="Search product..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

    </form>

  )
}