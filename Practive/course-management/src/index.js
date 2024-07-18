const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");

const app = express();
const port = 5555;

// Morgan
app.use(morgan("combined"));

// Template engine (Handlebars)
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route
app.get("/", (req, res) => {
  res.render("home");
});

// Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
