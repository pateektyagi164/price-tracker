import { useState } from "react"
import API from "./api/api"

import SearchBar from "./components/SearchBar"
import PriceTable from "./components/PriceTable"
import PriceChart from "./components/PriceChart"

export default function App(){

  const [results,setResults] = useState(null)
  const [history,setHistory] = useState(null)

  const searchProduct = async (query) => {

    const res = await API.get(`/compare?q=${query}`)

    setResults(res.data.results)

    if(res.data.results.length > 0){

      const historyRes = await API.get(`/history/1`)
      setHistory(historyRes.data)

    }

  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Smart Price Tracker
      </h1>

      <SearchBar onSearch={searchProduct}/>

      <PriceTable results={results}/>

      <PriceChart history={history}/>

    </div>

  )

}