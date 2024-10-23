import {
  Dialog,
  Grid,
  IconButton,
  Slide,
  Tooltip,
  Typography,
  createTheme
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { GridCloseIcon } from "@mui/x-data-grid";
import { forwardRef } from "react";
import { SolicitudUsuario } from "../screens/SolicitudDeUsuarios/SolicitudUsuario";

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
 
  return (
    <Dialog
      open={props.newDialogOpen}
      fullScreen
      TransitionComponent={Transition}
      onClose={() => props.handleNewDialogClose()}
    >
    <Grid container sx={{display:"flex",height:"100vh",width:"100vw"}}>
      <Grid
        container
        item
        xl={12}
        xs={12}
        lg={12}
        md={12}
        sm={12}
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          border: "1px solid"
        }}
      >
        <Grid
          item
          xl={10}
          xs={10}
          lg={10}
          md={10}
          sm={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Typography
            fontFamily={"'Montserrat', sans-serif"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
              fontSize: [25, 30, 40, 40, 40], // Tamaños de fuente para diferentes breakpoints
              color: "#AF8C55"
            }}>

            {props.idUsuario ? "Editar Usuario" : "Registro de Usuario"}
          </Typography>
        </Grid>
        <Grid
          item
          xl={1}
          xs={1}
          lg={1}
          md={1}
          sm={1}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title={"Salir"}>
            <IconButton
              onClick={() => {
                props.handleNewDialogClose();
              }}
            >
              <GridCloseIcon sx={{
                fontSize: [20, 30, 30, 40, 40]
              }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
 
      <Grid
      container
      item
      xl={12}
      xs={12}
      lg={12}
      md={12}
      sm={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height:"90vh",overflow:"auto"}}
      >
        {props.newDialogOpen?<SolicitudUsuario
          handleDialogClose={props.handleNewDialogClose}
          modoModal={false}
          token={""}
          idUsuarioSolicitante={""}
          idUsuarioModificado={props.idUsuario}
          idApp={props.idApp}
        />:null}
      </Grid>
      </Grid>
    </Dialog>
    
  );
};
