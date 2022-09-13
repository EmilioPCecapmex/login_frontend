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
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Usuario } from "../screens/Users/Users";

export interface EditDialogProps {
  editDialogOpen: boolean;
  handleEditDialogClose: Function;
  usuario: Usuario | any;
}

export const EditDialog = (props: EditDialogProps) => {
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [estaActivo, setEstaActivo] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const ConfirmDeleteDialog = () => {
    return (
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "MontserratSemiBold" }}
        >
          {"Eliminar registro"}
        </DialogTitle>
        <DialogContent sx={{ fontFamily: "MontserratLight" }}>
          ¿Esta seguro de que desea eliminar el registro?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            color="error"
            sx={{ fontFamily: "MontserratRegular" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => deleteUser()}
            autoFocus
            sx={{ fontFamily: "MontserratRegular" }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const deleteUser = () => {
    axios({
      method: "delete",
      url: "http://10.200.4.105:5000/api/user",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: {
        IdUsuario: props.usuario.Id,
      },
    })
      .then(function (response) {
        handleCloseDelete();
        props.handleEditDialogClose(true);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };

  useEffect(() => {
    setNombre(props.usuario.Nombre);
    setNombreUsuario(props.usuario.NombreUsuario);
    setApellidoPaterno(props.usuario.ApellidoPaterno);
    setApellidoMaterno(props.usuario.ApellidoMaterno);
    setEstaActivo(props.usuario.EstaActivoLabel === "Activo" ? true : false);
  }, [
    props.usuario.Nombre,
    props.usuario.NombreUsuario,
    props.usuario.ApellidoPaterno,
    props.usuario.ApellidoMaterno,
    props.usuario.EstaActivoLabel,
  ]);

  const handleUpdateBtn = () => {
    if (nombre === "" || apellidoPaterno === "" || apellidoMaterno === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      const data = {
        IdUsuario: props.usuario.Id,
        Nombre: nombre,
        ApellidoPaterno: apellidoPaterno,
        ApellidoMaterno: apellidoMaterno,
        EstaActivo: estaActivo ? 1 : 0,
        IdUsuarioModificador: localStorage.getItem("IdUsuario") || "",
      };

      axios({
        method: "put",
        url: "http://10.200.4.105:5000/api/user",
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
            text: "(" + error.response.status + ") " + error.response.data.msg,
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
      <ConfirmDeleteDialog />
      <DialogTitle id="edit-dialog-title">
        <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "1vw" }}>
          Editar usuario: {nombreUsuario}
        </Typography>
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
              label="Nombre(s)"
              type="text"
              fullWidth
              variant="standard"
              value={nombre}
              onChange={(v) => setNombre(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="apellidoPaterno"
              label="Apellido Paterno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoPaterno}
              onChange={(v) => setApellidoPaterno(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="apellidoMaterno"
              label="Apellido Materno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoMaterno}
              onChange={(v) => setApellidoMaterno(v.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={estaActivo}
                    onChange={(v) => setEstaActivo(v.target.checked)}
                  />
                }
                label={estaActivo ? "Activo" : "Inactivo"}
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ fontFamily: "MontserratRegular" }}
              onClick={() => handleClickOpenDelete()}
            >
              Eliminar Usuario
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => props.handleEditDialogClose()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => handleUpdateBtn()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
