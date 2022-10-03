import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = () => {
  const navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
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
        justifyContent: "flex-end",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{ position: "absolute", top: "2vh", left: "5vw", width: "10vw" }}
      >
        <img alt="logo" src={logo} />
      </Box>

      <Button onClick={() => navigate("../admin")} sx={{ mr: "5vw" }}>
        <Typography sx={{ fontFamily: "MontserratMedium", color: "#464141" }}>
          USUARIOS
        </Typography>
      </Button>
      <Button onClick={() => navigate("../app")} sx={{ mr: "5vw" }}>
        <Typography sx={{ fontFamily: "MontserratMedium", color: "#464141" }}>
          APLICACIONES
        </Typography>
      </Button>

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
            <LogoutIcon sx={{ height: "5vh", width: "3vw", color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
