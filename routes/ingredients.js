//ingredients
const express = require("express");
const router = express.Router();
const doQuery = require("../database/query");

router.get("/", async (req, res) => {
  try {
    const ingredients = await doQuery("SELECT * FROM ingredients");
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ error: "Error fetching ingredients" });
  }
});

module.exports = router;
