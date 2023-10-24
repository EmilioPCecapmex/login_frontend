import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import Swal from "sweetalert2";

export const getAdminMenu = (
    IdApp: string,
    setState: Function,
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
      })
      .catch(() => {
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
      alertaExito(fnc, "Menú creado!");
    });
};

export const getMenusPadre = (setState: Function,IdApp: String) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_DEV + "/api/AdminMenu", {
      params: { IdApp: IdApp,Tabla: "Menus", ValorCondicion: localStorage.getItem("IdApp") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.data);
    });
};

export const getMenus = (IdApp:string,setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_DEV + "/api/listas", {
      params: { Tabla: "Menus", ValorCondicion: IdApp },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.data);
    });
};

export const deleteAdminMenu = async(IdMenu:string) => {
  await axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminMenu",
    data: {IdMenu:IdMenu,
      IdUsuario: localStorage.getItem("IdUsuario")||""},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then((r) => {
      if(r.data.data){
        alertaExito(()=>{});
      }
      else{
        alertaError()
      }
    })
    .catch(() => {
      alertaError();
    });
};

export const editarMenu = (
  data: any,
  setOpen: Function,
) => {
  axios({
    method: "put",
    data: data,
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminMenu",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then((r) => {
      alertaExito(()=>{});
      
      setOpen(false);
    })
    .catch((e) => {
      let mensaje =
        e.response.data.error === "Ingrese IdModificador válido."
          ? "No se detectaron cambios"
          : e.response.data.error;
      Swal.fire({
        icon: "info",
        confirmButtonColor: "#000E4E",
        title: "Mensaje",
        text: "( " + mensaje + " ) ",
      });
    });
};