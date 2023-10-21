import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import Swal from "sweetalert2";


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

  export const deleteAdminPermiso = async(IdPermiso:string) => {
    await axios({
      method: "delete",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminPermiso",
      data: {IdPermiso:IdPermiso,
        IdUsuario: localStorage.getItem("IdUsuario")||""},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then((r) => {
        alertaExito(()=>{});
      })
      .catch(() => {
        alertaError();
      });
  };

  export const editarPermiso = (
    path: string,
    data: any,
    setOpen: Function,
    reloadData: Function
  ) => {
    axios({
      method: "put",
      data: data,
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/AdminPermiso",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then((r) => {
        reloadData(String(Math.random()));
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