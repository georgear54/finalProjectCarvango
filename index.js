const express = require("express");
const path = require("path");

// Create an Express application instance
const app = express();

const aboutRoutes = require("./routes/about");
const bookRoutes = require("./routes/bookTruck");
const cateringRoutes = require("./routes/catering");
const contactRoutes = require("./routes/contact");
const findRoutes = require("./routes/find");
const menuRoutes = require("./routes/menu");
const shopRoutes = require("./routes/shop");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client")));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.url + " url");
  next();
});

// Define route handlers
app.use("/about", aboutRoutes);
app.use("/bookTruck", bookRoutes);
app.use("/catering", cateringRoutes);
app.use("/contact", contactRoutes);
app.use("/find", findRoutes);
app.use("/menu", menuRoutes);
app.use("/shop", shopRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
