import {
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AppsIcon from "@mui/icons-material/Apps";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { TimerCounter } from "./timer/timer";
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { VisualizadorAyudas } from "../screens/Ayuda/VisualizadorAyudas";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpIcon from "@mui/icons-material/Help";
import { getAyuda } from "../screens/Ayuda/ServicesAyuda";
import LockResetIcon from '@mui/icons-material/LockReset';
import { ChangePassword } from "./changePassword/ChangePassword";



interface MenuObject {
  Id: string;
  FechaDeCreacion: string;
  UltimaModificacion: string;
  CreadoPor: string;
  ModificadoPor: string;
  Deleted: number;
  Menu: string;
  Descripcion: string;
  MenuPadre: string;
  Icon: string | null;
  Path: string;
  Nivel: number;
  Orden: number;
  ControlInterno: string | null;
  IdApp: string;
  item: MenuObject[]; // Esto es para el arreglo de objetos anidados, si los hay
}

export const IconsMenu = (icon: string) => {
  switch (icon) {
    case "InfoOutlinedIcon":
      return <InfoOutlinedIcon sx={{ mr: "10px" }} />;
    case "PeopleOutlineIcon":
      return <PeopleOutlineIcon sx={{ mr: "10px" }} />;
    case "AppsIcon":
      return <AppsIcon sx={{ mr: "10px" }} />;
    case "BusinessIcon":
      return <BusinessIcon sx={{ mr: "10px" }} />;
    case "PostAddIcon":
      return <PostAddIcon sx={{ mr: "10px" }} />;
    case "OndemandVideoIcon":
      return <OndemandVideoIcon sx={{ mr: "10px" }} />;
    case "MenuBookIcon":
      return <MenuBookIcon sx={{ mr: "10px" }} />;
    case "HelpIcon":
      return <HelpIcon sx={{ mr: "10px" }} />;
      case "LockResetIcon":
      return <LockResetIcon sx={{ mr: "10px" }} />;
    default:
      return <ArrowForwardIosIcon sx={{ mr: "10px" }} />;
  }
};

export const Header = (
  {
    menuActual,
  }: {
    menuActual: string;
  }

) => {
  const navigate = useNavigate();
  const logoutFnc = () => {
    localStorage.clear();
    window.location.assign(
      process.env.REACT_APP_APPLICATION_FRONT || "https:google.com"
    );
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const menus: MenuObject[] =
    localStorage.getItem("Menus") !== undefined &&
      localStorage.getItem("Menus") !== null
      ? JSON.parse(localStorage.getItem("Menus")!)
      : [];

  function handleCloseVAyudas() {
    setOpenVAyudas(false)
  }

  let aux = localStorage.getItem("Menus") !== undefined &&
    localStorage.getItem("Menus") !== null
    ? JSON.parse(localStorage.getItem("Menus")!)
    : [];

  // eslint-disable-next-line array-callback-return
  let idMenu = aux.find((menu: MenuObject) => { if (menu.Menu === menuActual) { return menu } })
  const [openVAyudas, setOpenVAyudas] = useState(false);

  const [openChangePAssword, setOpenChangePassword] = useState(false);

  const [arrayAyudas, setArrayAyudas] = useState<any[]>([])

  const [option, setOption] = useState("Videos");

  const nombreUsuario = localStorage.getItem("NombreUsuario")||"";

  return (

    <Grid
      container
      display={"flex"}
      alignItems="center"
      sx={{
        height: "10vh",
        width: "100%",
        border: "1px solid #b3afaf",
        justifyContent: "space-between"
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
            width: "30%",
          },

          "@media (min-width: 1400px)": {
            width: "30%",
          },

          "@media (min-width: 1870px)": {
            width: "30%",
          },

        }} >
        <Typography
          paddingLeft={3}
          fontFamily={"'Montserrat', sans-serif"}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left",
            fontSize: [20, 20, 25, 25, 25], // Tamaños de fuente para diferentes breakpoints
            color: "#AF8C55"
          }}
        >

          {nombreUsuario.toLocaleUpperCase()}
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
            width: "20%",
          },

          "@media (min-width: 768px)": {
            width: "30%",
          },

          "@media (min-width: 1140px)": {
            width: "30%",
          },

          "@media (min-width: 1400px)": {
            width: "30%",
          },

          "@media (min-width: 1870px)": {
            width: "30%",
          },
        }}
      > <>
          <Tooltip title="Menú">
            <IconButton

              onClick={handleMenu}

              sx={{ mr: "2rem", color: "#AF8C55" }}
            >
              <MenuIcon sx={{
                fontSize: '24px', // Tamaño predeterminado del icono
                '@media (max-width: 600px)': {
                  fontSize: 30, // Pantalla extra pequeña (xs y sm)
                },
                '@media (min-width: 601px) and (max-width: 960px)': {
                  fontSize: 30, // Pantalla pequeña (md)
                },
                '@media (min-width: 961px) and (max-width: 1280px)': {
                  fontSize: 40, // Pantalla mediana (lg)
                },
                '@media (min-width: 1281px)': {
                  fontSize: 40, // Pantalla grande (xl)
                },
              }} />
            </IconButton>
          </Tooltip>
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
            {menus.length > 0 && menus.map((item: MenuObject) => {
              return (<MenuItem onClick={() => navigate(item.Path)}>{IconsMenu(item.Icon || "")}{item.Menu} </MenuItem>)
            })}
            <MenuItem onClick={() => { getAyuda(setArrayAyudas, idMenu?.Id, "Videos"); setOpenVAyudas(true); setOption("Videos") }}>{IconsMenu("OndemandVideoIcon")}Ver Tutoriales </MenuItem>
            <MenuItem onClick={() => { getAyuda(setArrayAyudas, idMenu?.Id, "Guias"); setOpenVAyudas(true); setOption("Guias") }}>{IconsMenu("MenuBookIcon")}Ver Guías </MenuItem>
            <MenuItem onClick={() => { getAyuda(setArrayAyudas, idMenu?.Id, "Preguntas"); setOpenVAyudas(true); setOption("Preguntas") }}>{IconsMenu("HelpIcon")}Preguntas Frecuentes</MenuItem>
            <MenuItem onClick={() => {setOpenChangePassword(true)}}>{IconsMenu("LockResetIcon")}Cambiar Contraseña</MenuItem>
            <MenuItem onClick={() => logoutFnc()}><PowerSettingsNewIcon sx={{ mr: "10px" }} />Cerrar Sesión </MenuItem>

          </Menu>
        </>
      </Grid>
      {openChangePAssword?<ChangePassword onClose={()=>setOpenChangePassword(false)}/>:null}
      {openVAyudas ? <VisualizadorAyudas handleClose={() => { handleCloseVAyudas() }} arrayAyudas={arrayAyudas} valueTab={option}  /> : null}
    </Grid>
  );
};
