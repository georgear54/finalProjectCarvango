const express = require("express");
const router = express.Router();

router.get("/bookTruck", (req, res) => {
  res.send("book  page");
});

module.exports = router;