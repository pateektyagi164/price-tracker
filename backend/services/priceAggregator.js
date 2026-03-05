const scrapeAmazon = require("./scraperAmazon")
const scrapeStore = require("./scraperStoreAPI")

async function aggregatePrices(product){

  const results = []

  try{
    const amazon = await scrapeAmazon(product)
    results.push(amazon)
  }catch(e){
    console.log("Amazon failed")
  }

  try{
    const store = await scrapeStore(product)
    results.push(store)
  }catch(e){
    console.log("Store API failed")
  }

  return results
}

module.exports = aggregatePrices