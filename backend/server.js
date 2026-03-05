require("dotenv").config()

const express = require("express")
const cors = require("cors")

const searchRoute = require("./routes/search")
const compareRoute = require("./routes/compare")
const historyRoute = require("./routes/history")
const watchlistRoute = require("./routes/watchlist")
const alertsRoute = require("./routes/alerts")

const startPriceMonitor = require("./scheduler/priceMonitor")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/search", searchRoute)
app.use("/compare", compareRoute)
app.use("/history", historyRoute)
app.use("/watchlist", watchlistRoute)
app.use("/alerts", alertsRoute)

startPriceMonitor()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

})