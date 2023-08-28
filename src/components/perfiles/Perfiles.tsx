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
import { getPerfiles } from "./PerfilesServices";
import ButtonsAdd from "../../screens/Componentes/ButtonsAdd";
import { PerfilDialog } from "./DialogPerfiles";
import { Description } from "@mui/icons-material";

export interface IPerfil {
  Id: string;
  Descripcion: string;
  Referencia: string;
}

const camposCsv = ["Id", "Descripcion", "Referencia"];

export function Perfiles({
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
  document.title = "Perfiles";

  const [bandera, setBandera] = useState(false);
  const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
  const [openPerfilesDialog, setopenPerfilesDialog] = useState(false);
  const [registroData, setRegistroData] = useState<IPerfil>({
    Id: "",
    Descripcion: "",
    Referencia: "",
  });
  const [movimiento, setMovimiento] = useState("agregar");

  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 125,
      headerAlign: "left",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Editar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setMovimiento("editar");
                  setRegistroData(cellValues.row);
                  setopenPerfilesDialog(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setMovimiento("eliminar");
                  setRegistroData(cellValues.row);
                  setopenPerfilesDialog(true);
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
    //     width: 300,
    //     hideable: false,
    //     headerAlign: "left",

    // },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Referencia",
      headerName: "Referencia",
      width: 400,
      hideable: false,
      headerAlign: "left",
    },
  ];

  useEffect(() => {
    if (!openPerfilesDialog) {
      getPerfiles(idApp, setPerfiles, () => setBandera(true));
    }
  }, [openPerfilesDialog]);
  return (
    <Dialog open={open} fullScreen>
      {!bandera ? (
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
          <CircularProgress size={300} />
        </Box>
      ) : (
        <Grid container sx={{ width: "100%", height: "100%" }}>
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
              <Typography fontFamily={"'Montserrat', sans-serif"}  sx={{
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
               
                PERFILES
              </Typography>
            </Grid>
            <Grid
              item
              xl={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title= "Cerrar">
              <IconButton
                onClick={() => {
                  closeModal();
                }}
              >
                <CloseIcon style={{ fontSize: 50 }}  />{" "}
                
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
                  <ButtonsAdd
                    handleOpen={() => {
                      setMovimiento("agregar");
                      setopenPerfilesDialog(true);
                    }}
                    agregar={true}
                  />
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
                  <Tooltip title={app}>
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
                      }}
                    >
                      {app}
                    </Typography>
                  </Tooltip>
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
                  {/* <ButtonsAdd
                    handleOpen={() => {
                      setMovimiento("agregar");
                      setopenPerfilesDialog(true);
                    }}
                    agregar={true}
                  /> */}
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
                  id={(row: any) => row.Id}
                  columns={columns}
                  rows={perfiles}
                  camposCsv={camposCsv}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
      {openPerfilesDialog && (
        <PerfilDialog
          open={openPerfilesDialog}
          closeDialog={setopenPerfilesDialog}
          movimiento={movimiento}
          reloadData={registroData}
          IdApp={idApp}
        />
      )}
    </Dialog>
  );
}
