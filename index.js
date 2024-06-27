const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

const cateringRoutes = require("./routes/catering");
const ingredientsRoutes = require("./routes/ingredients");
const menuRoutes = require("./routes/menu");
const registerRoutes = require("./routes/register"); // updated route name
const logInRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3002", // Change this to your frontend origin
    credentials: true, // Allow credentials/cookies to be included
  })
);
app.use(express.json());

app.use(
  session({
    secret: "123123", // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 5000,
    },
  })
);

app.use(express.static(path.join(__dirname, "fe")));

app.use((req, res, next) => {
  console.log(req.url + " url");
  next();
});

app.use("/catering", cateringRoutes);
app.use("/menu", menuRoutes);
app.use("/register", registerRoutes); // updated route
app.use("/ingredients", ingredientsRoutes);
app.use("/logIn", logInRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/fe/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
