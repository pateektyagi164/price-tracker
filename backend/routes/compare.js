const express = require("express")
const router = express.Router()

const aggregatePrices = require("../services/priceAggregator")

router.get("/", async (req, res) => {

    try {

        const query = req.query.q

        if (!query) {
            return res.status(400).json({ error: "Missing search query" })
        }

        const prices = await aggregatePrices(query)

        const lowest = prices.reduce((min, item) =>
            item.price < min.price ? item : min
        )

        res.json({
            product: query,
            results: prices,
            best_price: lowest
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({ error: "Comparison failed" })

    }

})

module.exports = router