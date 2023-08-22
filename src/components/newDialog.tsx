import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { SolicitudUsuario } from "../screens/SolicitudDeUsuarios/SolicitudUsuario";

export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
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
            <Button
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
            </Button>
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
          idApp={""}
        />
      </DialogContent>
    </Dialog>
  );
};
