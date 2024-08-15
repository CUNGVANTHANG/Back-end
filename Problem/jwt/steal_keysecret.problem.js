"use strict";

const jwt = require("jsonwebtoken");

const keySecret = "my_secret";

const accessToken = jwt.sign(
  {
    email: "cungvanthang2k3@gmail.com",
    password: "shdjshkvbkljljslsdsdsdsahd",
    number_phone: "012345678",
    role: "admin",
  },
  keySecret,
  { expiresIn: "1h" }
);

console.log("Access Token:", accessToken);

jwt.verify(accessToken, keySecret, (err, decoded) => {
  console.log("Decoded:", decoded);
});
