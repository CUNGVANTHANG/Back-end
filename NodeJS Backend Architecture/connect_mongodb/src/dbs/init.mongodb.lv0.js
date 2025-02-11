"use strict";

import mongoose from "mongoose";

const connectString = `mongodb+srv://...`;

const connectDB = () => {
  mongoose
    .connect(connectString)
    .then((_) => console.log("Connectd MongoDB Success"))
    .catch((err) => console.error("Error connect"));

  // dev
  if (1 === 1) {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
  }
};

export default connectDB;
