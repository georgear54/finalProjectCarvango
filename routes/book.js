const express = require("express");
const router = express.Router();

router.get("/book", (req, res) => {
  res.send("book page");
});

module.exports = router;