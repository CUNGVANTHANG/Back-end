import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "./dbs/init.mongodb.js";
import { checkOverload } from "./helpers/check.connect.js";

dotenv.config();
const app = express();

// init middlewares
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// init db
// checkOverload();

// init routes

// handleing error

export default app;
