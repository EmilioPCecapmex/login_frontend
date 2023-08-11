import axios from "axios"
import { alertaError, alertaExito } from "../alertas/toast";

export const getRoles=(IdApp:string,setState:Function,bandera:Function)=>{
    axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/roles",
        params: { IdApp:IdApp },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }).then(
        ({data})=>{ 
          console.log(data.data[0]);
          
          if(data.data[0].Id){
             setState(data.data)
          }
          // setTimeout(() => {
            bandera();
          // }, 750);
          
        }
      ).catch(
        ()=>{bandera();setState([])}
      )
}

export const createRol = (datos: any, fnc: Function) => {
  axios({
    method: "post",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/rol",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  }).then(
    ({ data }) => {
      console.log("create", data.data.Respuesta);
      if (data.data.Respuesta) {
        alertaExito(fnc,data.data.Respuesta)
      }
    }

  ).catch(
    ({response}) => {console.log("e",response.data.error); alertaError(response.data.error) }
  )
}

export const modifyRol = (datos: any, fnc: Function) => {
  axios({
    method: "put",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/rol",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  }).then(
    ({ data }) => {
      console.log("create", data);
      alertaExito(fnc)
    }
  ).catch(
    ({response}) => {console.log(response);
     alertaError(response.data.error) }
  )
}

export const deleteRol = (datos: any, fnc: Function) => {
  axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/rol",
    data: datos,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  }).then(
    ({ data }) => {
      console.log("create", data);
      alertaExito(fnc)
    }
  ).catch(
    ({response}) => {console.log(response);
     alertaError(response.data.error) }
  )
}