import axios from "axios";

const globalUrl = "http://localhost:3004/api/procede";
const token = localStorage.getItem("accessToken");

let config = {
  headers: {
    authorization: token,
  },
};

export const createProcede: any = (procede: object) => {
  axios //@ts-ignore
    .post(globalUrl + "/createprocede", procede, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const getProcede: any = (name: string, setProcede: any) => {
  axios //@ts-ignore
    .get(globalUrl + "/getprocede/" + name, config)
    .then((response) => {
      setProcede(response?.data);
    })
    .catch((error) => console.log(error));
};

export const getAllProcede: any = (setProcede: any) => {
  axios //@ts-ignore
    .get(globalUrl + "/getAllProcede", config)
    .then((response) => {
      setProcede(response?.data);
    })
    .catch((error) => console.log(error));
};

export const editProcede: any = (name: string, procede: object) => {
  axios //@ts-ignore
    .put(globalUrl + "/modify/" + name, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const deleteProcede: any = (name: string) => {
  axios //@ts-ignore
    .delete(globalUrl + "/delete/" + name, config)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
