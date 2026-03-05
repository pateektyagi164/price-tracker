const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

router.post("/", async (req, res) => {

  const { user_email, product_id } = req.body

  try {

    const { data } = await supabase
      .from("watchlist")
      .insert([
        {
          user_email,
          product_id
        }
      ])

    res.json(data)

  } catch (error) {

    res.status(500).json({ error: "Failed to add to watchlist" })

  }

})

router.get("/:email", async (req, res) => {

  const { data } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_email", req.params.email)

  res.json(data)

})

module.exports = router