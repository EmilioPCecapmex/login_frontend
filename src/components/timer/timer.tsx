// import { Box } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { continueSession, logout } from "../../funcs/validation";
import { Box } from "@mui/material";

export const TimerCounter = () => {
  const [actualDate, setActualDate] = useState(new Date());

  var rest = parseInt(localStorage.getItem("sessionT") as string);

  const [messageSend, setMessageSend] = useState(true);

  setTimeout(() => {
    const session = new Date(localStorage.getItem("sUntil") as string);
    var dateT = new Date();
    localStorage.setItem("actualD", dateT as unknown as string);
    setActualDate(new Date(localStorage.getItem("actualD") as string));
    localStorage.setItem(
      "sessionT",
      (session.getTime() - actualDate.getTime()).toString()
    );
    if ((rest<5)) {
      logout();
    }
  }, 1000);

  useEffect(() => {
    if (Math.floor(rest / 60 / 1000) <= 2 && rest > 0 && messageSend) {
      setMessageSend(false);
      alertaSession();
    }
  }, [Math.floor(rest / 60 / 1000) < 2]);

  useEffect(() => {
    if (Math.floor(rest / 60 / 1000) <= 5 && Math.floor(rest / 60 / 1000) > 2   && rest > 0) {
      renewSession()
    }
    },[])

  const renewSession = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV  + "/api/refresh-token",
        {
          refreshToken: localStorage.getItem("refreshToken"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        if (r.data.token) {
          localStorage.setItem("jwtToken", r.data.token);
          continueSession().then((r) => {
            setTimeout(() => {
              setMessageSend(true);
            }, 5000);
          });
        }
      })
      .catch((err) => {
        logout();
      });
  };

  const alertaSession = () => {
    return Swal.fire({
      title: "Limite de tiempo",
      text: `${localStorage.getItem(
        "NombreUsuario"
      )}, el tiempo de tu sesión esta a punto de expirar. ¿Deseas renovar el tiempo de sesión?`,
      icon: "question",
      showCancelButton: true,
      
      confirmButtonColor: "#15212f",
      cancelButtonColor: "#af8c55",
      confirmButtonText: "Renovar",
      cancelButtonText: "Salir",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        renewSession();
      } else {
        logout();
      }
    });
  };

  return ( 
    null
    // <Box
    //   sx={{
    //     fontFamily: "MontserratMedium",
    //     fontSize: "10px",
    //     width: "100%",
    //     height: "10%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     color: "#B70000",
    //   }}
    // >
    //   La sesión finaliza en: {rest > 0
    //     ? Math.floor(rest / 1000 / 60).toString() +
    //       ":" +
    //       Math.floor((rest / 1000) % 60).toString()
    //     : "0:0"} minutos
    // </Box>
  );
};
