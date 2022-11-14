import axios from "axios";

export const JWT_Token: string = localStorage.getItem("jwtToken") || "";

export const IdUsuario_LS: string = localStorage.getItem("IdUsuario") || "";

export const sessionValid = () => {
  return axios
    .post(
      "http://10.200.4.192:5000/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("validation", "true");
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
    });
};

export const isAdmin = () => {
  return axios
    .post(
      "http://10.200.4.192:5000/api/user-apps",
      {
        IdUsuario: localStorage.getItem("IdUsuario") || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      const valid = r.data.data.findIndex(
        (data: any) => data.Nombre === "ADMIN"
      );
      return valid;
    })
    .catch((error) => {
      if (error.response.status === 409) {
        localStorage.clear();
      }
    });
};
