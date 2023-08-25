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

export interface EditDialogProps {
  editDialogOpen: boolean;
  handleEditDialogClose: Function;
  app: AppInterface | any;
}

export const EditDialogApp = (props: EditDialogProps) => {
  const [Nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [Path, setPath] = useState("");
  // esto creo que es solo para poder prender o apagar el switch
  const [estatus, setEstatus] = useState<boolean>(false);

  useEffect(() => {
    setNombre(props?.app?.row?.Nombre);
    setPath(props?.app?.row?.Path);
    setDescripcion(props?.app?.row?.Descripcion)
    //setEstaActivo(props.app.EstaActivo === 1 ? reue : else);
    setEstatus(props?.app?.row?.estatusLabel === "Activo" ? true : false);
  }, [
    props?.app?.row?.Id,
    props?.app?.row?.Nombre,
    props?.app?.row?.Path,
    props?.app?.row?.estatusLabel,
  ]);

  const handleUpdateBtn = () => {
    if (Nombre === "" || Path === ""||descripcion==="") {
      Swal.fire({
        icon: "error",
        title: "Aviso",
        text: "Favor de completar todos los campos para continuar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#15212f",
      });
    } else {
      const data = {
        //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual
        IdApp: props.app.row.Id,
        Nombre: Nombre,
        Path: Path,
        Descripcion:descripcion,
        EstaActivo: estatus ? 1 : 0,
        IdUsuarioModificador: localStorage.getItem("IdUsuario"),
      };
      axios({
        method: "put",
        url: process.env.REACT_APP_APPLICATION_DEV + `/api/app`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
          //Authorization: token ,
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
            text:
              "(" + error.response.status + ") " + error.response.data.message,
          });
        });
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
      {/* esta es la pantalla modal que se abre al darle editar un registro */}
      <DialogTitle id="edit-dialog-title">
        Editar Aplicación {props.app.row.Nombre}
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
          {/* campo nombre */}
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
              value={Nombre}
              onChange={(v) => setNombre(v.target.value)}
            />
          </Grid>
          {/* campo path */}
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

              value={Path}
              onChange={(v) => setPath(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} >
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
              value={descripcion}
              onChange={(v) => setDescripcion(v.target.value)}
            />
          </Grid>
          {/* objeto de estatus */}
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={estatus}
                    onChange={(v) => setEstatus(v.target.checked)}
                  />
                }
                label={estatus ? "Activo" : "Inactivo"}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>

      {/* botones que se muestran en el modal */}
      <DialogActions>
        <Button color="error" onClick={() => props.handleEditDialogClose()}>
          Cancelar
        </Button>
        <Button onClick={() => handleUpdateBtn()}>Actualizar</Button>
      </DialogActions>
    </Dialog>
  );
};
