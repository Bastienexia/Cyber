import { Request, Response } from "express-serve-static-core";
import { resolve } from "path";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const recetteRouter = require("./routes/recette");

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

app.use("/api/recette", recetteRouter);

app.listen(3003, () => console.log("Server up and running"));
app.listen(3013, () => {app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); resolve("3013")})

const uri = "mongodb://127.0.0.1:27017";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "recetteDB",
  })
  .then(() => console.log("Connection to MongoDB projectmanager successful !"))
  .catch((error: Error) =>
    console.log("Connection to MongoDB projectmanager failed !", error)
  );
