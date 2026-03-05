const express = require("express")
const cors = require("cors")
require("dotenv").config()

const compareRoute = require("./routes/compare")
const historyRoute = require("./routes/history")
const watchlistRoute = require("./routes/watchlist")
const alertsRoute = require("./routes/alerts")

// optional scheduler
const { startPriceMonitor } = require("./scheduler/priceMonitor")

const app = express()

// allow frontend to call backend
app.use(cors(
   origin: "https://pricetracker-juwvdy33g-prateek-tyagis-projects-1ed6278d.vercel.app/"
))

app.use(express.json())

// routes
app.use("/compare", compareRoute)
app.use("/history", historyRoute)
app.use("/watchlist", watchlistRoute)
app.use("/alerts", alertsRoute)

// start scheduler safely
if (startPriceMonitor) {
  startPriceMonitor()
}

// test route for scraper
app.get("/test-firecrawl", async (req, res) => {

  const scrapeSite = require("./services/firecrawlScraper")

  const result = await scrapeSite(
    "https://books.toscrape.com/",
    "BookStore"
  )

  res.json(result)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log("Firecrawl key loaded:", process.env.FIRECRAWL_API_KEY)
  console.log(`Server running on port ${PORT}`)


})
