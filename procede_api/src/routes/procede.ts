import { Request, Response } from "express-serve-static-core";
import * as CryptoJS from "crypto-js";
const Procede = require("../../Model/model");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const password = process.env.KEY;

router.post("/createprocede", authenticateToken, async (req: Request, res: Response) => {
  const isExistingProcede = await Procede.findOne({
    where: { name: req.body.name },
  });
  if (isExistingProcede) {
    return res
      .status(400)
      .json({ error: "A procede with this named already exist" });
  }

  const ProcedeCreate = new Procede(req.body);
  ProcedeCreate.tests = CryptoJS.AES.encrypt(
    ProcedeCreate.tests,
    password || ""
  ).toString();
  ProcedeCreate.description = CryptoJS.AES.encrypt(
    req.body.description,
    password || ""
  ).toString();

  ProcedeCreate.save()
    .then(() => {
      res.status(201).json({ message: "Procede created !" });
    })
    .catch((error: Error) => {
      res.status(400).json({
        message: "An error has occured while created your procede.",
        error: error,
      });
    });
});

router.get("/getprocede/:name", authenticateToken, async (req: Request, res: Response) => {
  const procede = await Procede.findOne({ where: { name: req.params.name } });
  if (!procede) {
    return res.status(400).json({ error: "This procede does not exist." });
  }

  return res.status(200).json(procede);
});

router.get("/getAllProcede", authenticateToken, async (req: Request, res: Response) => {
  const procedeList = await Procede.findAll();
  if (!procedeList) {
    return res.status(400).json({ error: "There is no procede" });
  }
  const namelist = new Array<string>();
  procedeList.map((procede: any) => {
    namelist.push(procede.name);
  });
  return res.status(200).json(namelist);
});

router.put("/modify/:name", authenticateToken, async (req: Request, res: Response) => {
  const procede = await Procede.findOne({ where: { name: req.params.name } });
  if (!procede) {
    return res.status(400).json({ error: "Procede not found!" });
  }

  try {
    procede.set(req.body);
    procede.tests = CryptoJS.AES.encrypt(procede.tests, password || "").toString();
    procede.description = CryptoJS.AES.encrypt(
      req.body.description,
      password || ""
    ).toString();
    procede.save().then(() => res.status(200).json({ message: "Procede edited!" }));
  } catch (error: any) {
    res.status(400).json({
      message: "An error has occured while updating your procede.",
    });
  }
});

router.delete("/delete/:name", authenticateToken, async (req: Request, res: Response) => {
  const procede = await Procede.findOne({ where: { name: req.params.name } });
  if (!procede) {
    return res.status(400).json({ error: "Model not found!" });
  }

  procede
    .destroy()
    .then(() => res.status(200).json({ message: "Procede deleted!" }))
    .catch((error: Error) =>
      res.status(400).json({
        message: "An error occured while deleting the procede!",
        error: error,
      })
    );
});

function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401);
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error: Error, user: object) => {
      if (error) {
        return res.status(401);
      }
      req.body.tokeninfo = user;
    }
  );
  next();
}

module.exports = router;
