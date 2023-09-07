import { Close as CloseIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
}

export const NewDialogApp = (props: NewDialogProps) => {
  const [nombre, setNombre] = useState("");
  const [path, setPath] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleStoreBtn();
    }
  };

  const handleStoreBtn = () => {
    if (nombre === "" || path === "") {
      Swal.fire({
        icon: "info",
        title: "Aviso",
        text: "Favor de completar todos los campos para continuar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#15212f",
      });
    } else {
      //setIDUsuarioModifica("c18fc135-3a89-11ed-aed0-040300000000");
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual
      const data = {
        Nombre: nombre,
        Path: path,
        Descripcion: descripcion,
        IdUsuarioModificador: localStorage.getItem("IdUsuario"),
      };
      axios({
        method: "post",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/create-app",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
          //Authorization: token ,
        },
        data: data,
      })
        .then(function (response) {
          props.handleNewDialogClose(true);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "info",
            title: "Mensaje",
            text: "(" + error.response.status + ") " + error.response.data.msg,
            confirmButtonColor: "#2f2f2f",
          });
        });
    }
  };

  return (
    <Dialog
      open={props.newDialogOpen}
      onClose={() => props.handleNewDialogClose()}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      {/* pantalla modal, para agregar una aplicación nueva */}
      <DialogTitle id="edit-dialog-title">
        Registro de Aplicación
        <IconButton
          aria-label="close"
          onClick={() => props.handleNewDialogClose()}
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
          {/* campo de nombre */}
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={nombre}
              required
              onChange={(v) => setNombre(v.target.value)}
              autoFocus
            />
          </Grid>
          {/* campo de path */}
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="path"
              label="Ruta"
              type="text"
              fullWidth
              variant="standard"
              value={path}
              required
              onChange={(v) => setPath(v.target.value)}
              onKeyDown={handleKeyDown}
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
              value={descripcion}
              onChange={(v) => setDescripcion(v.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          className="cancelar"
          onClick={() => props.handleNewDialogClose()}
        >
          Cancelar
        </Button>
        <Button className="aceptar" onClick={() => handleStoreBtn()}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};
