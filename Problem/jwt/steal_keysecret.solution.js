"use strict";

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
});

console.log({ privateKey, publicKey });

const accessToken = jwt.sign(
  {
    email: "cungvanthang2k3@gmail.com",
    password: "shdjshkvbkljljslsdsdsdsahd",
    number_phone: "012345678",
    role: "admin",
  },
  privateKey,
  { algorithm: "RS256", expiresIn: "1h" }
);

console.log("Access Token:", accessToken);

jwt.verify(accessToken, publicKey, (err, decoded) => {
  console.log("Decoded:", decoded);
});
