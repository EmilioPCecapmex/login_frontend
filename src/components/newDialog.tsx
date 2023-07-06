import {
  Dialog, Grid, IconButton, Typography,
} from "@mui/material";
import { useEffect } from "react";
import { SolicitudUsuarios } from "../screens/SolicitudDeUsuarios/SolicitudUsuarios";
import { Close as CloseIcon } from "@mui/icons-material";


export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
}

export interface IUserTypes {
  Id: string;
  Nombre: string;
  Descripcion: string;
}
export const NewDialog = (props: NewDialogProps) => {


  useEffect(() => {
  }, []);

  return (
    <Dialog
      open={props.newDialogOpen}
      fullScreen
      onClose={() => props.handleNewDialogClose()
      }
    >
      <div className="ContainerSolicitudesUsuario">
        <Grid container item xs={12} justifyContent={"space-between"} paddingRight={1} paddingTop={1} paddingBottom={1} bgcolor={"#af8c55"}>
          <Grid container item xs={1} justifyContent={"flex-end"}> 

          </Grid>
          <Grid item xs={10} justifyContent={"center"}>
            <Typography variant="h4" className="TituloContainerSolicitudesUsuario" style={{color:'white'}}>
              Registro de Usuario

            </Typography>
          </Grid>
          <Grid container item xs={1} justifyContent={"flex-end"}>

            <IconButton
              aria-label="close"
              onClick={() => props.handleNewDialogClose()}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <SolicitudUsuarios handleDialogClose={props.handleNewDialogClose} modoModal={false} token={""} idUsuarioSolicitante={""} idApp={""} />

      </div>
    </Dialog>
  );
};




