import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"
import { useState } from "react"
import ModalForm from "../Componentes/ModalForm"

export const MostrarArchivos = ({
    handleClose,
    arrayAyudas,
    valueTab

}: {
    handleClose: Function
    arrayAyudas: any[]
    valueTab:string
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


            <Grid container sx={{ width: "100vw", height: "100vh", display: "flex" , justifyContent:"flex-end"}}>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10} sx={{ height: "7vh", display: "flex" , justifyContent:"center" }}>
                   <Typography variant="h4">Visualizar</Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ height: "7vh", display: "flex", justifyContent:"center" }}>
            
                    <Tooltip title="Salir">
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
                    </Tooltip>
                    
                    </Grid>
                </Grid>
            
                {valueTab == "Videos" ? (
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

            )}
            









        </Dialog>
    )
}


