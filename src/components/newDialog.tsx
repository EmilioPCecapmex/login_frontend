import { Grid, Slide, createTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { SolicitudUsuario } from "../screens/SolicitudDeUsuarios/SolicitudUsuario";
import { Header } from "./header";

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

export const NewDialog = () => {
  useEffect(() => {}, []);

  return (
    <Grid>
      <Header />

      <SolicitudUsuario
        modoModal={false}
        token={""}
        idUsuarioSolicitante={""}
        idApp={""}
      />
    </Grid>
  );
};
