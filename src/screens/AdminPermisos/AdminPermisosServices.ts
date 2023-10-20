import axios from "axios";
import { alertaExito } from "../../components/alertas/toast";

export const getAdminPermisos = (
  IdMenu: string,  
  setState: Function,
    //bandera: Function
)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminPermiso",
        params: { IdMenu: IdMenu},
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
}

export const createAdminPermiso = (data: any, fnc: Function) => {
    axios
      .post(process.env.REACT_APP_APPLICATION_DEV + "/api/AdminPermiso", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        console.log(r.data.data);
        alertaExito(fnc, "Permiso creado!");
      });
  };