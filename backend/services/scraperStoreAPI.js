const axios = require("axios")

async function scrapeStore(product) {

  const response = await axios.get("https://fakestoreapi.com/products")

  const products = response.data

  const match = products.find(p =>
    p.title.toLowerCase().includes(product.toLowerCase())
  )

  const item = match || products[0]

  return {
    name: item.title,
    price: item.price,
    store: "FakeStoreAPI"
  }

}

module.exports = scrapeStore