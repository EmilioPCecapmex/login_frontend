import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close";
import { getFileByName } from "./ServicesAyuda";
import { IInfoFile } from "./VisualizadorAyudas";

export const MostrarArchivos = ({
    handleClose,
    valueTab,
    infoFile,

}: {
    handleClose: Function
    valueTab: string
    infoFile:IInfoFile
}) => {

    const [archivoUrl, setArchivoUrl] = useState<string>("");

    const savePDF =(data:string)=>{
        setArchivoUrl(`data:application/pdf;base64,${data}`);
    }

    const saveVideo =(data:string)=>{
        setArchivoUrl(`data:video/mp4;base64,${data}`);
    }

    useEffect(() => {
        valueTab == "Videos" ?
        getFileByName(process.env.REACT_APP_DOC_ROUTE+'/VIDEOS/TUTORIALES/',infoFile.nombre, saveVideo):
        getFileByName(process.env.REACT_APP_DOC_ROUTE+'/GUIAS/', infoFile.nombre,savePDF)
    }, [])

    return (
        <Dialog
            className="containerVizualizar"
            fullScreen
            sx={{ zIndex: 2000 }}
            open={true}
        >


            <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "flex-end" }}>
                <Grid container item xs={12} sm={12} md={12} lg={12} sx={{height:"7vh", display: "flex", justifyContent: "flex-end"}}>
                <Grid item xs={10} sm={10} md={10} lg={10} sx={{display:"flex",alignItems:"Center", justifyContent: "center"}} >
                    <Box sx={{ display: "flex", justifyContent: "center",alignItems:"Center" }}>
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

                            Visualizar
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={1} paddingBottom={0} >
                    <Grid container alignItems="flex-end" direction="row" justifyContent="flex-end" paddingRight={1} >
                        <Tooltip title={"Salir"}>
                            <IconButton
                                onClick={() => handleClose()}
                            >
                                <CloseIcon sx={{
                                    fontSize: [30, 30, 30, 40, 40]
                                }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                </Grid>

                <Grid item   container xs={12} sm={12} md={12} lg={12} sx={{height:"90vh", display: "flex", justifyContent: "center",alignItems:"center"}}>
                    {
                        valueTab == "Videos" ? (

                            <video
                                autoFocus
                                loop
                                autoPlay
                                width={"98%"}
                                height={"98%"}
                                src={archivoUrl}
                                id="video_player"
                                controls
                            />

                        ) : (

                            <iframe
                                style={{
                                    width: "98%",
                                    height: "98%",
                                }}
                                src={`${archivoUrl}`}
                                title="description"
                            />
                        )
                    }
                </Grid>
            </Grid>
        </Dialog >
    )
}


