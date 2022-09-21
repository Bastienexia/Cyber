import axios from "axios";
import { useState } from "react";

const globalUrl = "http://localhost:3001/api/user";

export const Connexion = (email: string, password: string) => {
  axios
    .post(globalUrl + "/login", {
      email: email,
      password: password,
    })
    .then((response: any) =>
      localStorage.setItem("accessToken", response?.data?.token)
    )
    .catch((error: Error) => console.log("Error : ", error));
};
