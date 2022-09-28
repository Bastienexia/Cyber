import axios from "axios";
import * as CryptoJS from "crypto-js";

const Key = process.env.REACT_APP_KEY;

const globalUrl = "http://localhost:3003/api/recette";
const token = localStorage.getItem("accessToken");

let config = {
  headers: {
    authorization: token,
  },
};

export const createModel: any = (recette: object) => {
  axios //@ts-ignore
    .post(globalUrl + "/createRecette", recette, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const getModel: any = (name: string, setModel: any) => {
  axios //@ts-ignore
    .get(globalUrl + "/getModel/" + name, config)
    .then((response) => {
      console.log(response.data.model.Gamme);
      console.log(response.data.model.Description);
      console.log(Key);
      console.log(
        CryptoJS.AES.decrypt(
          "U2FsdGVkX18rqEOV/HvcD3lFXsZu+a5VJ0nw4DlvIq99bBWQbZr8nHBABwzAhGSP",
          Key || ""
        ).toString(CryptoJS.enc.Utf8)
      );
      setModel({
        model: {
          IdModel: response.data.model.IdModel,
          name: response.data.model.name,
          Description: CryptoJS.AES.decrypt(
            response.data.model.Description,
            Key || ""
          ).toString(CryptoJS.enc.Utf8),
          puht: CryptoJS.AES.decrypt(
            response.data.model.puht,
            Key || ""
          ).toString(CryptoJS.enc.Utf8),
          Gamme: CryptoJS.AES.decrypt(
            response.data.model.Gamme,
            Key || ""
          ).toString(CryptoJS.enc.Utf8),
        },
        ingredients: response?.data?.ingredients,
      });
    })
    .catch((error) => console.log(error));
};

export const getAllModel: any = (setModel: any) => {
  axios //@ts-ignore
    .get(globalUrl + "/getAllModel", config)
    .then((response) => {
      setModel(response?.data);
    })
    .catch((error) => console.log(error));
};

export const editModel: any = (name: string, model: object) => {
  axios //@ts-ignore
    .put(globalUrl + "/modify/" + name, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const deleteModel: any = (name: string) => {
  axios //@ts-ignore
    .delete(globalUrl + "/delete/" + name, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
