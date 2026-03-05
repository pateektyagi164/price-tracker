import { useState } from "react"
import API from "./api/api"

import SearchBar from "./components/SearchBar"
import PriceTable from "./components/PriceTable"
import PriceChart from "./components/PriceChart"
import Loader from "./components/Loader.jsx"

export default function App(){

 const [results,setResults] = useState(null)
 const [history,setHistory] = useState(null)
 const [loading,setLoading] = useState(false)
 const [product,setProduct] = useState("")

 const searchProduct = async(query)=>{

  try{

   setLoading(true)
   setProduct(query)

   const res = await API.get(`/compare?q=${query}`)
   setResults(res.data.results)

   const historyRes = await API.get(`/history/${query}`)
   setHistory(historyRes.data)

  }catch(err){
   console.log("search error",err)
  }

  setLoading(false)

 }

 return(

  <div className="p-10">

   <h1 className="text-3xl font-bold mb-6">
    Smart Price Tracker
   </h1>

   <SearchBar onSearch={searchProduct}/>

   {loading && <Loader/>}

   {!loading && results && (

    <>
     <PriceTable results={results} product={product}/>
     <PriceChart history={history}/>
    </>

   )}

  </div>

 )

}