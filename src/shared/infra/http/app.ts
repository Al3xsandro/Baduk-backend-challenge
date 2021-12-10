import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";

import "express-async-errors";

import createConnection from "../typeorm/index";
import { handleErrors } from "./middlewares/handleErrors";
import { router } from "./routes";

import "../../container/index";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(handleErrors);

export { app };
