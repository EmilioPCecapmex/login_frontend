import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { SolicitudUsuario } from "../screens/SolicitudDeUsuarios/SolicitudUsuario";
import { Header } from "./header";
import { GridCloseIcon } from "@mui/x-data-grid";

export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
  idUsuario: string;
  idApp: string;
}

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IUserTypes {
  Id: string;
  Nombre: string;
  Descripcion: string;
}
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

export const NewDialog = (props: NewDialogProps) => {
  useEffect(() => {}, []);

  return (
    <Dialog
      open={props.newDialogOpen}
      fullScreen
      TransitionComponent={Transition}
      onClose={() => props.handleNewDialogClose()}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.5rem" }}>
            Registro de usuario
          </Typography>

          <ThemeProvider theme={theme}>
          <Tooltip title="Salir">
                <IconButton

                  onClick={() => {props.handleNewDialogClose();}}
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
            {/* <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                "&&:hover": {
                  backgroundColor: "rgba(165, 161, 156, 0.9)",
                  color: "white",
                },
                fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
              }}
              onClick={() => {
                props.handleNewDialogClose();
              }}
            >
              <Typography>Cancelar</Typography>
            </Button> */}
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <SolicitudUsuario
          handleDialogClose={props.handleNewDialogClose}
          modoModal={false}
          token={""}
          idUsuarioSolicitante={""}
          idUsuarioModificado={props.idUsuario}
          idApp={props.idApp}
        />
      </DialogContent>
    </Dialog>
    // <Grid>
    //   <Header />

    //   <Grid container justifyContent="center" height={"85vh"}>
    //     <SolicitudUsuario
    //       handleDialogClose={props.handleNewDialogClose}
    //       modoModal={false}
    //       token={""}
    //       idUsuarioSolicitante={""}
    //       idApp={""}
    //     />
    //   </Grid>
    // </Grid>
  );
};
