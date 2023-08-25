import {
  Badge,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AppsIcon from "@mui/icons-material/Apps";
import PostAddIcon from "@mui/icons-material/PostAdd";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description";
import { COLOR } from "../screens/styles/colors";
import { TimerCounter } from "./timer/timer";

export const Header = () => {
  const navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
    window.location.assign(
      process.env.REACT_APP_APPLICATION_FRONT || "https:google.com"
    );
  };

  const [solCount, setSolCount] = useState(0);

  const getSolicitudes = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/solicitudes", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setSolCount(r.data.data.length);
        }
      });
  };

  // useEffect(() => {
  //   getSolicitudes()
  // }, [])

  return (
    <div className="box">
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "12vh",
          width: "100vw",
          border: "1px solid #b3afaf",
        }}
      >
        <Grid  container item xs={6} md={4} alignItems="center">
          <Typography sx={{width:"400px", whiteSpace: "nowrap" , overflow:"hidden" , textOverflow:"ellipsis"}} paddingLeft={3} fontSize={"35%"}>
            {" "} 
            {localStorage.getItem("NombreUsuario")}{" "}
          </Typography>
        </Grid>
        <Hidden mdDown>
          <Grid container item xs={3} md={4} justifyContent="center">
            <img
              alt="logo"
              src={logo}
              style={{
                objectFit: "scale-down",
                width: "60%",
                height: "100%",
                // borderRadius: '50%',
              }}
            />
          </Grid>
        </Hidden>
        <Grid
          paddingRight={3}
          item
          container
          xs={6}
          md={4}
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            height: "50px",
          }}
        >
          <TimerCounter />
          <Tooltip title="Catálogos">
            <IconButton
              className="iconos-header"
              onClick={() => navigate("../catalogos")}
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Solicitudes">
            <Badge badgeContent={solCount} color="primary">
              <IconButton
                className="iconos-header"
                onClick={() => navigate("../solicitudes")}
              >
                <PostAddIcon />
              </IconButton>
            </Badge>
          </Tooltip>

          <Tooltip title="Usuarios">
            <IconButton
              className="iconos-header"
              onClick={() => navigate("../admin")}
            >
              <PeopleOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Aplicaciones">
            <IconButton
              className="iconos-header"
              onClick={() => navigate("../app")}
            >
              <AppsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cerrar sesión ">
            <IconButton className="iconos-header" onClick={() => logoutFnc()}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};
