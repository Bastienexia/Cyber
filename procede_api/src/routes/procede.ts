import { Request, Response } from "express-serve-static-core";
import { ProcedeModel } from "~~/Model/model";
import * as CryptoJS from 'crypto-js';  

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/createprocede", async (req: Request, res: Response) => {
  const encPassword = "password";
  const isExistingProcede = await ProcedeModel.findOne({ name: req.body.name });
  if (isExistingProcede) {
    return res
      .status(400)
      .json({ error: "A model with this named already exist" });
  }

  const ProcedeCreate = new ProcedeModel(req.body);
  ProcedeCreate.modele_freezbe = CryptoJS.AES.encrypt(ProcedeCreate.modele_freezbe, encPassword).toString(); 
  ProcedeCreate.tests = CryptoJS.AES.encrypt(ProcedeCreate.tests, encPassword).toString(); 
  ProcedeCreate.description = CryptoJS.AES.encrypt(req.body.description, encPassword).toString();

  ProcedeCreate.save()
    .then(() => {
      res.status(201).json({ message: "Model created !" });
    })
    .catch((error: Error) => {
      res.status(400).json({
        message: "An error has occured while created your model.",
        error: error,
      });
    });
});

router.get("/getprocede/:name", async (req: Request, res: Response) => {
  const model = await ProcedeModel.findOne({ name: req.params.name });
  if (!model) {
    return res.status(400).json({ error: "This model does not exist." });
  }

  return res.status(200).json(model);
});

router.put("/modify/:name", async (req: Request, res: Response) => {
  const encPassword = "password";
  const model = await ProcedeModel.findOne({ name: req.params.name });
  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }
  try{
    model.set(req.body.modelInfos);
    model.modele_freezbe = CryptoJS.AES.encrypt(model.modele_freezbe, encPassword).toString(); 
    model.tests = CryptoJS.AES.encrypt(model.tests, encPassword).toString(); 
    model.description = CryptoJS.AES.encrypt(req.body.modelInfos.description, encPassword).toString();
    model.save().then(() => res.status(200).json({ message: "Model edited!" }));
  } 
  catch(error: any) {
    res.status(400).json({
      message: "An error has occured while updating your model.",
    });
  };

  

});

router.delete("/delete/:name", async (req: Request, res: Response) => {
  const model = await ProcedeModel.findOne({ name: req.params.name });
  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }

  model
    .delete()
    .then(() => res.status(200).json({ message: "Model deleted!" }))
    .catch((error: Error) =>
      res.status(400).json({
        message: "An error occured while deleting the model!",
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
