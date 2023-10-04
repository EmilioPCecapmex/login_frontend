import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"
import { useState } from "react"
import ModalForm from "../Componentes/ModalForm"
import CloseIcon from "@mui/icons-material/Close";

export const MostrarArchivos = ({
    handleClose,
    arrayAyudas,
    valueTab

}: {
    handleClose: Function
    arrayAyudas: any[]
    valueTab: string
}) => {

    const [archivoUrl, setArchivoUrl] = useState<string>("");
    const [modoVisualizacion, setModoVisualizacion] = useState<string>("");

    // const [valueTab, setValueTab] = useState<string>("Guias");





    return (
        <Dialog
            //title="Visualizar" handleClose={handleClose}
            className="containerVizualizar"
            fullScreen
            sx={{ zIndex: 2000 }}
            open={true}
        >


            <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "flex-end" }}>
                <Grid item xs={10} sm={10} md={10} lg={10} >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                {/* <Tooltip title="Salir">
                        <IconButton
                             size="large"
                            // className="cerrar"
                             aria-label="close"
                            onClick={() => handleClose()}
                            sx={{
                                fontSize: '24px', // Tamaño predeterminado del icono
                                '@media (max-width: 600px)': {
                                  fontSize: 25, // Pantalla extra pequeña (xs y sm)
                                },
                                '@media (min-width: 601px) and (max-width: 960px)': {
                                  fontSize: 25, // Pantalla pequeña (md)
                                },
                                '@media (min-width: 961px) and (max-width: 1280px)': {
                                  fontSize: 30, // Pantalla mediana (lg)
                                },
                                '@media (min-width: 1281px)': {
                                  fontSize: 30, // Pantalla grande (xl)
                                },
                              }}
                        >
                            <GridCloseIcon />
                        </IconButton>
                    </Tooltip> */}

            
        </Grid>

            {
        valueTab == "Videos" ? (
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
        <Grid item className="contenedorDeReproductorVideo">

            <object
                className="responsive-iframe"
                data={archivoUrl}
                type="text/html"
            ></object>
        </Grid>

    )
    }










        </Dialog >
    )
}


