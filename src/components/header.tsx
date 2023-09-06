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
        display={"flex"}
        alignItems="center"
        sx={{
          height: "10vh",
          width: "100%",
          border: "1px solid #b3afaf",
        }}
      >
        <Grid container width="100%"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >

          <Grid item sx={{
            "@media (min-width: 480px)": {
              width: "50%",
            },

            "@media (min-width: 768px)": {
              width: "30%",
            },

            "@media (min-width: 1140px)": {
              width: "20%",
            },

            "@media (min-width: 1400px)": {
              width: "20%",
            },

            "@media (min-width: 1870px)": {
              width: "20%",
            },

          }} >
            <Typography
              paddingLeft={3}
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "25%",
                "@media (min-width: 480px)": {
                  fontSize: "1.5rem"
                },
              }}

            >
              {" "}
              {localStorage.getItem("NombreUsuario")}{" "}
            </Typography>
          </Grid>

          <Grid item display={"flex"} justifyContent="center">
            <Hidden mdDown>
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
            </Hidden>
          </Grid>


          <Grid
            item
            direction={"row"}
            sx={{
              height: "40px",
              alignItems: "center",
              justifyContent: "center",

              "@media (min-width: 480px)": {
                width: "50%",
              },

              "@media (min-width: 768px)": {
                width: "30%",
              },

              "@media (min-width: 1140px)": {
                width: "25%",
              },

              "@media (min-width: 1400px)": {
                width: "20%",
              },

              "@media (min-width: 1870px)": {
                width: "20%",
              },
            }}
          >

            <Grid>
              <TimerCounter />
            </Grid>


            <Grid container width={"100%"} sx={{
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Tooltip title="Catálogos">
                <IconButton
                  //className="iconos-header"
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

        </Grid>



      </Grid>
    </div>
  );
};
