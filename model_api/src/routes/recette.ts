import { Request, Response } from "express-serve-static-core";
import { RecetteModel } from "~~/Model/model";
import * as CryptoJS from "crypto-js";
import { array } from "joi";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const password = "Password";

router.post("/createRecette", async (req: Request, res: Response) => {
  const isExistingRecette = await RecetteModel.findOne({ name: req.body.name });
  if (isExistingRecette) {
    return res
      .status(400)
      .json({ error: "A model with this named already exist" });
  }

  const RecetteCreate = new RecetteModel(req.body);
  /*RecetteCreate.puht = CryptoJS.AES.encrypt(
    RecetteCreate.puht,
    password
  ).toString();
  RecetteCreate.gamme = CryptoJS.AES.encrypt(
    RecetteCreate.gamme,
    password
  ).toString();
  const array = new Array();
  RecetteCreate.ingredients.forEach(function (value) {
    value = CryptoJS.AES.encrypt(value, password).toString();
    array.push(value);
  });
  RecetteCreate.ingredients = array;
  if (req.body.description) {
    RecetteCreate.description = CryptoJS.AES.encrypt(
      req.body.description,
      password
    ).toString();
  }*/
  RecetteCreate.save()
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

router.get("/getAllModel", async (req: Request, res: Response) => {
  const model = await RecetteModel.find();
  if (!model) {
    return res.status(400).json({ error: "There is no model" });
  }

  return res.status(200).json(model);
});

router.get("/getModel/:name", async (req: Request, res: Response) => {
  const model = await RecetteModel.findOne({ name: req.params.name });
  if (!model) {
    return res.status(400).json({ error: "This model does not exist." });
  }

  return res.status(200).json(model);
});

router.put("/modify/:name", async (req: Request, res: Response) => {
  const model = await RecetteModel.findOne({ name: req.params.name });

  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }
  try {
    model.set(req.body.modelInfos);
    model.puht = CryptoJS.AES.encrypt(model.puht, password).toString();
    model.gamme = CryptoJS.AES.encrypt(model.gamme, password).toString();
    const array = new Array();
    model.ingredients.forEach(function (value) {
      value = CryptoJS.AES.encrypt(value, password).toString();
      array.push(value);
    });
    model.ingredients = array;
    if (req.body.modelInfos.description) {
      model.description = CryptoJS.AES.encrypt(
        req.body.description,
        password
      ).toString();
    }
    model.save().then(() => res.status(200).json({ message: "Model edited!" }));
  } catch (error: any) {
    res.status(400).json({
      message: "An error has occured while updating your model.",
    });
  }
});

router.delete("/delete/:name", async (req: Request, res: Response) => {
  const model = await RecetteModel.findOne({ name: req.params.name });
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
