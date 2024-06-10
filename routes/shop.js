const express = require("express");
const router = express.Router();

router.get("/shop", (req, res) => {
  res.send("shop zdfSgzfdgdfpage");
});

module.exports = router;