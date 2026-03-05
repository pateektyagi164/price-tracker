const express = require("express")
const router = express.Router()

const aggregatePrices = require("../services/priceAggregator")

router.get("/",async(req,res)=>{

 const query = req.query.q

 const results = await aggregatePrices(query)

 res.json({
  product:query,
  results
 })

})

module.exports = router