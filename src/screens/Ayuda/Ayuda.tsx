import DeleteIcon from "@mui/icons-material/Delete";
import { TabContext, TabList } from "@mui/lab";
import { Box, Grid, IconButton, Tab, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import { GridColDef } from "@mui/x-data-grid";
import AyudasModal from "./AyudaModal";
import { deleteFile, getAyuda } from "./ServicesAyuda";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
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
  document.title = valueTab === "Preguntas" ? "Preguntas" : valueTab === "Videos"?"Videos":"Guias";
  const camposCsv = valueTab === "Preguntas" ? ["Menu","Pregunta","Texto",] : valueTab === "Videos"?[ "Menu","NombreArchivo"]:["Menu","Pregunta","NombreArchivo"];
  function eliminar(v: any) {
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
        deleteFile(v?.row?.RutaGuia, v?.row?.NombreArchivoServidor, v?.row?.Id)
          .then((response) => {
            alertaExito(() => { }, "¡Registro eliminado!");
            obtenerDatos();
          })
          .catch((error) => {
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
        return (
          <Box>
            <Tooltip title="Eliminar Guía">
              <IconButton onClick={() => {
                eliminar(v)
              }
              }>
                <DeleteIcon />
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
              <IconButton onClick={() => { eliminar(v) }}>
                <DeleteIcon />
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
              <IconButton onClick={() => { eliminar(v) }
              }>
                <DeleteIcon />
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
    obtenerDatos();
  };

  const obtenerDatos = () => {
    if (valueTab === "Guias") {
      getAyuda(setGuias, "0", "Guias")
    }
    if (valueTab === "Videos") {
      getAyuda(setVideos, "0", "Videos")
    }
    if (valueTab === "Preguntas") {
      getAyuda(setPreguntas, "0", "Preguntas")
    }
  }

  const handleOpen = (v: any) => {

    setOpen(true);

  };

  useEffect(() => {
    obtenerDatos();
  }, [valueTab])


  return (
    <>
      <Header
        menuActual="Administracion de Ayudas" />
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
            <Grid item xl={8} xs={10} lg={8} md={8} sm={10} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <TabList onChange={handleChange} >
                <Tab label="Guías" value="Guias" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
                <Tab label="Videos" value="Videos" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
                <Tab label="Preguntas" value="Preguntas" sx={{ fontSize: [30, 30, 30, 30, 30], }} style={{ textTransform: 'none' }} />
              </TabList>

              {open ? (
                <AyudasModal
                  TabValue={valueTab}
                  handleClose={handleClose}
                />
              ) : null}
            </Grid>
            <Grid item xl={2} xs={1.5} lg={2} md={2} sm={1.5} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <ButtonsAdd handleOpen={handleOpen} agregar={true} />
            </Grid>
          </Grid>
        </TabContext>



        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          {/* <MUIXDataGrid  id={(row: any) => row.Id} columns={columnsPreguntas} rows={[]}/> */}

          {/* cambio a tabla preguntas */}
          {valueTab == "Preguntas" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={Preguntas} camposCsv={camposCsv}/>

          ) : null}
          {/* cambio a tablas videos y guías */}
          {valueTab == "Videos" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={Videos} camposCsv={camposCsv}/>
          ) : null}

          {valueTab == "Guias" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={Guias} camposCsv={camposCsv}/>
          ) : null}

        </Grid>
      </Grid>
    </>
  );
};
export default Ayuda;
