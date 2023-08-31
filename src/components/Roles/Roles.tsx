import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menus } from "../menus/Menus";
import { getRoles } from "./RolesServices";
import ButtonsAdd from "../../screens/Componentes/ButtonsAdd";
import { DialogRoles } from "./DialogRoles";

export interface IRol {
  ControlInterno: string;
  Deleted: number;
  Descripcion: string;
  Id: string;
  Nombre: string;
}

const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];

export function Roles({
  open,
  closeModal,
  idApp,
  app,
}: {
  open: boolean;
  closeModal: Function;
  idApp: string;
  app: string;
}) {
  document.title = "Roles";

  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [bandera, setBandera] = useState(false);

  const [openMenus, setOpenMenu] = useState(false);
  const [openDialogRoles, setOpenDialogRoles] = useState(false);
  const [movimiento, setMovimiento] = useState("agregar");
  const [registroData, setRegistroData] = useState<IRol>({
    ControlInterno: "",
    Deleted: 0,
    Descripcion: "",
    Id: "",
    Nombre: "",
  });

  const [idRol, setIdRol] = useState("");
  const [rol, setRol] = useState("");

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
            <Tooltip title={"Editar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setRegistroData(cellValues.row);
                  setMovimiento("editar");
                  setOpenDialogRoles(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Editar acceso a Menus"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  if (cellValues.row.Id) {
                    setIdRol(cellValues.row.Id);
                  }

                  if (cellValues.row.Descripcion) {
                    setRol(cellValues.row.Descripcion);
                  }

                  setOpenMenu(true);
                  // handleDelete(event, cellValues);
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setRegistroData(cellValues.row);
                  setMovimiento("eliminar");
                  setOpenDialogRoles(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
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
      field: "Nombre",
      headerName: "Nombre",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 600,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "ControlInterno",
      headerName: "Control Interno",
      width: 500,
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

  useEffect(() => {
    if (!openDialogRoles) getRoles(idApp, setRoles, () => setBandera(true));
  }, [openDialogRoles]);

  return (
    <Dialog open={open} fullScreen>
      {!bandera ? (
        <Box
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
        </Box>
      ) : (
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
              border:"1px solid"
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
                whiteSpace: "nowrap" , 
                overflow:"hidden" , 
                textOverflow:"ellipsis",
                textAlign:"center",
                
                "@media (min-width: 480px)": {
                  width:"60%", 
                  fontSize: "2rem",
                },

                "@media (min-width: 768px)": {
                  width:"85%", 
                  fontSize: "1.2rem",
                },

                "@media (min-width: 1140px)": {
                  width:"85%", 
                  fontSize: "1.5rem",
                },

                "@media (min-width: 1400px)": {
                  width:"100%", 
                  fontSize: "2rem",
                },

                "@media (min-width: 1870px)": {
                  width:"100%", 
                  fontSize: "2rem",
                },
              }}>
              
                ROLES
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
              <Tooltip title={"SALIR"}>
              <IconButton
                onClick={() => {
                  closeModal();
                }}
              >
                <CloseIcon style={{ fontSize: 30 }} />{" "}
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
            <Card sx={{ height: "100%", width: "95%", boxShadow: 10 }}>
              {/* este box es la leyenda que se encuentra arriba a la izquierda */}

              <Grid
                container
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                 
                }}
              >
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
                  <AppsIcon style={{ fontSize: "60px" }} />
                </Grid>

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
                  
                  title={app}>
                    <Typography
                      fontFamily={"'Montserrat', sans-serif"}
                      fontSize={40}
                     
                      sx={{
                        whiteSpace: "nowrap" , 
                        overflow:"hidden" , 
                        textOverflow:"ellipsis",
                        textAlign:"center",
                        
                        "@media (min-width: 480px)": {
                          width:"60%", 
                          fontSize: "2rem",
                        },
    
                        "@media (min-width: 768px)": {
                          width:"85%", 
                          fontSize: "1.2rem",
                        },
    
                        "@media (min-width: 1140px)": {
                          width:"85%", 
                          fontSize: "1.5rem",
                        },
    
                        "@media (min-width: 1400px)": {
                          width:"100%", 
                          fontSize: "2rem",
                        },
    
                        "@media (min-width: 1870px)": {
                          width:"100%", 
                          fontSize: "2rem",
                        },
                      }}
                      
                    >
                      {app}
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
                      setMovimiento("agregar");
                      setOpenDialogRoles(true);
                    }}
                    agregar={true}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  height: "85%",
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: "2vh",
                }}
              >
                <MUIXDataGrid
                  id={Math.random}
                  columns={columns}
                  rows={roles}
                  camposCsv={camposCsv}
                />
              </Box>
            </Card>
          </Grid>
          
        </Grid>
      )}
      {openMenus && (
        <Menus
          open={openMenus}
          closeModal={() => {
            setOpenMenu(false);
          }}
          idRol={idRol}
          rol={rol}
          idApp={idApp}
        />
      )}
      {openDialogRoles && (
        <DialogRoles
          open={openDialogRoles}
          closeDialog={setOpenDialogRoles}
          reloadData={registroData}
          movimiento={movimiento}
          IdApp={idApp}
        />
      )}
    </Dialog>
  );
}


