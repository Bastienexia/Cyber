"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// Model/model.ts
var import_mongoose, IngredientSchema, IngredientModel;
var init_model = __esm({
  "Model/model.ts"() {
    "use strict";
    import_mongoose = require("mongoose");
    IngredientSchema = new import_mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: false }
    });
    IngredientModel = (0, import_mongoose.model)("ingredient", IngredientSchema);
  }
});

// src/routes/ingredient.ts
var require_ingredient = __commonJS({
  "src/routes/ingredient.ts"(exports, module2) {
    "use strict";
    init_model();
    require("dotenv").config();
    var jwt = require("jsonwebtoken");
    var router = require("express").Router();
    router.post("/createingredient", async (req, res) => {
      const isExistingIngredient = await IngredientModel.findOne({ name: req.body.name });
      if (isExistingIngredient) {
        return res.status(400).json({ error: "A model with this named already exist" });
      }
      const IngredientCreate = new IngredientModel(req.body);
      IngredientCreate.save().then(() => {
        res.status(201).json({ message: "Model created !" });
      }).catch((error) => {
        res.status(400).json({
          message: "An error has occured while created your model.",
          error
        });
      });
    });
    router.get("/getIngredient/:name", async (req, res) => {
      const model2 = await IngredientModel.findOne({ name: req.params.name });
      if (!model2) {
        return res.status(400).json({ error: "This model does not exist." });
      }
      return res.status(200).json(model2);
    });
    router.put("/modify/:name", async (req, res) => {
      const model2 = await IngredientModel.findOne({ name: req.params.name });
      if (!model2) {
        return res.status(400).json({ error: "Model not found!" });
      }
      model2.set(req.body.modelInfos);
      model2.save().then(() => res.status(200).json({ message: "Model edited!" }));
    });
    router.delete("/delete/:name", async (req, res) => {
      const model2 = await IngredientModel.findOne({ name: req.params.name });
      if (!model2) {
        return res.status(400).json({ error: "Model not found!" });
      }
      model2.delete().then(() => res.status(200).json({ message: "Model deleted!" })).catch((error) => res.status(400).json({
        message: "An error occured while deleting the model!",
        error
      }));
    });
    module2.exports = router;
  }
});

// src/index.ts
var cors = require("cors");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var ingredientRouter = require_ingredient();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use("/api/ingredient", ingredientRouter);
app.listen(3002, () => console.log("Server up and running"));
var uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "ingredientDB"
}).then(() => console.log("Connection to MongoDB projectmanager successful !")).catch((error) => console.log("Connection to MongoDB projectmanager failed !", error));
