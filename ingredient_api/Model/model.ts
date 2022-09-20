import { Schema, model } from "mongoose";

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const IngredientModel = model("ingredient", IngredientSchema);

export { IngredientModel };
