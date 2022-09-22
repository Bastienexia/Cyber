import axios from "axios";

const globalUrl = "http://localhost:3004/api/procede";

export const createProcede: any = (procede: object) => {
  axios
    .post(globalUrl + "/createprocede", procede)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const getProcede: any = (name: string, setProcede: any) => {
  axios
    .get(globalUrl + "/getprocede/" + name)
    .then((response) => {
      setProcede(response?.data);
    })
    .catch((error) => console.log(error));
};

export const getAllProcede: any = (setProcede: any) => {
  axios
    .get(globalUrl + "/getAllProcede")
    .then((response) => {
      setProcede(response?.data);
    })
    .catch((error) => console.log(error));
};

export const editProcede: any = (name: string, procede: object) => {
  axios
    .put(globalUrl + "/modify/" + name)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const deleteProcede: any = (name: string) => {
  axios
    .delete(globalUrl + "/delete/" + name)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
