import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import Swal from "sweetalert2";

export const getAdminAvisos = (
    IdApp: string,
    setState: Function,
  ) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminAviso",
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

export const createAdminAvisos = (data: any, fnc: Function) => {
  axios
    .post(process.env.REACT_APP_APPLICATION_DEV + "/api/AdminAviso", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      alertaExito(fnc, "Aviso creado!");
    }).catch(({response})=>{
    alertaError(response?.data?.error)});
};



export const deleteAdminAviso = async(IdAviso:string) => {
  await axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminAviso",
    data: {IdAviso:IdAviso,
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

export const editarAviso = (
  data: any,
  setOpen: Function,
) => {
  axios({
    method: "put",
    data: data,
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminAviso",
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