const express = require("express");
const { addUser } = require("../database/queries/add-user");
const checkUser = require("../database/queries/signupCheck");
const router = express.Router();
router.use(express.json());

router.post("/add-user", async (req, res, next) => {
  console.log("in /register/add-user POST");
  try {
    const user = req.body;
    if (
      !user.email ||
      !user.role ||
      !user.city ||
      !user.street_number ||
      !user.last_name ||
      !user.first_name ||
      !user.phone_number
    ) {
      throw new Error("Required fields missing");
    }

    await addUser(user);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/checkSignup", async (req, res, next) => {
  try {
    console.log("in checkSignup❤️❤️❤️");
    const { email, phoneNumber } = req.body;
    console.log(req.body);

    const userExists = await checkUser(email, phoneNumber);

    if (!userExists) {
      res.status(200).json({ success: true });
      console.log("p❤️❤️❤️");
    } else {
      res.status(409).json({ success: false });
    }
  } catch (error) {
    console.error("Error during checking user:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
