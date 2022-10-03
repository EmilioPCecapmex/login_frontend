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

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      console.log(event.key);
      handleStoreBtn();
    }
  };

  const handleStoreBtn = () => {
    if (nombre === "" || path === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      //setIDUsuarioModifica("c18fc135-3a89-11ed-aed0-040300000000");
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual
      const data = {
        Nombre: nombre,
        Path: path,
        IdUsuarioModificador: localStorage.getItem("IdUsuario"),
      };
      axios({
        method: "post",
        url: "http://10.200.4.105:5000/api/create-app",
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
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "(" + error.response.status + ") " + error.response.data.msg,
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
              label="Path"
              type="text"
              fullWidth
              variant="standard"
              value={path}
              required
              onChange={(v) => setPath(v.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={() => props.handleNewDialogClose()}>
          Cancelar
        </Button>
        <Button onClick={() => handleStoreBtn()}>Crear</Button>
      </DialogActions>
    </Dialog>
  );
};
