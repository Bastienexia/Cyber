import { Request, Response } from "express-serve-static-core";
import * as CryptoJS from "crypto-js";
const Ingredient = require("../../Model/model");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();
const password = process.env.KEY;

router.post("/createIngredient", async (req: Request, res: Response) => {
  const isExistingIngredient = await Ingredient.findOne({
    where: { NomIngredient: req.body.NomIngredient },
  });

  if (isExistingIngredient) {
    return res
      .status(400)
      .json({ error: "An ingredient with this named already exist" });
  }

  const IngredientCreate = new Ingredient(req.body);

  if (IngredientCreate.Description) {
    console.log("Tamere");
    IngredientCreate.Description = CryptoJS.AES.encrypt(
      IngredientCreate.Description,
      password || ""
    ).toString();
  }

  IngredientCreate.save()
    .then(() => {
      res.status(201).json({ message: "Ingredient created !" });
    })
    .catch((error: Error) => {
      res.status(400).json({
        message: "An error has occured while created your ingredient.",
        error: error,
      });
    });
});

router.get("/getIngredient/:name", async (req: Request, res: Response) => {
  const model = await Ingredient.findOne({
    where: { NomIngredient: req.params.name },
  });
  if (!model) {
    return res.status(400).json({ error: "This ingredient does not exist." });
  }

  return res.status(200).json(model);
});

router.get("/getAllIngredients", async (req: Request, res: Response) => {
  const ingredients = await Ingredient.findAll();
  if (!ingredients) {
    return res
      .status(400)
      .json({ error: "An error has occured, please try later" });
  }
  const namelist = new Array<string>();
  ingredients.map((ingredient: any) => {
    namelist.push(ingredient?.NomIngredient);
  });
  res.status(200).json(namelist);
});

router.put("/modify/:name", async (req: Request, res: Response) => {
  const model = await Ingredient.findOne({
    where: { NomIngredient: req.params.name },
  });

  if (!model) {
    return res.status(400).json({ error: "Ingredient not found!" });
  }
  try {
    model.set(req.body);
    if (model.Description) {
      model.Description = CryptoJS.AES.encrypt(
        model.description,
        password || ""
      ).toString();
    }

    model
      .save()
      .then(() => res.status(200).json({ message: "Ingredient edited!" }));
  } catch (error: any) {
    res.status(400).json({
      message: "An error has occured while updating your model.",
    });
  }
});

router.delete("/delete/:name", async (req: Request, res: Response) => {
  const model = await Ingredient.findOne({
    where: { NomIngredient: req.params.name },
  });
  if (!model) {
    return res.status(400).json({ error: "Ingredient not found!" });
  }

  model
    .destroy()
    .then(() => res.status(200).json({ message: "Ingredient deleted!" }))
    .catch((error: Error) =>
      res.status(400).json({
        message: "An error occured while deleting the ingredient!",
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
