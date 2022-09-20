import { Schema, model } from "mongoose";

const RecetteSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  puht: { type: String, required: true },
  gamme: { type: String, required: true },
  ingredients: { type: Array, required: true },
});

const RecetteModel = model("recette", RecetteSchema);

export { RecetteModel };
