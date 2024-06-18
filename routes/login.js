const express = require("express");
const checkUser = require("../database/queries/checkUser");
const chk = require("../database/queries/signupCheck")
const router = express.Router();

// Middleware to parse JSON and URL-encoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// POST /login
router.post("/", async (req, res, next) => {
  try {
    console.log("in post login");
    // Extract username and password from the request body
    const { username, password } = req.body;
    console.log(username, " ||||||||||||| ", password);

    // Call asynchronous function to check user credentials
    const exists = await checkUser(username, password);

    // Check if user exists
    if (exists) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    // Handle any errors that occur during login process
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
