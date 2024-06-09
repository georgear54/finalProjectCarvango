const express = require("express");
const router = express.Router();

router.get("/menu", (req, res) => {
  res.send("menu page");
});

module.exports = router;