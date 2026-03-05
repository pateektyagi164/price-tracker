const cron = require("node-cron")

const scrapeAmazon = require("../services/scraperAmazon")
const scrapeBooks = require("../services/scraperStoreAPI")

const supabase = require("../config/supabase")

async function checkPrices() {

  console.log("Running scheduled price check...")

  const { data: alerts } = await supabase
    .from("alerts")
    .select("*")

  for (const alert of alerts) {

    try {

      const productId = alert.product_id

      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single()

      let priceData

      if (product.store === "Amazon") {
        priceData = await scrapeAmazon(product.name)
      } else {
        priceData = await scrapeBooks(product.name)
      }

      if (priceData.price < alert.threshold_price) {

        console.log(
          `Price drop detected for ${product.name}`
        )

        console.log(
          `Current price: ${priceData.price}`
        )

      }

    } catch (error) {

      console.log("Error checking price")

    }

  }

}

function startPriceMonitor() {

  cron.schedule("0 */6 * * *", () => {

    checkPrices()

  })

}

module.exports = startPriceMonitor