import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SecurityIcon from "@mui/icons-material/Security";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Permisos } from "../Permisos/Permisos";
import {
  createMenuRol,
  deleteMenuRol,
  getMenus,
  getMenusRol,
} from "./MenusServices";
import { GridSearchIcon } from "@mui/x-data-grid";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";

export interface IMenus {
  Descripcion: string;
  Id: string;
  Menu: string;
  IdRelacion: string;
}

export function Menus({
  open,
  closeModal,
  idRol,
  rol,
  idApp,
}: {
  open: boolean;
  closeModal: Function;
  idRol: string;
  rol: string;
  idApp: string;
}) {
  document.title = "Menus";
  const camposCsv = ["Nombre", "Descripcion"];
  const columnsAsignados = [
    {
      field: "Menu",
      headerName: "Menu",
      flex: 4,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Administrar permisos"}>
              <IconButton
                onClick={() => {
                  setMenu(cellValues.row);
                  setOpenPermisos(true);
                }}
              >
                <SecurityIcon />
              </IconButton>
            </Tooltip>
            {/*title={"Quitar acceso a menu " + menu.Descripcion}> */}
            <Tooltip title={"Quitar acceso"}>
              <IconButton
                onClick={() => {
                  deleteMenuRol(cellValues.row.IdRelacion, obtenerDatos);
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const columnsSinAsignar = [
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip
              title={"Dar acceso a menu " + menu.Descripcion}
            >
              <IconButton
                onClick={() => {
                  createMenuRol(
                    idRol,
                    cellValues.row.Id,
                    localStorage.getItem("IdUsuario") || "",
                    obtenerDatos
                  );
                }}
              >
                <ControlPointIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    }, {
      field: "Menu",
      headerName: "Menu",
      flex: 4,
      headerAlign: "center",
      align: "right"
    },
  ];

  const [menus, setMenus] = useState<Array<IMenus>>([]);
  const [menusRol, setMenusRol] = useState<Array<IMenus>>([]);
  const [menusFaltantes, setMenusFaltantes] = useState<Array<IMenus>>([]);

  const [banderaMenus, setBanderaMenus] = useState(false);
  const [menu, setMenu] = useState<IMenus>({
    Descripcion: "",
    Id: "",
    Menu: "",
    IdRelacion: "",
  });
  const [openPermisos, setOpenPermisos] = useState(false);

  function obtenerDatos() {
    getMenus(idApp, setMenus, () => {
      setBanderaMenus(true);
    });
    getMenusRol(idRol, setMenusRol);
  }

  useEffect(() => {
    console.log("hola3");
    obtenerDatos();
  }, []);

  useEffect(() => {
    console.log("hola4");
    // Obtener la diferencia entre los arrays
    const diferenciaMenus = menus.filter(
      (menu) => !menusRol.find((menuRol) => menuRol.Id === menu.Id)
    );

    // Actualizar el estado con los menús faltantes
    setMenusFaltantes(diferenciaMenus);
  }, [menus, menusRol]);

  return (
    <Dialog open={open} fullScreen>
      {!banderaMenus ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "90",
          }}
        >
          <CircularProgress size={300} /> menus
        </Box>
      ) : (
        //pantalla
        <Grid
          container
          sx={{
            width: "100vw",
            height: "100%",
          }}
        >
          {/* Header */}
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              height: "8vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              border: "1px solid"
              // bgcolor: "#c4a57b",
            }}
          >

            <Grid
              item
              xs={8}
              sm={8}
              md={10}
              lg={10}
              xl={10}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}
              >
                MENUS
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={1}
              lg={1}
              xl={1}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ><Tooltip title="Salir">
                <IconButton

                  onClick={() => {
                    closeModal();
                  }}
                >
                  <CloseIcon sx={{
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
            </Grid>
          </Grid>

          {/* Body */}
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              height: "92vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >

            {/* Rol */}
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "8%",
              }}
            >
              <Typography fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}>
                {rol}
              </Typography>
            </Grid>


            {/* textos de permisos */}
            {/* ############################ */}
            <Grid container sx={{ display: "flex", height: "84vh", width: "100vw", overflow: "auto" }}>
              <Grid item container sx={{ display: "flex", justifyContent: "center", height: "84vh" }}
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}>

                <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}>
                  <Typography
                    fontFamily={"'Montserrat', sans-serif"}
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        fontSize: [20, 20, 20, 25, 25], // Tamaños de fuente para diferentes breakpoints
                        
                    }}
                  >Menus sin asignar</Typography>
                </Grid>

                <Grid
                  item
                  container
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}

                  sx={{
                    display: "flex",
                    height: "90%",
                    border: "1px  solid",
                    overflow: "auto",
                    alignContent: "flex-start",
                    justifyContent: "space-evenly",
                  }}
                >
                  <MUIXDataGrid
                    id={Math.random}
                    columns={columnsAsignados}
                    rows={menusRol}
                    camposCsv={camposCsv}
                  />
                  {
                    // menusRolFilter.map((menu) => {
                    //   return (
                    //     <Grid
                    //       container
                    //       sx={{
                    //         display: "flex",
                    //         height: "10%",
                    //         width: "95%",
                    //         border: "1px solid",
                    //         bgcolor: "#c4a57b",
                    //         boxShadow: 10,
                    //         borderRadius: 2,
                    //         alignItems: "center",
                    //         justifyContent: "center",
                    //         mt: "2vh",
                    //       }}
                    //     >
                    //       <Tooltip title={menu.Descripcion}>
                    //         <Grid item width={"65%"}>
                    //           <Typography
                    //             fontFamily={"Montserrat-Ligth"}
                    //             sx={{
                    //               whiteSpace: "nowrap",
                    //               overflow: "hidden",
                    //               textOverflow: "ellipsis",
                    //               fontSize: [20, 25, 25, 25, 25], // Tamaños de fuente para diferentes breakpoints
                    //             }}
                    //           >
                    //             {menu.Descripcion}
                    //           </Typography>
                    //         </Grid>
                    //       </Tooltip>
                    //       <Grid item maxWidth={"20%"} sx={{ display: "flex" }}>
                    //         {/*title={"Administrar permisos de " + menu.Descripcion}> */}
                    //         <Tooltip title={"Administrar permisos"}>
                    //           <IconButton
                    //             onClick={() => {
                    //               setMenu(menu);
                    //               setOpenPermisos(true);
                    //             }}
                    //           >
                    //             <SecurityIcon sx={{
                    //               fontSize: '24px', // Tamaño predeterminado del icono
                    //               '@media (max-width: 600px)': {
                    //                 fontSize: 30, // Pantalla extra pequeña (xs y sm)
                    //               },
                    //               '@media (min-width: 601px) and (max-width: 960px)': {
                    //                 fontSize: 40, // Pantalla pequeña (md)
                    //               },
                    //               '@media (min-width: 961px) and (max-width: 1280px)': {
                    //                 fontSize: 40, // Pantalla mediana (lg)
                    //               },
                    //               '@media (min-width: 1281px)': {
                    //                 fontSize: 40, // Pantalla grande (xl)
                    //               },
                    //             }} />
                    //           </IconButton>
                    //         </Tooltip>
                    //         {/*title={"Quitar acceso a menu " + menu.Descripcion}> */}
                    //         <Tooltip title={"Quitar acceso"}>
                    //           <IconButton
                    //             onClick={() => {
                    //               deleteMenuRol(menu.IdRelacion, obtenerDatos);
                    //             }}
                    //           >
                    //             <HighlightOffIcon sx={{
                    //               fontSize: '24px', // Tamaño predeterminado del icono
                    //               '@media (max-width: 600px)': {
                    //                 fontSize: 30, // Pantalla extra pequeña (xs y sm)
                    //               },
                    //               '@media (min-width: 601px) and (max-width: 960px)': {
                    //                 fontSize: 40, // Pantalla pequeña (md)
                    //               },
                    //               '@media (min-width: 961px) and (max-width: 1280px)': {
                    //                 fontSize: 40, // Pantalla mediana (lg)
                    //               },
                    //               '@media (min-width: 1281px)': {
                    //                 fontSize: 40, // Pantalla grande (xl)
                    //               },
                    //             }} />
                    //           </IconButton>
                    //         </Tooltip>
                    //       </Grid>
                    //     </Grid>
                    //   );
                    // })
                  }

                </Grid>
              </Grid>
              {/* ############################ */}
              <Grid item container sx={{ display: "flex", justifyContent: "center", height: "84vh" }}
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}>

                <Grid item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}>

                  <Typography
                    fontFamily={"'Montserrat', sans-serif"}
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        fontSize: [20, 20, 20, 25, 25], // Tamaños de fuente para diferentes breakpoints
                        
                    }}
                  >Menus sin asignar</Typography>
                </Grid>

                <Grid
                  item
                  container
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}

                  sx={{
                    display: "flex",
                    height: "90%",
                    border: "1px  solid",
                    overflow: "auto",
                    alignContent: "flex-start",
                    justifyContent: "space-evenly",
                  }}
                >
                  <MUIXDataGrid
                    id={Math.random}
                    columns={columnsSinAsignar}
                    rows={menusFaltantes}
                    camposCsv={camposCsv}
                  />
                  {
                    // menusFaltantesFilter.map((menu) => {
                    //   return (
                    //     <Grid
                    //       container
                    //       sx={{
                    //         display: "flex",
                    //         height: "10%",
                    //         width: "95%",
                    //         border: "1px solid",
                    //         bgcolor: "#c4a57b",
                    //         boxShadow: 10,
                    //         borderRadius: 2,
                    //         alignItems: "center",
                    //         justifyContent: "center",
                    //         mt: "2vh",
                    //       }}
                    //     >
                    //       <Grid item maxWidth={"10%"} minWidth={"10%"} sx={{ display: "flex" }}>
                    //         {/*title={"Administrar permisos de " + menu.Descripcion}> */}
                    //         <Tooltip
                    //           title={"Dar acceso a menu " + menu.Descripcion}
                    //         >
                    //           <IconButton
                    //             onClick={() => {
                    //               createMenuRol(
                    //                 idRol,
                    //                 menu.Id,
                    //                 localStorage.getItem("IdUsuario") || "",
                    //                 obtenerDatos
                    //               );
                    //             }}
                    //           >
                    //             <ControlPointIcon sx={{
                    //               fontSize: '24px', // Tamaño predeterminado del icono
                    //               '@media (max-width: 600px)': {
                    //                 fontSize: 30, // Pantalla extra pequeña (xs y sm)
                    //               },
                    //               '@media (min-width: 601px) and (max-width: 960px)': {
                    //                 fontSize: 40, // Pantalla pequeña (md)
                    //               },
                    //               '@media (min-width: 961px) and (max-width: 1280px)': {
                    //                 fontSize: 40, // Pantalla mediana (lg)
                    //               },
                    //               '@media (min-width: 1281px)': {
                    //                 fontSize: 40, // Pantalla grande (xl)
                    //               },
                    //             }} />
                    //           </IconButton>
                    //         </Tooltip>
                    //       </Grid>
                    //       <Grid item maxWidth={"75%"} minWidth={"75%"}>
                    //         <Tooltip title={menu.Descripcion}>
                    //           <Typography
                    //             fontFamily={"Montserrat-Ligth"}
                    //             sx={{
                    //               whiteSpace: "nowrap",
                    //               overflow: "hidden",
                    //               textOverflow: "ellipsis",
                    //               fontSize: [20, 20, 25, 25, 25], // Tamaños de fuente para diferentes breakpoints
                    //             }}
                    //             textAlign={"end"}
                    //           >
                    //             {menu.Descripcion}
                    //           </Typography>
                    //         </Tooltip>
                    //       </Grid>
                    //     </Grid>
                    //   );
                    // })
                  }
                </Grid>
              </Grid>
              {/* ############################ */}
            </Grid>



          </Grid>
        </Grid>
      )
      }
      {
        openPermisos && (
          <Permisos
            open={openPermisos}
            closeModal={() => {
              setOpenPermisos(false);
            }}
            menu={menu}
            idApp={idApp}
            idRol={idRol}
          ></Permisos>
        )
      }
    </Dialog >
  );
}
