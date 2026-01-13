import axios from "axios";
import { alertaError, alertaInformativa } from "../components/alertas/toast";
import dayjs, { Dayjs } from "dayjs"; // Importar dayjs

export const getMovimientosTrazabilidad = (
    IdRegistro:string,
    setState:Function
  ) => {
    axios({
      method: "get",
      params: {
        IdRegistro: IdRegistro,
      },
      url: process.env.REACT_APP_APPLICATION_DEV + `/api/historico`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") ||'',
      },
    })
      // aqui se recibe lo del endpoint en response
      .then( ({ data }) => {
        
        if(data.data.length > 0){
            setState(data.data);
        }else{
            alertaError("Sin registros  ");
        }
         
      })
      .catch( (r) => {
        setState([]);
         alertaError("Sin registros  ");
      });
  };

  export const getActividadUsuarios = async (selectedDate: Dayjs|null,selectedDateEnd: Dayjs|null) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/activity-users",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          fecha:selectedDate?selectedDate.format("YYYY-MM-DD"):dayjs().format("YYYY-MM-DD"),
          fechaFinal:selectedDateEnd?selectedDateEnd.format("YYYY-MM-DD"):dayjs().format("YYYY-MM-DD") // Enviar la fecha seleccionada como parámetro
        },
      });
  
      // Devolver los datos obtenidos en la respuesta
      return response.data.data;
  
    } catch (error) {
      alertaInformativa("Ocurrio un error inesperado, intente más tarde");
      // Retornar un array vacío si hay error
      return [];
    }
  };
  