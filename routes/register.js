const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { addUser } = require("../database/queries/add-user");
const checkUser = require("../database/queries/signupCheck");
const db = require("../database/db");
const router = express.Router();

router.use(express.json());

let verificationCodes = {};

router.post("/sendCode", async (req, res) => {
  const { email } = req.body;
  console.log(email)
  if (!email) {
    return res.status(400).send("Email is required");
  }

  const code = crypto.randomBytes(3).toString("hex");
  verificationCodes[email] = code;

  // Set up nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alwadiflafel@gmail.com",
      pass: "ctoy aueh guwp reqb",
    },
  });

  const mailOptions = {
    from: "alwadiflafel@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Verification code sent");
  });
});

router.post("/verifyCode", async (req, res) => {
  const { email, oneTimeCode } = req.body;
  if (!email || !oneTimeCode) {
    return res.status(400).send("Email and code are required");
  }

  if (verificationCodes[email] === oneTimeCode) {
    delete verificationCodes[email];
    // Fetch user details if available
    try {
      const [userDetails] = await db.query(
        "SELECT * FROM people WHERE email = ?",
        [email]
      );
      return res.status(200).json({ success: true, userDetails });
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).send("Error fetching user details");
    }
  } else {
    return res.status(400).send("Invalid code");
  }
});

router.post("/add-user", async (req, res, next) => {
  console.log("in /register/add-user POST");
  try {
    const user = req.body;
    console.log(user);
    if (
      !user.email ||
      !user.city ||
      !user.street_number ||
      !user.lastName ||
      !user.firstName ||
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
