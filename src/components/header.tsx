import {
  Avatar,
  Badge,
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
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
      <Typography sx={{ fontFamily: 'MontserratSemiBold', fontSize: '1vw' }}> {localStorage.getItem("NombreUsuario")} </Typography>

      <Box
        sx={{ width: "50vw", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img alt="logo" src={logo} style={{ width: "10vw" }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


        <Tooltip title="Solicitudes">
          <Badge badgeContent={4} color="primary">
            <IconButton onClick={() => navigate("../solicitudes")}
              sx={[
                {
                  "&:hover": {
                    color: "#c4a57b",
                  },
                },
              ]}>
              <NotificationsIcon />
            </IconButton>
          </Badge>
        </Tooltip>



        <Tooltip title="Usuarios">
          <IconButton onClick={() => navigate("../admin")}
            sx={[
              {
                "&:hover": {
                  color: "#c4a57b",
                },
              },
            ]}>
            <PeopleOutlineIcon />
          </IconButton>
        </Tooltip>



        <Tooltip title="Aplicaciones">
          <IconButton onClick={() => navigate("../app")}
            sx={[
              {
                "&:hover": {
                  color: "#c4a57b",
                },
              },
            ]}>
            <AppsIcon />
          </IconButton>
        </Tooltip>


        <Tooltip title="Regresar al login">
          <IconButton onClick={() => loginFnc()}
            sx={[
              {
                "&:hover": {
                  color: "#c4a57b",
                },
              },
            ]}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton onClick={() => logoutFnc()}
            sx={[
              {
                "&:hover": {
                  color: "#c4a57b",
                },
              },
            ]}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Tooltip>

      </Box>
    </Box >
  );
};
