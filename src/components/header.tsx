import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import UndoIcon from '@mui/icons-material/Undo';

export const Header = () => {
  const navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
    navigate("../");
  };

  const loginFnc = () => {
    navigate("../");
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "10vh",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: 1,
      }}
    >
      <Typography sx={{fontFamily: 'MontserratSemiBold', fontSize: '1vw'}}> {localStorage.getItem("NombreUsuario")} </Typography>

      <Box
        sx={{  width: "50vw",display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img alt="logo" src={logo} style={{width: "10vw" }}/>
      </Box>

      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button onClick={() => navigate("../admin")} sx={{}}>
        <Typography sx={{ fontFamily: "MontserratSemiBold", color: "#464141" }}>
          USUARIOS
        </Typography>
      </Button>
      <Button onClick={() => navigate("../app")} sx={{}}>
        <Typography sx={{ fontFamily: "MontserratSemiBold", color: "#464141" }}>
          APLICACIONES
        </Typography>
      </Button>

      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "2vh",
          left: "2vw",
          backgroundColor: "#3c3f42",
          borderRadius: 100,
        }}
      >
   
        <Tooltip title="Login">
          <IconButton onClick={() => loginFnc()}>
            <UndoIcon sx={{ height: "5vh", width: "3vw", color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </Box>

     
      <Box
        sx={{
          position: "absolute",
          bottom: "2vh",
          right: "2vw",
          backgroundColor: "#3c3f42",
          borderRadius: 100,
        }}
      >
   
        <Tooltip title="Logout">
          <IconButton onClick={() => logoutFnc()}>
            <PowerSettingsNewIcon sx={{ height: "5vh", width: "3vw", color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
