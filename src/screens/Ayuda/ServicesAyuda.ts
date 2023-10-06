import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";

export const saveFile = (
  TabValue: string,
  archivo: { archivo: File; nombreArchivo: string },
  idMenu: string,
  pregunta: string,
  texto: string,
  handleClose: Function
) => {
  const url = new File([archivo.archivo], archivo.nombreArchivo);
  let ruta = "";
  TabValue === "Guias" ? (ruta = "/GUIAS/") : (ruta = "/VIDEOS/TUTORIALES/");
  ruta = (process.env.REACT_APP_DOC_ROUTE || "") + ruta;
  let dataArray = new FormData();
  dataArray.append("ROUTE", `${ruta}`);
  dataArray.append("ADDROUTE", "true");
  dataArray.append("FILE", url); // probar mandar archivo.archivo

  axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
      dataArray,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data }) => {
      if (TabValue === "Guias") {
        if (data) {
          createAyuda(
            {
              IdMenu: idMenu,
              Pregunta: pregunta,
              Texto: "",
              RutaGuia: data?.RESPONSE.RUTA,
              NombreArchivo: archivo.nombreArchivo,
              IdUsuario: localStorage.getItem("IdUsuario"),
            },
            handleClose
          );
        } else {
          alertaError("Error al cargar archivo");
        }
      } else {
        if (data) {
          createAyuda(
            {
              IdMenu: idMenu,
              Pregunta: "",
              Texto: "",
              RutaGuia: "",
              RutaVideo: data?.RESPONSE.RUTA,
              NombreArchivo: archivo.nombreArchivo,
              IdUsuario: localStorage.getItem("IdUsuario"),
            },
            handleClose
          );
        } else {
          alertaError("Error al cargar archivo");
        }
      }
    })
    .catch((e) => {
      alertaError();
    });
};

export const getFileByName= async(ROUTE:string,NOMBRE:string,setState:Function)=>{
  await axios
  .post(
    process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/GetByName",
    {
      ROUTE: ROUTE,
      NOMBRE: NOMBRE,
    },
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
        responseType: "blob",
      },
    }
  )
  .then(({ data }) => {
    console.log("data",data);
    
    setState(data.RESPONSE.FILE);
  })
  .catch((r) => {alertaError("Ocurrio un problema al obtener el archivo")});
};


export const createAyuda = (data: any, handleClose: Function) => {
  axios
    .post(process.env.REACT_APP_APPLICATION_DEV + "/api/ayuda", data, {
      params: { Tabla: "Menus", ValorCondicion: localStorage.getItem("IdApp") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(r.data.data);
      alertaExito(handleClose);
    });
};

export const getMenus = (setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_DEV + "/api/listas", {
      params: { Tabla: "Menus", ValorCondicion: localStorage.getItem("IdApp") },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(r.data.data);
      setState(r.data.data);
    });
};

export const getAyuda = (
  setState: Function,
  IdMenu: string,
  Opcion: string
) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_DEV + "/api/ayuda", {
      params: { IdMenu: IdMenu, Opcion: Opcion },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      console.log(r.data.data);
      setState(r.data.data);
    });
};

export const deleteAyuda = (IdPreguntaFrecuente:string, IdUsuario:string,fnc:Function) => {
  axios({
    method: "delete",
    url: process.env.REACT_APP_APPLICATION_DEV + "/api/ayuda",
    data: {IdPreguntaFrecuente:IdPreguntaFrecuente,
      IdUsuario: IdUsuario},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then((r) => {
      alertaExito(fnc());
    })
    .catch(() => {
      alertaError();
       //fnc();
    });
};