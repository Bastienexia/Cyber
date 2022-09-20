import { Request, Response } from "express-serve-static-core";
import { RecetteModel } from "~~/Model/model";

require("dotenv").config();

const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/createRecette", async (req: Request, res: Response) => {
  const isExistingRecette = await RecetteModel.findOne({ name: req.body.name });
  if (isExistingRecette) {
    return res
      .status(400)
      .json({ error: "A model with this named already exist" });
  }

  const RecetteCreate = new RecetteModel(req.body);
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

  model.set(req.body.modelInfos);
  model.save().then(() => res.status(200).json({ message: "Model edited!" }));
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
