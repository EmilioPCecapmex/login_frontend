import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AppsModal({
  openM,
  closeM,
  type,
  text,
  apps,
}: {
  openM: boolean;
  closeM: Function;
  type: string;
  text: string;
  apps: Object;
}) {
  const UseIcon = ({ v }: { v: string }) => {
    switch (v) {
      case "success":
        return (
          <DoneAllIcon
            sx={{ width: "10vw", height: "10vh", color: "#31B214" }}
          />
        );
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const closeModal = () => {
    localStorage.clear();
    closeM();
  };

  const [userDetails, setUserDetails] = useState<Usuario>();

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/user-detail",
        {
          IdUsuario: localStorage.getItem("IdUsuario") || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          setUserDetails(r.data.data);
        }
      });
  }, []);

  const openPage = (t: string) => {
    if(t !== "./admin"){
      window.location.assign(t+"?jwt="+ localStorage.getItem("jwtToken")+"&rf=" + localStorage.getItem("refreshToken"))

    }else if(t === "./admin"){
      navigate(t)
    }
  }

  return (
      <Dialog open={openM} fullWidth maxWidth= "sm" >
        <Box
     
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UseIcon v={type} />
          </Box>
          <Box sx={{ mt: "3vh" }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: "1vw",
                color: "#808080",
              }}
            >
              Bienvenido {userDetails?.Nombre},
            </Typography>
            <Typography
              sx={{
                mt: "1vh",
                textAlign: "center",
                fontFamily: "MontserratMedium",
                fontSize: ".8vw",
                color: "#808080",
              }}
            >
              {text}
            </Typography>
          </Box>

          <Box
            sx={{              
              mt: "2vh",
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {Object.values(apps).map((item) => {
              return (
                <Button
                  variant="outlined"
                  key={item.IdApp}
                  onClick={() => openPage(item.Path)}
                  sx={{
                    borderColor: "#62787B",
                    width: "30%",
                    height: "7vh",
                    mt: 1,
                    mr: 1,
                    ml: 1,
                    color: "#62787B",
                    fontFamily: "MontserratMedium",
                  }}
                >
                  {item.Nombre}
                </Button>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "4vh",
              mr: "5vw",
              ml: "5vw",
            }}
          >
            <Button
            color="error"
              sx={{ fontFamily: "MontserratMedium" }}
              onClick={() => closeModal()}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Dialog>
  );
}

export interface Usuario {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  UltimoInicioDeSesion: string;
  EstaActivo: number;
  CreadoPor: string;
  ModificadoPor: string;
  Deleted: number;
  NombreCreadoPor: string;
  NombreModificadoPor: string;
}
