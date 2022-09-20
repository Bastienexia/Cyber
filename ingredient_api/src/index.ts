import { Request, Response } from "express-serve-static-core";
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

const uri = "mongodb://127.0.0.1:27017";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ingredientDB",
  })
  .then(() => console.log("Connection to MongoDB projectmanager successful !"))
  .catch((error: Error) =>
    console.log("Connection to MongoDB projectmanager failed !", error)
  );
