const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

router.get("/:product", async (req,res)=>{

 try{

  const productName = req.params.product

  // get product id
  const {data:productRow,error} = await supabase
   .from("products")
   .select("id")
   .eq("name",productName)
   .single()

  if(error || !productRow){
   return res.json([])
  }

  // fetch price history
  const {data:history,error:historyError} = await supabase
   .from("price_history")
   .select("*")
   .eq("product_id",productRow.id)
   .order("created_at",{ascending:true})

  if(historyError){
   return res.json([])
  }

  res.json(history)

 }catch(err){
  console.log("history error",err)
  res.json([])
 }

})

module.exports = router