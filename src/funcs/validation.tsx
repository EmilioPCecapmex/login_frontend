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
  localStorage.clear();
  window.location.assign(process.env.REACT_APP_APPLICATION_FRONT || "");
};

export const logoutToAppSelector = () => {
  const jwt = localStorage.getItem("jwtToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const idUsuario = localStorage.getItem("IdUsuario");
  const nombreUsuario = localStorage.getItem("NombreUsuario");
  const appsCache = localStorage.getItem("appsList");

  localStorage.clear();

  if (jwt) localStorage.setItem("jwtToken", jwt);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (idUsuario) localStorage.setItem("IdUsuario", idUsuario);
  if (nombreUsuario) localStorage.setItem("NombreUsuario", nombreUsuario);
  if (appsCache) localStorage.setItem("appsList", appsCache);

  localStorage.setItem("returnToApps", "true");

  const baseUrl = process.env.REACT_APP_APPLICATION_FRONT || "/";
  const redirectUrl = new URL(baseUrl, window.location.origin);
  redirectUrl.searchParams.set("returnToApps", "true");
  window.location.assign(redirectUrl.toString());
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
        (data: any) => data.Nombre === "PLATAFORMA DE ACCESO ÚNICO Y APLICACIONES"
      );
      return valid;
    })
    .catch((error) => {
      if (error.response.status === 409) {
        localStorage.clear();
      }
    });
};
