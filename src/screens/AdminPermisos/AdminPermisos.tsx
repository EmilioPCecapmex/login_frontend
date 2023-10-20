import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { DialogAdminPermisos } from "./DialogAdminPermisos";
import { getAdminPermisos } from "./AdminPermisosServices";

export interface IPermiso {
    ControlInterno: string;
    Deleted: number;
    Descripcion: string;
    Id: string;
    NombrePermiso: string;  
  }

export function AdminPermisos ({
    open,
    closeModal,
    Menu,
    IdMenu,
    IdApp,
    }:{
    open: boolean;
    closeModal: Function;
    Menu: string;
    IdMenu: string;
    IdApp: string;
    }) {
        const columns = [
            {
              field: "acciones",
              headerName: "Acciones",
              width: 175,
              headerAlign: "left",
              hideable: false,
              renderCell: (cellValues: any) => {
                return (
                  <Box>
                    {/* <Tooltip title={"Editar"}>
                      <IconButton
                        sx={{ color: "black" }}
                        onClick={(event) => {
                          setRegistroData(cellValues.row);
                          setMovimiento("Editar");
                          setOpenDialogRoles(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip> */}
                    {/* <Tooltip title={"Editar Acceso a Menús"}>
                      <IconButton
                        sx={{ color: "black" }}
                        onClick={(event) => {
                          if (cellValues.row.Id) {
                            setIdRol(cellValues.row.Id);
                          }
        
                          if (cellValues.row.Nombre) {
                            setRol(cellValues.row.Nombre);
                          }
        
                          setOpenMenu(true);
                          // handleDelete(event, cellValues);
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip> */}
                    {/* <Tooltip title={"Eliminar"}>
                      <IconButton
                        sx={{ color: "black" }}
                        onClick={(event) => {
                          handleDeleteBtnClick(cellValues);
                          // setRegistroData(cellValues.row);
                          // setMovimiento("eliminar");
                          // setOpenDialogRoles(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip> */}
                  </Box>
                );
              },
            },
            // {
            //     field: "Id",
            //     headerName: "Id",
            //     width: 250,
            //     hideable: false,
            //     headerAlign: "left",
        
            // },
            {
              field: "Permiso",
              headerName: "Nombre Permiso",
              width: 300,
              hideable: false,
              headerAlign: "left",
            },
            {
              field: "Descripcion",
              headerName: "Descripción",
              width: 500,
              hideable: false,
              headerAlign: "left",
            },
            {
              field: "ControlInterno",
              headerName: "Control Interno",
              width: 300,
              hideable: false,
              headerAlign: "left",
            },
            // {
            //     field: "Deleted",
            //     headerName: "Eliminado",
            //     width: 150,
            //     hideable: false,
            //     headerAlign: "left",
            //     renderCell: (cellValues: any) => {
            //         return (
            //             cellValues.row.Deleted===0?"Activo":"No Activo"
            //         );
            //     },
            // }
          ];
          const [openDialogAdminPermisos, setOpenDialogAdminPermisos] = useState(false);
          const [movimiento, setMovimiento] = useState("Agregar");
          const [permisos, setPermisos] = useState<Array<IPermiso>>([]);

          const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];
    
          useEffect(()=>{
            getAdminPermisos(IdMenu,setPermisos)
          },[])
    
    
    return(<Dialog open={open} fullScreen>
        {/* <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: "90",
              }}
            >
              <CircularProgress size={300} />
            </Box> */}
            <Grid container sx={{ width: "100vw", height: "100vh" }}>
              <Grid
                container
                item
                xl={12}
                sx={{
                  height: "10%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  border: "1px solid"
                  // bgcolor: "#c4a57b",
                }}
              >
                <Grid
                  item
                  xl={10}
                  xs={10}
                  lg={10}
                  md={10}
                  sm={10}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
    
                  }}
                >
                  <Typography
                    fontFamily={"'Montserrat', sans-serif"}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                      color: "#AF8C55"
                    }}>
    
                    Permisos
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  xs={1}
                  lg={1}
                  md={1}
                  sm={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
    
                  }}
                >
                  <Tooltip title={"Salir"}>
                    <IconButton
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      <CloseIcon sx={{
                        fontSize: [30,30,30,40,40]
                      }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
    
              <Grid
                container
                item
                xl={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "85%",
    
                }}
              >
                <Grid sx={{ height: "100%", width: "100%" }}>
                  {/* este box es la leyenda que se encuentra arriba a la izquierda */}
    
                  <Grid
                    container
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
    
                    }}
                  >
                    {/* <Grid
                      item
                      xl={2}
                      xs={2}
                      md={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
    
                      }}
    
                    >
                      <AppsIcon sx={{
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
                    </Grid> */}
    
                    <Grid
                      item
                      xl={8}
                      xs={8}
                      md={8}
                      sx={{
                        height: "10vh",
                        maxHeight: "10vh",
                        overflow: "clip",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
    
    
                      }}
    
                    >
                      <Tooltip
                        //sx={{ fontFamily: "Montserrat-Bold"}}
    
                        title={Menu}>
                        <Typography
                         fontFamily={"'Montserrat', sans-serif"}
                         sx={{
                           whiteSpace: "nowrap",
                           overflow: "hidden",
                           textOverflow: "ellipsis",
                           textAlign: "center",
                           fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                           color: "#AF8C55"
                         }}
                        >
                          {Menu}
                        </Typography>
                      </Tooltip>
                    </Grid>
    
                    <Grid
                      item
                      xl={2}
                      xs={2}
                      md={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ButtonsAdd
                        handleOpen={() => {
                          setMovimiento("Agregar");
                          setOpenDialogAdminPermisos(true);
                        }}
                        agregar={true}
                      />
                    </Grid>
                  </Grid>
    
                  <Box
                    sx={{
                      height: "88%",
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                      paddingTop: "2vh",
                    }}
                  >
                      <MUIXDataGrid
                        id={Math.random}
                        columns={columns}
                        rows={permisos}
                        camposCsv={camposCsv}
                      />
                  </Box>
                </Grid>
              </Grid>
    
            </Grid>
    
            {openDialogAdminPermisos && (
            <DialogAdminPermisos
              open={openDialogAdminPermisos}
              closeDialog={setOpenDialogAdminPermisos}
              //reloadData={registroData}
              movimiento={movimiento}
              IdApp={IdApp}
              Menu={Menu}
              IdMenu={IdMenu}
              
            />
          )}
            
    </Dialog>)
    
      }