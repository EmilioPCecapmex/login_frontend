import { Close as CloseIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppInterface } from "../screens/Aplicaciones/CatApp";
import { queries } from "../queries";
import { alertaInformativa } from "./alertas/toast";

export interface EditDialogProps {
  editDialogOpen: boolean;
  handleEditDialogClose: Function;
  app: AppInterface | any;
}

export const EditDialogApp = (props: EditDialogProps) => {

  function MismoObjeto(objetoA:any, objetoB:any) {
    // Convertimos los objetos a cadenas JSON y luego las comparamos
    const jsonStringA = JSON.stringify(objetoA);
    const jsonStringB = JSON.stringify(objetoB);
  
    // Comparamos las cadenas JSON
    return jsonStringA === jsonStringB;
  }

  const [App, setApp] = useState({
    Nombre: "",
    Descripcion: "",
    Path: "",
    EstaActivo: false,
    Estatus: false,
  });

  const [appActual, setappActual] = useState({
    Nombre: "",
    Descripcion: "",
    Path: "",
    EstaActivo: false,
    Estatus: false,
  });

  useEffect(() => {
    const { row } = props?.app;
    setApp({
      Nombre: row?.Nombre || "",
      Path: row?.Path || "",
      Descripcion: row?.Descripcion || "",
      EstaActivo: row?.EstaActivo === 1,
      Estatus: row?.estatusLabel === "Activo",
    });
    setappActual({
      Nombre: row?.Nombre || "",
      Path: row?.Path || "",
      Descripcion: row?.Descripcion || "",
      EstaActivo: row?.EstaActivo === 1,
      Estatus: row?.estatusLabel === "Activo",
    });
  }, [props?.app?.row?.Id, props?.app?.row?.Nombre, props?.app?.row?.Path, props?.app?.row?.estatusLabel]);

  const handleUpdateBtn = () => {
    if(MismoObjeto(App,appActual)){
      alertaInformativa("No se detectaron cambios")
    }else{
      const { Nombre, Path, Descripcion, EstaActivo } = App;
    if (Nombre === "" || Path === "") {
      Swal.fire({
        icon: "error",
        title: "Aviso",
        text: "Favor de completar todos los campos para continuar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#15212f",
      });
    } else {
      const data = {
        IdApp: props.app.row.Id,
        Nombre: Nombre,
        Path: Path,
        Descripcion: Descripcion,
        EstaActivo: EstaActivo ? 1 : 0,
        IdUsuarioModificador: localStorage.getItem("IdUsuario"),
      };
      axios({
        method: "put",
        url: process.env.REACT_APP_APPLICATION_DEV + `/api/app`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        data: data,
      })
        .then(function (response) {
          props.handleEditDialogClose(true);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "(" + error.response.status + ") " + error.response.data.message,
          });
        });
    }
    }
    
  };

  
  return (
    <Dialog
      open={props.editDialogOpen}
      onClose={() => props.handleEditDialogClose()}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">
        Editar Aplicación
        <IconButton
          aria-label="close"
          onClick={() => props.handleEditDialogClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              size="small"
              value={App.Nombre}
              onChange={(v) => setApp({ ...App, Nombre: v.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="path"
              label="Path"
              type="text"
              fullWidth
              variant="standard"
              size="small"
              value={App.Path}
              onChange={(v) => setApp({ ...App, Path: v.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="descripcion"
              label="Descripción"
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={4}
              value={App.Descripcion}
              onChange={(v) => setApp({ ...App, Descripcion: v.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={App.Estatus}
                    onChange={(v) => setApp({ ...App, Estatus: v.target.checked ,EstaActivo:v.target.checked})}
                  />
                }
                label={App.Estatus ? "Activo" : "Inactivo"}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="cancelar" variant="contained" onClick={() => props.handleEditDialogClose()}>
          Cancelar
        </Button>
        <Button className="aceptar" variant="contained" onClick={() => handleUpdateBtn()}>
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
