const express = require("express");
const router = express.Router();

router.get("/find", (req, res) => {
  res.send("find page");
});

module.exports = router;