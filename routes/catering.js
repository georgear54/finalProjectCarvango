const express = require("express");
const router = express.Router();

router.get("/catering", (req, res) => {
  res.send("catering page");
});

module.exports = router;