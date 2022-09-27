import { Request, Response } from "express-serve-static-core";
import { IngredientModel } from "~~/Model/model";
import * as CryptoJS from "crypto-js";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const password = process.env.KEY;

router.post("/createIngredient", async (req: Request, res: Response) => {
  const isExistingIngredient = await IngredientModel.findOne({
    name: req.body.name,
  });
  if (isExistingIngredient) {
    return res
      .status(400)
      .json({ error: "A model with this named already exist" });
  }

  const IngredientCreate = new IngredientModel(req.body);
  if(IngredientCreate.description){
    IngredientCreate.description = CryptoJS.AES.encrypt(IngredientCreate.description, password || "").toString();
  }
  IngredientCreate.save()
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

router.get("/getIngredient/:name", async (req: Request, res: Response) => {
  const model = await IngredientModel.findOne({ name: req.params.name });
  if (!model) {
    return res.status(400).json({ error: "This model does not exist." });
  }

  return res.status(200).json(model);
});

router.get("/getAllIngredients", async (req: Request, res: Response) => {
  const ingredients = await IngredientModel.find();
  if (!ingredients) {
    return res
      .status(400)
      .json({ error: "An error has occured, please try later" });
  }  
  const namelist = new Array<string>;
  ingredients.forEach(function (value){
    namelist.push(value.name);
  });
  res.status(200).json(namelist);
});

router.put("/modify/:name", async (req: Request, res: Response) => {
  const model = await IngredientModel.findOne({ name: req.params.name });

  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }
  try {
    model.set(req.body.modelInfos);
    if(model.description){
      model.description = CryptoJS.AES.encrypt(model.description, password || "").toString();
    }
    model.save().then(() => res.status(200).json({ message: "Model edited!" }));
  } catch (error: any) {
    res.status(400).json({
      message: "An error has occured while updating your model.",
    });
  }
});

router.delete("/delete/:name", async (req: Request, res: Response) => {
  const model = await IngredientModel.findOne({ name: req.params.name });
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
