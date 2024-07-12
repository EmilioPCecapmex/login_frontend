import { Grid, Button, Typography, Dialog } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { keyframes } from '@emotion/react';

// Definición de la animación
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(60deg);
  }
`;

const styles = {
    spin: {
        animation: `${spin} 1s linear infinite`, // Aplicación de la animación definida
    },
};

export const DialogMantenimiento = (
    {
        app,
        open, 
        handleClose
    }:
    {
        app:string,
        open:boolean,
        handleClose:Function
    }) => {
    return (
        <Dialog open={open}>
            <Grid
                container
                item
                xs={12}
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: "16px",
                }}
            >
                <Typography
                    fontFamily="'Montserrat', sans-serif"
                    sx={{
                        fontSize: { xs: '24px', sm: '24px', md: '30px', lg: '40px', xl: '40px', }, // Tamaños de fuente para diferentes breakpoints
                        color: "#333", // Color de texto mejorado
                        marginBottom: "16px",
                    }}
                >
                    La aplicación {app} está en mantenimiento
                </Typography>

                <Typography
                    fontFamily="'Montserrat', sans-serif"
                    sx={{
                        fontSize: { xs: '16px', sm: '16px', md: '18px', lg: '20px', xl: '20px' },
                        color: "#666", // Color de texto secundario
                        paddingBottom:'3vh'
                    }}
                >
                    Estamos trabajando para mejorar su experiencia. Por favor, vuelva más tarde.
                </Typography>

                <SettingsIcon
                    sx={{
                        width: { xs: "80%", sm: "50%", md: "25%", lg: "20%", xl: "15%" },
                        height: "auto",
                        animation: `${spin} 1s linear infinite`, // Aplicación de la animación directamente aquí
                        color: "#AF8C55", // Color del icono
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleClose();
                    }}
                    sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '18px' }, // Tamaños de fuente para diferentes breakpoints
                        mt:'3vh' ,
                    }}
                >
                    Regresar
                </Button>
            </Grid>
        </Dialog>
    );
}
