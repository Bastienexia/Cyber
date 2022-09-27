import axios from "axios";

const globalUrl = "http://localhost:3003/api/recette";

export const createModel: any = (recette: object) => {
  axios
    .post(globalUrl + "/createRecette", recette)
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
  axios
    .get(globalUrl + "/getAllModel")
    .then((response) => {
      setModel(response?.data);
    })
    .catch((error) => console.log(error));
};

export const editModel: any = (name: string, model: object) => {
  axios
    .put(globalUrl + "/modify/" + name)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const deleteModel: any = (name: string) => {
  axios
    .delete(globalUrl + "/delete/" + name)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
