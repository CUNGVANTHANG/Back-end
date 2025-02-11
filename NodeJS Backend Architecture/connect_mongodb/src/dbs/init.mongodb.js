"use strict";

import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect.js";

const connectString = `mongodb+srv://...`;

class Database {
  constructor() {
    this.connectDB();
  }

  connectDB(type = "mongodb") {
    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => {
        countConnect();
        console.log("Connectd MongoDB Success");
      })
      .catch((err) => console.error("Error connect"));

    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

export default Database.getInstance();
