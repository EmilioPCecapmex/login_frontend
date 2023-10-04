import { Box, Dialog, DialogTitle, Grid, IconButton, Modal, Tab, Tooltip, Typography } from "@mui/material";
import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import ModalForm from "../Componentes/ModalForm";
import AyudasModal from "./AyudaModal";
import { TabContext, TabList } from "@mui/lab";
import PreviewIcon from '@mui/icons-material/Preview';

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


export const VisualizadorAyudas =({
    
    handleClose,
    arrayAyudas

}:{
    
    handleClose:Function
    arrayAyudas:any[]
})=>{

    const [valueTab, setValueTab] = useState<string>("Videos");
    const [Videos, setVideos] = useState<IAyudaVideo[]>([]);
    const [Guias, setGuias] = useState<IAyudaGuia[]>([]);
    const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
    const [archivoUrl, setArchivoUrl] = useState<string>("");
    const [modoVisualizacion, setModoVisualizacion] = useState<string>("");






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

              <Tooltip title="Visualizar">
                <IconButton onClick={() =>{}
    
                //  handleBorrarRegistro(v.row.id)
                }>
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

    return(
        

        (<ModalForm 
        title="Visualizar" handleClose={()=>{handleClose()}}
        //open={true} 
        //onClose={handleCloseVAyudas()}
        > 


        
            <Grid item sx={{ width: "100vw", height: "77vh" }}>
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


            <Dialog
        className="containerVizualizar"
        fullScreen
        sx={{ zIndex: 2000 }}
        open={true}
      >
        <div>
          {/* <SliderProgress open={slideropen} texto={""} /> */}
          <Grid
            container
            className="HeaderModal"
            justifyContent="flex-end"
            alignItems="center"
            paddingTop={1}
            paddingBottom={0.5}
          >
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4">Visualizar</Typography>
              </Box>
            </Grid>
            <Grid item xs={1.5} paddingBottom={0}>
              <Grid
                container
                alignItems="flex-end"
                direction="row"
                justifyContent="flex-end"
                paddingRight={1}
              >
                <Tooltip title="Salir">
                  <IconButton
                    size="large"
                    className="cerrar"
                    aria-label="close"
                    onClick={() => handleClose()}
                  >
                    <GridCloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
  
          <div className="containerCenterVizualizar">
            {modoVisualizacion == "video" ? (
              <Grid item className="contenedorDeReproductorVideo">
                <video
                  autoFocus
                  loop
                  autoPlay
                  width={"100%"}
                  height={"100%"}
                  src={archivoUrl}
                  id="video_player"
                  controls
                />
              </Grid>
            ) : (
              <object
                className="responsive-iframe"
                data={archivoUrl}
                type="text/html"
              ></object>
            )}
          </div>
        </div>
      </Dialog>

          
        </ModalForm>)

        
        
    )
}