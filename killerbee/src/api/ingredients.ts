import axios from "axios";

const globalUrl = "http://localhost:3002/api/ingredient";
export const getAllIngredients: any = () => {
  axios
    .get(globalUrl + "/getAllIngredients")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
};

export const getIngredient: any = (name: string) => {
  axios
    .get(globalUrl + "/getIngredient/" + name)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => console.log(error));
};

export const createIngredient: any = (ingredient: object) => {
  axios
    .post(globalUrl + "/createIngredient", ingredient)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const editIngredient: any = (name: string, ingredient: object) => {
  axios
    .put(globalUrl + "/modify/" + name, ingredient)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const deleteIngredient: any = (name: string) => {
  axios
    .delete(globalUrl + "/delete/" + name)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
