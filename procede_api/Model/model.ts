import { Schema, model } from "mongoose";

const ProcedeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  modele_freezbe: {type: String, required: true},
  tests: {type: String, required: true},
});

const ProcedeModel = model("procede", ProcedeSchema);

export { ProcedeModel };
