import axios from "axios";

export const JWT_Token: string = localStorage.getItem("jwtToken") || "";

export const IdUsuario_LS: string = localStorage.getItem("IdUsuario") || "";

export const sessionValid = () => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_DEV + "/api/verify",
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
        localStorage.setItem("sUntil", r.data.expDateTime);
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
    });
};

export const continueSession = () => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_DEV  + "/api/verify",
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
        localStorage.setItem("sUntil", r.data.expDateTime);
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // localStorage.clear();
        return false;
      }
    });
};

export const logout = () => {
  // localStorage.clear();
  window.location.assign("http://10.200.4.200:3000/");
};

export const isAdmin = () => {
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_DEV + "/api/user-apps",
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
