import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { DialogAdminAvisos } from "./DialogAdminAvisos";
import { deleteAdminAviso, getAdminAvisos } from "./AdminAvisosServices";
import Swal from "sweetalert2";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import RttIcon from '@mui/icons-material/Rtt';
import InfoIcon from '@mui/icons-material/Info';
export interface IAviso {
  Id: string;
  FechaFin: string;
  FechaInicio: string;
  IdApp: string;
  IdUsuario: string;
  TextoInc: number;
}

export const AdminAvisos  = ({  
    open,
    closeModal,
    idApp,
    app,
}:{
    open: boolean;
    closeModal: Function;
    idApp: string;
    app: string;


}) => {
    const [openDialogAdminAvisos, setOpenDialogAdminAvisos] = useState(false);
    const [movimiento, setMovimiento] = useState("Agregar");
    const [avisos, setAvisos] = useState<Array<IAviso>>([]);
    const camposCsv = ["TextoInc", "string", "string"];
    const [vrows, setVrows] = useState({});
    


    function eliminar(v: any) {
      Swal.fire({
        title: "¿Estas seguro que deseas eliminar el aviso?",
        icon: "info",
        showCancelButton: true,
        cancelButtonColor: "#af8c55",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#15212f",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAdminAviso(v?.row?.Id)
            .then((response) => {
              alertaExito(actualizarDatos, "¡Registro eliminado!");
            })
            .catch((error) => {
              alertaError();
            });
        }
      });
      actualizarDatos()
    }
    
    const columns = [
        {
          field: "acciones",
          headerName: "Acciones",
          width: 100,
          headerAlign: "left",
          hideable: false,
          renderCell: (cellValues: any) => {
            return (
              <Box>
                <Tooltip title={"Editar"}>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(event) => {                      
                      setVrows(cellValues?.row);
                      setMovimiento("Editar");
                      setOpenDialogAdminAvisos(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
    
                <Tooltip title={"Eliminar"}>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(event) => {
                      eliminar(cellValues);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
               
              </Box>
            );
          },
        },
        {
          field: "Titulo",
          headerName: "Título",
          width: 250,
          hideable: false,
          headerAlign: "left",
        },
        {
          field: "TextoInc",
          headerName: "Aviso",
          width: 50,
          hideable: false,
          headerAlign: "left",

          renderCell: (cellValues: any) => {
            console.log("cellValues",cellValues);
            let texto:string=cellValues.row.TextoInc;
            
            return (
              <Box sx={{display:'flex',justifyContent:'center',width:'100%'}}>
              <Tooltip title={texto}>
              <InfoIcon/>
              
              </Tooltip></Box>
            );
          },
        },
        {
          field: "FechaInicio",
          headerName: "Fecha Inicio",
          width: 100,
          hideable: false,
          headerAlign: "left",
        },
        {
          field: "FechaFin",
          headerName: "Fecha Fin",
          width: 100,
          hideable: false,
          headerAlign: "left",
        },
       
        
      ];

      function actualizarDatos() {
        getAdminAvisos(idApp, setAvisos);
      }

      useEffect(() => {        
        if (!openDialogAdminAvisos){ 
          actualizarDatos();
          setVrows({})
      }
      }, [openDialogAdminAvisos]);

      return (
        <Dialog open={open} fullScreen>
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
                border: "1px solid",
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
                    color: "#AF8C55",
                  }}
                >
                  Avisos
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
                    <CloseIcon
                      sx={{
                        fontSize: [30, 30, 30, 40, 40],
                      }}
                    />
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
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "center",
                          fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                          color: "#AF8C55",
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
                        setMovimiento("Agregar");
                        setOpenDialogAdminAvisos(true);
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
                    rows={avisos}
                    camposCsv={camposCsv}
                    exportTitle={"Avisos de la aplicación " + app}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
    
          {openDialogAdminAvisos && (
            <DialogAdminAvisos
              open={openDialogAdminAvisos}
              closeDialog={setOpenDialogAdminAvisos}
              reloadData={vrows}
              movimiento={movimiento}
              IdApp={idApp}
              App={app}
              
            />
          )}
       
        </Dialog>
      );
}