import axios from "axios";

const globalUrl = "http://localhost:3001/api/user";

export const Connexion = (email: string, password: string) => {
  axios
    .post(globalUrl + "/login", {
      email: email,
      password: password,
    })
    .then((response: any) => {
      console.log("data", response?.data);
      localStorage.setItem("accessToken", response?.data?.token);
      localStorage.setItem("accessTokenTime", response?.data?.expiresAt);
    })
    .catch((error: Error) => console.log("Error : ", error));
};
