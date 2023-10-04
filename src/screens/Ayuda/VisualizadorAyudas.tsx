import { Box, Dialog, DialogTitle, Grid, IconButton, Modal, Tab, Tooltip, Typography } from "@mui/material";
import { GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import ModalForm from "../Componentes/ModalForm";
import AyudasModal from "./AyudaModal";
import { TabContext, TabList } from "@mui/lab";
import PreviewIcon from '@mui/icons-material/Preview';
import { getAyuda } from "./ServicesAyuda";
import { MostrarArchivos } from "./MostrarArchivos";


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
    arrayAyudas,
    valueTab,

}:{
    
    handleClose:Function
    arrayAyudas:any[]
    valueTab:string
})=>{

    const [Videos, setVideos] = useState<IAyudaVideo[]>([]);
    const [Guias, setGuias] = useState<IAyudaGuia[]>([]);
    const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
    const [archivoUrl, setArchivoUrl] = useState<string>("");
    const [modoVisualizacion, setModoVisualizacion] = useState<string>("");
    const [open, setOpen] = useState(false);






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
                <IconButton onClick={() =>{setOpen(true)}
    
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
              <Tooltip title="Visualizar">
                <IconButton onClick={() =>{setOpen(true)}
    
                  //handleBorrarRegistro(v.row.id)
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

    return(
        

        (<ModalForm 
        title="Visualizar" handleClose={()=>{handleClose()}}
        //open={true} 
        //onClose={handleCloseVAyudas()}
        > 


        
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
            {open?(<MostrarArchivos 
            arrayAyudas={[]} 
            handleClose={handleCloseModal}    
            valueTab={valueTab}        
            />
            ):(
              ""
              ) }

            

          
        </ModalForm>)

        
        
    )
}