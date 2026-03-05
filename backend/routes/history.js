const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

router.get("/:productId", async (req, res) => {

  try {

    const { data } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", req.params.productId)
      .order("created_at", { ascending: true })

    res.json(data)

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch history" })

  }

})

module.exports = router