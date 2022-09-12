import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";


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

  const closeModal = () => {
    localStorage.clear();
    closeM();

  }

  const [appsList, setAppsList] = useState(apps);
  const [userDetails, setUserDetails] = useState<Usuario>();



  const token : string = localStorage.getItem("jwtToken") || "";


  useEffect(() => {
    axios.post('http://10.200.4.105:5000/api/user-detail', {
      IdUsuario: localStorage.getItem("IdUsuario"),
    }, {headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }}).then((r) => {
      if(r.status === 200){
        setUserDetails(r.data.data)
      }
    }).catch((error) => {
        console.log(error)
    })
  }, [])

  console.log(Object.values(appsList).length)

  


  return (
    <Box>
      <Modal open={openM}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30vw",
            height: "45vh",
            bgcolor: "background.paper",
            boxShadow: 50,
            p: 4,
            borderRadius: 3,
          }}
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
            > Bienvenido  {userDetails?.Nombre},
            </Typography>
            <Typography
              sx={{
                mt: '1vh',
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
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap"  
                      }}
          >
            {
            Object.values(appsList).map((item) => {
              return (
                <Button
                  variant="outlined"
                  key={item.IdApp}
                  sx={{
                    borderColor: "#62787B",
                    width: "20%",
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
            })
            
            }
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "4vh",
              mr: '5vw',
              ml: '5vw'
            }}
          >
            <Button
              sx={{ color: "#000", fontFamily: "MontserratMedium" }}
              onClick={() => closeModal()}
            >
              Cancelar
            </Button>
           
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export interface Usuario {
  Id:                   string;
  Nombre:               string;
  ApellidoPaterno:      string;
  ApellidoMaterno:      string;
  NombreUsuario:        string;
  CorreoElectronico:    string;
  UltimoInicioDeSesion: string;
  EstaActivo:           number;
  CreadoPor:            string;
  ModificadoPor:        string;
  Deleted:              number;
}
