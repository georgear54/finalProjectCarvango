const express = require("express");
const cors = require("cors");
const path = require("path");

// Create an Express application instance
const app = express();

// // const bookRoutes = require("./routes/book");
// const cateringRoutes = require("./routes/catering");
// const contactRoutes = require("./routes/contact");
// const findRoutes = require("./routes/find");
const ingredientsRoutes = require("./routes/ingredients");

const menuRoutes = require("./routes/menu");
const signUpRoutes = require("./routes/register");
const logInRoutes = require("./routes/login");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "fe")));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.url + " url");
  next();
});

// Define route handlers
// app.use("/book", bookRoutes);
// app.use("/catering", cateringRoutes);
// app.use("/contact", contactRoutes);
// app.use("/find", findRoutes);
app.use("/menu", menuRoutes);
app.use("/signUp", signUpRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/logIn", logInRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/fe/build/index.html"));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
