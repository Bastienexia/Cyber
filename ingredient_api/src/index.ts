import { Request, Response } from "express-serve-static-core";
import { resolve } from "path";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const cors = require("cors");
const express = require("express");
const app = express();

const ingredientRouter = require("./routes/ingredient");

app.use(cors());
app.use(function (req: Request, res: Response, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.use("/api/ingredient", ingredientRouter);

app.listen(3002, () => console.log("Server up and running"));
app.listen(3012, () => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  resolve("3012");
});
