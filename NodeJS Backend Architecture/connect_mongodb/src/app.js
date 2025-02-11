import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./dbs/init.mongodb.lv0.js";
import "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";

const app = express();

// init middlewares
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// init db
// connectDB();
checkOverload();

// init routes

// handleing error

export default app;
