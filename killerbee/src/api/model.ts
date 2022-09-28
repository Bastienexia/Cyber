import axios from "axios";

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
  axios
    .get(globalUrl + "/getModel/" + name)
    .then((response) => {
      setModel(response?.data);
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
