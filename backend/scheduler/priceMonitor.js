const cron = require("node-cron")
const aggregatePrices = require("../services/priceAggregator")

async function checkPrices(){

 console.log("Running scheduled price check...")

 const product = "iphone"   // example tracked product

 try{

  const results = await aggregatePrices(product)

  console.log("Updated prices:", results)

 }catch(err){

  console.log("Price monitoring failed")

 }

}

function startPriceMonitor(){

 cron.schedule("0 */6 * * *", () => {

  checkPrices()

 })

}

module.exports = startPriceMonitor