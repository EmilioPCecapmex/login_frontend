import axios from "axios";

export const Modify = (data: any, ruta: string) => {
  axios({
    method: "post",
    url: process.env.REACT_APP_APPLICATION_DEV + `${ruta}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
    data: data,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
