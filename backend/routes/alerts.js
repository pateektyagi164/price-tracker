const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

router.post("/", async (req, res) => {

  const { product_id, threshold_price, email } = req.body

  try {

    const { data } = await supabase
      .from("alerts")
      .insert([
        {
          product_id,
          threshold_price,
          email
        }
      ])

    res.json(data)

  } catch (error) {

    res.status(500).json({ error: "Failed to create alert" })

  }

})

module.exports = router