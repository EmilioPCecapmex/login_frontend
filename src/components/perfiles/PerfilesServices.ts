import axios from "axios";
import { alertaError, alertaExito } from "../alertas/toast";

export const getPerfiles = (
  IdApp: string,
  setState: Function,
  bandera: Function
) => {
  axios({
    method: "get",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/perfiles",
    params: { IdApp: IdApp },
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      if (data.data) {
        setState(data.data);
      }
      bandera();
    })
    .catch(() => {
      bandera();
      setState([]);
    });
};

export const createPerfiles = (datos: any, fnc: Function) => {
  axios({
    method: "post",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/perfil",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      if (data.data.Respuesta) {
        alertaExito(fnc, data.data.Respuesta);
      }
    })
    .catch(({ response }) => {
      alertaError(response.data.error);
    });
};

export const modifyPerfiles = (datos: any, fnc: Function) => {
  axios({
    method: "put",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/perfil",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      alertaExito(fnc);
    })
    .catch(({ response }) => {
      alertaError(response.data.error);
    });
};

export const deletePerfiles = (datos: any, fnc: Function) => {
  axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/perfil",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      alertaExito(fnc);
    })
    .catch(({ response }) => {
      alertaError(response.data.error);
    });
};
