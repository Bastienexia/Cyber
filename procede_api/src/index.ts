import { Request, Response } from "express-serve-static-core";
import swaggerUi from "swagger-ui-express";
import { resolve } from "path";
import * as swaggerDocument from "./swagger.json";
const cors = require("cors");
const express = require("express");
const app = express();

const procedeRouter = require("./routes/procede");

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

app.use("/api/procede", procedeRouter);

app.listen(3004, () => console.log("Server up and running"));
app.listen(3014, () => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  resolve("3014");
});
