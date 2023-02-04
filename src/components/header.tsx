import {
  Badge,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import UndoIcon from '@mui/icons-material/Undo';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AppsIcon from '@mui/icons-material/Apps';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from "axios";
import { TimerCounter } from "./timer/timer";

export const Header = () => {
  const navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
    navigate("../");
  };


  const [solCount, setSolCount] = useState(0)

  const getSolicitudes = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV +"/api/solicitudes", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setSolCount(r.data.data.length)
        }
      });
  };

  useEffect(() => {
getSolicitudes()
  },[])


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
      <TimerCounter />
      <Box
        sx={{ width: "50vw", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img alt="logo" src={logo} style={{ width: "10vw" }} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


        <Tooltip title="Solicitudes">
          <Badge badgeContent={solCount} color="primary">
            <IconButton onClick={() => navigate("../solicitudes")}
              sx={[
                {
                  "&:hover": {
                    color: "#c4a57b",
                  },
                },
              ]}>
              <PostAddIcon />
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
