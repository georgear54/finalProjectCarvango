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
      res.status(409).json({
        success: false,
        message: "An account with this email already exists!!!",
      });
    }
  } catch (error) {
    console.error("Error during checking user:", error);
    res.status(500).send("Internal Server Error");
  }
});
