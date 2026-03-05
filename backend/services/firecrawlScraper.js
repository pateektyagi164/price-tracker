const axios = require("axios")

const FIRECRAWL_URL = "https://api.firecrawl.dev/v0/scrape"

async function scrapeSite(searchUrl, store) {

  try {

    // Scrape search page
    const searchResponse = await axios.post(
      FIRECRAWL_URL,
      {
        url: searchUrl,
        pageOptions: { onlyMainContent: true }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    const searchText =
      searchResponse?.data?.data?.markdown ||
      searchResponse?.data?.data?.content ||
      ""

    if (!searchText) {
      console.log(`${store} search page empty`)
      return null
    }

    let productUrl = null

    // -------- EBAY (RESTORE WORKING LOGIC) --------
    if (store === "eBay") {

      const match = searchText.match(/https:\/\/www\.ebay\.com\/itm\/[0-9]+/)

      if (match) {
        productUrl = match[0]
      }

    }

    // -------- AMAZON --------
    if (store === "Amazon") {

      const match = searchText.match(/https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}/)

      if (match) {
        productUrl = match[0]
      }

    }

    if (!productUrl) {
      console.log(`${store} product link not found`)
      return null
    }

    console.log(`${store} product URL found:`, productUrl)

    // Scrape product page
    const productResponse = await axios.post(
      FIRECRAWL_URL,
      {
        url: productUrl,
        pageOptions: { onlyMainContent: true }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    const productText =
      productResponse?.data?.data?.markdown ||
      productResponse?.data?.data?.content ||
      ""

    const priceMatch = productText.match(/[£$₹€]\s?[0-9,]+(\.[0-9]+)?/)

    const price = priceMatch
      ? parseFloat(priceMatch[0].replace(/[£₹$,€]/g, ""))
      : null

    if (!price) {
      console.log(`${store} price not found`)
    }

    return {
      store,
      price
    }

  } catch (err) {

    console.log(`${store} scrape failed`, err.message)
    return null

  }

}

module.exports = scrapeSite