const express = require("express")
const router = express.Router()

const scrapeAmazon = require("../services/scraperAmazon")

router.get("/", async (req, res) => {

    try {

        const query = req.query.q

        if (!query) {
            return res.status(400).json({ error: "Query missing" })
        }

        const result = await scrapeAmazon(query)

        res.json(result)

    } catch (error) {

        console.error(error)

        res.status(500).json({ error: "Scraping failed" })
    }

})

module.exports = router