/* eslint-disable react-hooks/exhaustive-deps */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Grid, IconButton, Tab, TextField, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Create, IModify } from "../../components/dialogsCatalogos/Create";
import { Header } from "../../components/header";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import { GridColDef } from "@mui/x-data-grid";
import AyudasModal, { ILista, Tabla } from "./AyudaModal";
import { deleteAyuda, getAyuda } from "./ServicesAyuda";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../components/MUIXDataGrid";

export interface IAyudaVideo {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaVideo: string,
  UltimaActualizacion: string
}

export interface IAyudaGuia {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaGuia: string,
  Pregunta: string,
  UltimaActualizacion: string
}

export interface IAyudaPregunta {
  Id: string,
  IdMenu: string,
  Menu: string,
  Respuesta: string,
  Pregunta: string,
  UltimaActualizacion: string
}

const Ayuda = () => {

  const [valueTab, setValueTab] = useState<string>("Guias");
  const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
  const [Guias, setGuias] = useState<IAyudaGuia[]>([]);
  const [Videos, setVideos] = useState<IAyudaVideo[]>([]);


  const [open, setOpen] = useState(false);
  const [agregar, setAgregar] = useState<boolean>(true);

function eliminar (v:any){
  Swal.fire({
    title: "¿Estás seguro de eliminar este registro?",
    icon: "question",
    showCancelButton: true,
    
    cancelButtonColor: "#af8c55",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#15212f",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAyuda(v.row.Id,localStorage.getItem("IdUsuario")||"",()=>{})
        .then(function (response) {
          alertaExito(()=>{},"¡Registro eliminado!");
          if(valueTab==="Guias"){
            getAyuda(setGuias, "0", "Guias")
          }
          if(valueTab==="Videos"){
            getAyuda(setVideos, "0", "Videos")
          }
          if(valueTab==="Preguntas"){
            getAyuda(setPreguntas, "0", "Preguntas")
          }
                })
        .catch(function (error) {
          alertaError();
        });
    }
  });
}


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const columnsGuia: GridColDef[] = [
   
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        console.log("v",v);
        
        return (
          <Box>
            <Tooltip title="Eliminar Guía">
            <IconButton onClick={() =>{
                eliminar(v)              
            }
              }>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "Pregunta",
      headerName: "Pregunta",
      description: "Pregunta",
      width: 600,
    },
    {
      field: "NombreArchivo",
      headerName: "Nombre Guía",
      description: "Nombre Guía",
      width: 600,
    },
  ];

  const columnsVideo: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Video">
            <IconButton onClick={() =>{eliminar(v)}}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "NombreArchivo",
      headerName: "Nombre Video",
      description: "Nombre Video",
      width: 600,
    },

  ];

  const columnsPreguntas: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Pregunta">
            <IconButton onClick={() =>{eliminar(v)} 
            }>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "Pregunta",
      headerName: "Pregunta",
      description: "Pregunta",
      width: 600,
    },
    {
      field: "Texto",
      headerName: "Respuesta",
      description: "Respuesta",
      width: 800,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    if(valueTab==="Guias"){
      getAyuda(setGuias, "0", "Guias")
    }
    if(valueTab==="Videos"){
      getAyuda(setVideos, "0", "Videos")
    }
    if(valueTab==="Preguntas"){
      getAyuda(setPreguntas, "0", "Preguntas")
    }
    
  };

  const handleOpen = (v: any) => {
   
    setOpen(true);
    
  };


  // useEffect(() => { getAyuda(setGuias, "0", "Guias") }, [])
  useEffect(()=>{
    handleClose();

  },[valueTab])


  return (
    <>
      <Header 
      menuActual="Administracion de Ayudas"/>
      <Grid
      
        container
        item
        xs={12}
        justifyContent="center"
        paddingTop={3}
        sx={{ maxHeight: "90vh", maxWidth: "100vw" }}
      >
        <TabContext value={String(valueTab)}>
          <Grid container sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Grid item xl={8} xs={8} lg={8} md={8} sm={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Guías" value="Guias" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
                <Tab label="Videos" value="Videos" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
                <Tab label="Preguntas" value="Preguntas" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
              </TabList>
              {/* <ButtonsAdd> 
                
              </ButtonsAdd>  */}
              {open ? (
                <AyudasModal
                  TabValue={valueTab}
                  handleClose={handleClose}
                />
              ) :null}
            </Grid>
            <Grid item xl={2} xs={2} lg={2} md={2} sm={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
            </Grid>
          </Grid>
        </TabContext>



        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          {/* <MUIXDataGrid  id={(row: any) => row.Id} columns={columnsPreguntas} rows={[]}/> */}

          {/* cambio a tabla preguntas */}
          {valueTab == "Preguntas" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={Preguntas} />
            
          ) : null}
          {/* cambio a tablas videos y guías */}
          {valueTab == "Videos" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={Videos} />
          ) : null}

          {valueTab == "Guias" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={Guias} />
          ) : null}

        </Grid>
      </Grid>
    </>
  );
};
export default Ayuda;
