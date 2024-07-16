require("dotenv").config();

const express = require("express");

// Hỗ trợ layout cho EJS
const expressLayouts = require("express-ejs-layouts");

// Middleware lưu trữ và hiện thị các thông báo tạm thời lưu trong seasion
const flash = require("connect-flash");
const session = require("express-session");

const connectDB = require("./server/config/db.js");

const app = express();
const port = 5000 || process.env.PORT;

// Connect to Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

// Template engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Route
app.use("/", require("./server/routes/customer.js"));

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
