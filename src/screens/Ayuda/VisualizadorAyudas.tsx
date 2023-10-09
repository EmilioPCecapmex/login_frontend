import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import ModalForm from "../Componentes/ModalForm";
import PreviewIcon from '@mui/icons-material/Preview';
import { getAyuda } from "./ServicesAyuda";
import { MostrarArchivos } from "./MostrarArchivos";

export interface IInfoFile {
  nombre: string;
  ruta: string;
}
export const VisualizadorAyudas = ({
  handleClose,
  arrayAyudas,
  valueTab,
}: {
  handleClose: Function
  arrayAyudas: any[]
  valueTab: string
}) => {

  const [open, setOpen] = useState(false);
  const [infoFile, setInfoFile] = useState<IInfoFile>({ nombre: "", ruta: "" });

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


            <Tooltip title="Visualizar">
              <IconButton onClick={() => {
                setOpen(true);
                setInfoFile({ ruta: v?.row?.RutaVideo, nombre: v?.row?.NombreArchivoServidor })
              }}>
                <PreviewIcon />
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
            <Tooltip title="Visualizar">
              <IconButton onClick={() => {
                setOpen(true)
                setInfoFile({ ruta: v?.row?.RutaGuia, nombre: v?.row?.NombreArchivoServidor })
              }}>
                <PreviewIcon />
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

  const columnsPreguntas: GridColDef[] = [

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

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    (<ModalForm
      title="Visualizar" handleClose={() => { handleClose() }}>
      <Grid item sx={{ width: "100vw", height: "77vh" }}>
        {/* cambio a tabla preguntas */}
        {valueTab == "Preguntas" ? (
          <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={arrayAyudas} />

        ) : null}
        {/* cambio a tabla videos*/}
        {valueTab == "Videos" ? (
          <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={arrayAyudas} />
        ) : null}
        {/* cambio a tabla guías */}
        {valueTab == "Guias" ? (
          <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={arrayAyudas} />
        ) : null}

      </Grid>
      {open ? <MostrarArchivos
        handleClose={handleCloseModal}
        infoFile={infoFile}
        valueTab={valueTab}
      />
        : null}

    </ModalForm>)
  )
}