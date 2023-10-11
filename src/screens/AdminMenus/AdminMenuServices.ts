import axios from "axios";
import { alertaExito } from "../../components/alertas/toast";


export const getAdminMenu = (
    IdApp: string,
    setState: Function,
    //bandera: Function
  ) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminMenu",
      params: { IdApp: IdApp },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        if (data.data[0].Id) {
          setState(data.data);
        }
        // setTimeout(() => {
        //bandera();
        // }, 750);
      })
      .catch(() => {
        //bandera();
        setState([]);
      });
  };

export const createAdminMenu = (data: any, fnc: Function) => {
  axios
    .post(process.env.REACT_APP_APPLICATION_DEV + "/api/AdminMenu", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(r.data.data);
      alertaExito(fnc, "¡Registro creado!");
    });
};