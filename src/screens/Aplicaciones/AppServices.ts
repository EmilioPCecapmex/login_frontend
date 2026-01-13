import axios from "axios";
import { alertaError } from "../../components/alertas/toast";

export const getAllApps = (setState:Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/apps", {
        params: { IdUsuario: localStorage.getItem("IdUsuario") },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((response) => {
        setState(response.data.data);
      })
      .catch(function (error) {
        alertaError("(" + error.response.status + ") " + error.response.data.msg)
        
      });
  };