const scrapeSite = require("./firecrawlScraper")
const supabase = require("../config/supabase")

async function aggregatePrices(product){

 const sites=[

  {
   name:"eBay",
   url:`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(product)}`
  },

  {
   name:"Amazon",
   url:`https://www.amazon.com/s?k=${encodeURIComponent(product)}`
  },

  {
   name:"AliExpress",
   url:`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(product)}`
  }

 ]

 const results=[]

 let {data:productRow}=await supabase
  .from("products")
  .select("id")
  .eq("name",product)
  .single()

 if(!productRow){

  const {data:newProduct}=await supabase
   .from("products")
   .insert([{name:product}])
   .select()
   .single()

  productRow=newProduct

 }

 const productId=productRow.id

 for(const site of sites){

  try{

   const data=await scrapeSite(site.url,site.name)

   if(!data || !data.price) continue

   results.push({
    store:site.name,
    price:data.price
   })

   await supabase
    .from("price_history")
    .insert([{
      product_id:productId,
      store:site.name,
      price:data.price
    }])

  }catch(err){
   console.log(`${site.name} scrape failed`)
  }

 }

 return results

}

module.exports=aggregatePrices