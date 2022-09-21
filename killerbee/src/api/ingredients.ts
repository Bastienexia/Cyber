import axios from "axios";
import { resolve } from "path";

const globalUrl = "http://localhost:3002/api/ingredient";
export const getAllIngredients = () => {
  axios
    .get(globalUrl + "/getAllIngredients")
    .then((response) => {
      return response.data;
    })
    .catch((error: Error) => {
      console.log("Error : ", error);
    });
};

export const createIngredient = (ingredient: object) => {
  axios
    .post(globalUrl + "/createIngredient", ingredient)
    .then((response) => console.log(response))
    .catch((error: Error) => console.log(error));
};

export const editIngredient = (name: string, ingredient: object) => {
  axios
    .put(globalUrl + "/modify/" + name, ingredient)
    .then((response) => console.log(response))
    .catch((error: Error) => console.log(error));
};
