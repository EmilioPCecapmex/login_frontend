import axios from "axios";

export const saveFile = (TabValue: string, archivo: { archivo: File; nombreArchivo: string },idMenu:string,pregunta:string,texto:string,) => {
    const url = new File([archivo.archivo], archivo.nombreArchivo);
    let ruta=""
    TabValue==="Guias"?ruta='/GUIAS/':ruta='/VIDEOS/TUTORIALES/';
    ruta=(process.env.REACT_APP_DOC_ROUTE||'') + ruta
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", url); // probar mandar archivo.archivo

    axios.post(
        process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
        dataArray,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken")||"",
          },
        }
      )
      .then(({data}) => {

        
        createAyuda({
            IdMenu:idMenu,
            Pregunta:pregunta,
            Texto:texto,
            RutaGuia:data?.RESPONSE.RUTA,
            RutaVideo:data?.RESPONSE.RUTA,
            NombreArchivo:archivo.nombreArchivo,
            IdUsuario:localStorage.getItem("IdUsuario")
        })
        
        // state.savePathDocAut(
        //   idRegistro,
        //   data.RESPONSE.RUTA,
        //   data.RESPONSE.NOMBREIDENTIFICADOR,
        //   data.RESPONSE.NOMBREARCHIVO
        // );
      })
      .catch((e) => { });
  }

  export const createAyuda=(data:any)=>{
    axios.post(
        process.env.REACT_APP_APPLICATION_DEV + '/api/ayuda',
        data,
        {params:{Tabla:'Menus',ValorCondicion:localStorage.getItem("IdApp")},
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken")||"",
          },
        }
      ).then((r)=>{console.log(r.data.data);
        
      });
  }

  export const getMenus=(setState:Function)=>{
    axios.get(
        process.env.REACT_APP_APPLICATION_DEV + '/api/listas',
        {params:{Tabla:'Menus',ValorCondicion:localStorage.getItem("IdApp")},
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken")||"",
          },
        }
      ).then((r)=>{console.log(r.data.data);
        setState(r.data.data)
      });
  }

  export const getAyuda=(setState:Function, IdMenu:string,Opcion:string)=>{
    axios.get(
        process.env.REACT_APP_APPLICATION_DEV + '/api/ayuda',
        {
        params:{Opcion:Opcion,IdMenu:IdMenu},
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken")||"",
          },
        }
      ).then((r)=>{console.log(r.data.data);
        setState(r.data.data)
      });
  }