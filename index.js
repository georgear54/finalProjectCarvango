const express = require("express");
const cors = require("cors");
const path = require("path");

// Create an Express application instance 
const app = express();
console.log("Abrahem")

const aboutRoutes = require("./routes/about");
const bookRoutes = require("./routes/book");
const cateringRoutes = require("./routes/catering");
const contactRoutes = require("./routes/contact");
const findRoutes = require("./routes/find");
const menuRoutes = require("./routes/menu");
const shopRoutes = require("./routes/shop");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "fe/src")));


// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.url + " url");
  next();
});

// Define route handlers
app.use("/about", aboutRoutes);
app.use("/book", bookRoutes);
app.use("/catering", cateringRoutes);
app.use("/contact", contactRoutes);
app.use("/find", findRoutes);
app.use("/menu", menuRoutes);
app.use("/shop", shopRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/fe/src/index.js"));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
