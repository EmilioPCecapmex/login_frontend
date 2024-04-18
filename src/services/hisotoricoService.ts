import axios from "axios";
import { alertaError } from "../components/alertas/toast";

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