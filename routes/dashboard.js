const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: "Welcome to the dashboard" });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
