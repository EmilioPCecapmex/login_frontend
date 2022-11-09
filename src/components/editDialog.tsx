import { Close as CloseIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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

export interface IUserTypes {
  Id: string;
  Nombre: string;
  Descripcion: string;
}

export const EditDialog = (props: EditDialogProps) => {
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [estaActivo, setEstaActivo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [celular, setCelular] = useState(0);
  const [telefono, setTelefono] = useState(0);
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");

  const compruebaCelular = (value: number) => {
    if (value <= 9999999999) {
      setCelular(value);
    } else if (value.toString() === "NaN") {
      setCelular(0);
    }
  };
  const compruebaTelefono = (value: number) => {
    if (value <= 9999999999) {
      setTelefono(value);
    } else if (value.toString() === "NaN") {
      setTelefono(0);
    }
  };
  const compruebaRfc = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(value)) {
      setRfc(value.toUpperCase());
    }
  };
  const compruebaCurp = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(value)) {
      setCurp(value.toUpperCase());
    }
  };

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
    setRfc(props.usuario.rfc);
    setCurp(props.usuario.curp);
    setTelefono(props.usuario.telefono);
    setCelular(props.usuario.celular);
  }, [
    props.usuario.Nombre,
    props.usuario.NombreUsuario,
    props.usuario.ApellidoPaterno,
    props.usuario.ApellidoMaterno,
    props.usuario.EstaActivoLabel,
    props.usuario.rfc,
    props.usuario.curp,
    props.usuario.telefono,
    props.usuario.celular,
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

  const [usertypes, setUserTypes] = useState<Array<IUserTypes>>([]);
  const getAllUserTypes = () => {
    const data = {
      IdUsuario: localStorage.getItem("IdUsuario"),
    };
    axios({
      method: "post",
      url: "http://10.200.4.105:5000/api/user-types",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: data,
    })
      .then(function (response) {
        setUserTypes(response.data.data);
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
    getAllUserTypes();
  }, []);

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

          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="curp"
              label="CURP"
              type="text"
              fullWidth
              variant="standard"
              value={curp}
              required
              inputProps={{ maxLength: 18 }}
              onChange={(v) => compruebaCurp(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="rfc"
              label="RFC"
              type="text"
              fullWidth
              variant="standard"
              value={rfc}
              required
              inputProps={{ maxLength: 13 }}
              onChange={(v) => compruebaRfc(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="telefono"
              label="Telefono"
              value={telefono === 0 ? "" : telefono}
              fullWidth
              required
              variant="standard"
              onChange={(v) => compruebaTelefono(parseInt(v.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="celular"
              label="Celular"
              value={celular === 0 ? "" : celular}
              fullWidth
              required
              variant="standard"
              onChange={(v) => compruebaCelular(parseInt(v.target.value))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl required variant="standard" fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Tipo de Usuario
              </InputLabel>

              <Select
                id="tipousuario"
                // value={age}
                // onChange={handleChange}
                sx={{ display: "flex", pt: 1 }}
              >
                {usertypes.map((types) => (
                  <MenuItem key={types.Id} value={types.Id}>
                    {types.Descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={9}
            md={9}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
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
              justifyContent: "flex-end",
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
