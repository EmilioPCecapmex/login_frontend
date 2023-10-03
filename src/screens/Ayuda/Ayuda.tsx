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
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import AyudasModal, { ILista, Tabla } from "./AyudaModal";
import { getAyuda } from "./ServicesAyuda";

interface IAyudaVideo {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaVideo: string,
  UltimaActualizacion: string
}

interface IAyudaGuia {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaGuia: string,
  Pregunta: string,
  UltimaActualizacion: string
}

interface IAyudaPregunta {
  Id: string,
  IdMenu: string,
  Menu: string,
  Respuesta: string,
  Pregunta: string,
  UltimaActualizacion: string
}

const Ayuda = ({
  IdMenu,
  //modo,
}: {
  IdMenu: string;
  // modo: string;
}) => {

  const [valueTab, setValueTab] = useState<string>("Guias");

  const [reload, setReload] = useState("");

  const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
  const [Guias, setGuias] = useState<IAyudaGuia[]>([]);
  const [Videos, setVideos] = useState<IAyudaVideo[]>([]);

  const [pregunta, setPregunta] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [idMenu, setIdMenu] = useState(IdMenu);
  const [newVideo, setNewVideo] = useState(Object);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [open, setOpen] = useState(false);
  const [agregar, setAgregar] = useState<boolean>(true);
  const [modo, setModo] = useState("");
  const [ayuda, setAyuda] = useState<Tabla[]>([]);










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
      width: 80,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Guía">
            <IconButton onClick={() =>{}
              // handleBorrarRegistro(v.row.id)
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
      width: 80,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Video">
            <IconButton onClick={() =>{}

            //  handleBorrarRegistro(v.row.id)
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
      width: 80,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Pregunta">
            <IconButton onClick={() =>{} 
            // handleBorrarRegistro(v.row.id)
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
    //consulta({ NUMOPERACION: 4 });
  };

  const handleOpen = (v: any) => {
    //setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    //setVrows("");
  };


  // useEffect(() => { getAyuda(setGuias, "0", "Guias") }, [])
  useEffect(()=>{
    if(valueTab==="Guias"){
      getAyuda(setGuias, "0", "Guias")
    }
    if(valueTab==="Videos"){
      getAyuda(setVideos, "0", "Videos")
    }
    if(valueTab==="Preguntas"){
      getAyuda(setPreguntas, "0", "Preguntas")
    }

  },[valueTab])


  return (
    <>
      <Header 
      menuActual="Ayuda"/>
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
                  // IdMenu={idMenu}
                  //modo={"Administrar ayudas"}
                  tipo={0}
                  TabValue={valueTab}
                  handleClose={handleClose}
                  dt={{}}
                  open={open}
                //tipo={tipoOperacion}
                //dt={vrows}
                />
              ) : (
                ""
              )}
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

          {valueTab == "Videos" || valueTab == "Guias" ? (
            <Grid container>

              <Grid item xs={12}>
                {/* <MUIXDataGrid
      columns={valueTab == "Videos" ? columnsVideo : columnsGuia}
      rows={preguntas}
    /> */}
              </Grid>


              {/* {valueTab == "Videos" ? (
            <>
              <Button
                disabled={
                  !idMenu || idMenu == "false" || !nombreArchivo //||
                  // !newVideo ||
                  // !valueDepartamento
                }
                className="guardar"
                //onClick={() => SaveVideo(false)}
              >
                Guardarrr
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu || idMenu == "false" || !nombreArchivo || !newVideo
                  }
                  className="cerrar"
                  //onClick={() => SaveVideo(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )} */}
            </Grid>


          ) : (
            ""
          )}
        </Grid>








      </Grid>
    </>
  );
};
export default Ayuda;
