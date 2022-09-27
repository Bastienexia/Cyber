import { Request, Response } from "express-serve-static-core";
const Model = require("../../Model/model");
const ModelHasIngredient = require("../../Model/modelhasingredient");
import * as CryptoJS from "crypto-js";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const password = process.env.KEY;

router.post("/createRecette", async (req: Request, res: Response) => {
  const isExistingRecette = await Model.findOne({
    where: { name: req.body.model.name },
  });
  if (isExistingRecette) {
    return res
      .status(400)
      .json({ error: "A model with this named already exist" });
  }

  const RecetteCreate = new Model(req.body.model);
  RecetteCreate.puht = CryptoJS.AES.encrypt(
    RecetteCreate.puht,
    password || ""
  ).toString();
  RecetteCreate.Gamme = CryptoJS.AES.encrypt(
    RecetteCreate.Gamme,
    password || ""
  ).toString();

  RecetteCreate.Description = CryptoJS.AES.encrypt(
    req.body.Description,
    password || ""
  ).toString();

  await RecetteCreate.save();
  const createdModel = await Model.findOne({
    where: { name: req.body.model.name },
  });
  req.body?.ingredients.map((ingredient: any) => {
    const ingredientCreate = new ModelHasIngredient({
      IdModel: createdModel.IdModel,
      IdIngredient: ingredient.IdIngredient,
      grammage: ingredient.grammage,
    });

    ingredientCreate.save();
  });

  res.status(201).json({ message: "Model created !" });
});

router.get("/getAllModel", async (req: Request, res: Response) => {
  const model = await Model.findAll();
  if (!model) {
    return res.status(400).json({ error: "There is no model" });
  }
  const namelist = new Array<string>();
  model.map((model: any) => {
    namelist.push(model?.name);
  });
  return res.status(200).json(namelist);
});

router.get("/getModel/:name", async (req: Request, res: Response) => {
  const model = await Model.findOne({ where: { name: req.params.name } });
  if (!model) {
    return res.status(400).json({ error: "This model does not exist." });
  }

  const ingredients = await ModelHasIngredient.findAll({
    where: { IdModel: model.IdModel },
  });

  return res.status(200).json({ model, ingredients });
});

router.put("/modify/:name", async (req: Request, res: Response) => {
  const model = await Model.findOne({ where: { name: req.params.name } });

  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }
  try {
    model.set(req.body.modelInfos);
    model.puht = CryptoJS.AES.encrypt(model.puht, password || "").toString();
    model.Gamme = CryptoJS.AES.encrypt(model.Gamme, password || "").toString();

    if (req.body.modelInfos.Description) {
      model.Description = CryptoJS.AES.encrypt(
        req.body.Description,
        password || ""
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
  const model = await Model.findOne({ where: { name: req.params.name } });
  if (!model) {
    return res.status(400).json({ error: "Model not found!" });
  }

  model
    .destroy()
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
