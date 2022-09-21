import { Request, Response } from "express-serve-static-core";
const cors = require("cors");
const express = require("express");
const app = express();

const authRouter = require("./routes/auth");

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

app.use("/api/user", authRouter);

app.listen(3001, () => console.log("Server up and running"));
