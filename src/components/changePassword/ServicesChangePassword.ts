import axios from "axios";
import { alertaError, alertaExito } from "../alertas/toast";

export function changePassword(datos:any,fnc:Function){
    const config = {
        method: 'PUT',
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/set-password",
        data: {
            ...datos,IdUsuario:localStorage.getItem("IdUsuario")|| ''
        },
        headers: {
            'Authorization': localStorage.getItem("jwtToken")|| '',
            'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según tu API
            // Otros encabezados personalizados si es necesario
          }
      };
    
      axios(config)
        .then((response) => {
            alertaExito(fnc,"La contraseña se actualizo con exito.")
        })
        .catch(({response}) => {
            console.log("error",response.data.error);
            
            alertaError(response.data.error||"Error al actualizazr la contraseña");
        });
}