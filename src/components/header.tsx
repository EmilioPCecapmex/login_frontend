import { Box, Button, IconButton, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

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
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        boxShadow: 10,
      }}
    >
      <Button onClick={() => navigate("../admin")}>
        Usuario
      </Button>
      <Box sx={{ position: "absolute", top: "2vh", width: "10vw" }}>
        <img alt="logo" src={logo} />
      </Box>
      <Button onClick={() => navigate("../app")}>
        Aplicaciones
      </Button>

      <Box sx={{ position: "absolute", top: "2vh", right: "2vw" }}>
        <IconButton onClick={() => logoutFnc()}>
          <PowerSettingsNewIcon
            sx={{ height: "5vh", width: "3vw", color: "#7D0000" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
