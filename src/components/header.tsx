import {
  Badge,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
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
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';

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
  // const [openMenu,setOpenMenu]=useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   getSolicitudes()
  // }, [])

  return (
    
      <Grid
        container
        display={"flex"}
        alignItems="center"
        sx={{
          height: "10vh",
          width: "100%",
          border: "1px solid #b3afaf",
          justifyContent:"space-between"
        }}
      >
      <TimerCounter />
        {/* grid del nombre */}
          <Grid item 
          sx={{
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
              
              {localStorage.getItem("NombreUsuario")}
            </Typography>
          </Grid>
          {/* imagen */}
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
            display={"flex"}
            height={"100%"}
            justifyContent={"flex-end"}
            sx={{
              height: "40px",
              alignItems: "center",
              justifyContent: "flex-end",

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
          > <>
              <IconButton
                
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon sx={{fontSize:"3rem"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("../catalogos")}><BusinessIcon />Catálogos</MenuItem>
                <MenuItem onClick={()=>{}}>My account</MenuItem>
              </Menu>
              </>
              {/* <Tooltip title="Catálogos">
                <IconButton
                  //className="iconos-header"
                  onClick={}
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
              </Tooltip> */}
          

          </Grid>

        



      </Grid>
    
  );
};
