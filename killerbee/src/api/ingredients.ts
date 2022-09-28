import axios from "axios";

const globalUrl = "http://localhost:3002/api/ingredient";
const token = localStorage.getItem("accessToken");

let config = {
  headers: {
    authorization: token,
  },
};

export function getAllIngredients(setIngredient: any): any {
  axios //@ts-ignore
    .get(globalUrl + "/getAllIngredients", config)
    .then((response) => {
      setIngredient(response?.data);
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
}

export const getIngredient: any = (name: string, setIngredient: any) => {
  axios //@ts-ignore
    .get(globalUrl + "/getIngredient/" + name, config)
    .then((response) => {
      setIngredient(response?.data);
    })
    .catch((error) => console.log(error));
};

export const createIngredient: any = (ingredient: object) => {
  axios //@ts-ignore
    .post(globalUrl + "/createIngredient", ingredient, config)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const editIngredient: any = (name: string, ingredient: object) => {
  axios //@ts-ignore
    .put(globalUrl + "/modify/" + name, ingredient, config)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const deleteIngredient: any = (name: string) => {
  axios //@ts-ignore
    .delete(globalUrl + "/delete/" + name, config)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
