import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import ModalForm from "../../screens/Componentes/ModalForm"
import { GridCloseIcon } from "@mui/x-data-grid";
import SettingsIcon from '@mui/icons-material/Settings';

const styles = {
    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    },
    "@-webkit-keyframes spin": {
        from: {
            "-webkit-transform": "rotate(0deg)"
        },
        to: {
            "-webkit-transform": "rotate(360deg)"
        }
    }
};
export const DialogMantenimiento = () => {
    return (
        <Dialog open={true} fullScreen>
            <Grid
                container
                sx={{
                    width: "100vw",
                    height: "100%",
                }}
            >
                {/* Header */}
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        height: "8vh",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        // border: "1px solid"
                        // bgcolor: "#c4a57b",
                    }}
                >

                    {/* <Grid
                        item
                        xs={8}
                        sm={8}
                        md={10}
                        lg={10}
                        xl={10}
                        sx={{
                            height: "8vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontFamily={"'Montserrat', sans-serif"}
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                                fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                                color: "#AF8C55"
                            }}
                        >
                            Aplicacion en mantenimiento
                        </Typography>
                    </Grid> */}
                    <Grid
                        item
                        xs={2}
                        sm={2}
                        md={1}
                        lg={1}
                        xl={1}
                        sx={{
                            height: "8vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="Salir">
                            <IconButton

                                onClick={() => {
                                    // closeModal();
                                }}
                            >
                                <GridCloseIcon sx={{
                                    fontSize: '24px', // Tamaño predeterminado del icono
                                    '@media (max-width: 600px)': {
                                        fontSize: 30, // Pantalla extra pequeña (xs y sm)
                                    },
                                    '@media (min-width: 601px) and (max-width: 960px)': {
                                        fontSize: 30, // Pantalla pequeña (md)
                                    },
                                    '@media (min-width: 961px) and (max-width: 1280px)': {
                                        fontSize: 40, // Pantalla mediana (lg)
                                    },
                                    '@media (min-width: 1281px)': {
                                        fontSize: 40, // Pantalla grande (xl)
                                    },
                                }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                {/* Body */}
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        height: "92vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >

                    {/* Rol */}
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "8%",
                        }}
                    >
                        <Typography fontFamily={"'Montserrat', sans-serif"}
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                                fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                                color: "#AF8C55"
                            }}>
                            Aplicacion en mantenimiento
                        </Typography>
                    </Grid>

                    <Grid container sx={{ display: "flex", height: "84vh", width: "100vw", alignItems: 'center', justifyContent: 'center' }}>
                        <SettingsIcon
                            sx={{
                                width: "50%",
                                height: "50%",
                                animation: `${styles["@keyframes spin"]} 1s linear infinite`, // Animación para navegadores que soportan @keyframes
                                WebkitAnimation: `${styles["@-webkit-keyframes spin"]} 1s linear infinite`, // Animación para navegadores que requieren @-webkit-keyframes
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>



        </Dialog >
    )
}