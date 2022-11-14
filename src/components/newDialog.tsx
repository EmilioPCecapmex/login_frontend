import { Close as CloseIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IdUsuario_LS } from "../funcs/validation";

export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
}

export interface IUserTypes {
  Id:          string;
  Nombre:      string;
  Descripcion: string;
}

export const NewDialog = (props: NewDialogProps) => {
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");

  const [celular, setCelular] = useState(0);
  const [telefono, setTelefono] = useState(0);
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");

  const [tipousuario, setTipoUsuario] = useState("");

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

  const handleStoreBtn = () => {
    if (
      nombre === "" ||
      nombreUsuario === "" ||
      apellidoPaterno === "" ||
      apellidoMaterno === "" ||
      rfc === "" ||
      curp === "" ||
      telefono <= 0 ||
      celular <= 0 ||
      tipousuario === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      // console.log(IdUsuario_LS);
      const data = {
        Nombre: nombre,
        ApellidoPaterno: apellidoPaterno,
        ApellidoMaterno: apellidoMaterno,
        NombreUsuario: nombreUsuario,
        CorreoElectronico: correo,
        IdUsuarioModificador: localStorage.getItem("IdUsuario"),
       
        Rfc: rfc,
        Curp: curp,
        Telefono: telefono,
        Celular: celular,
        IdTipoUsuario: tipousuario
      };
      axios({
        method: "post",
        url: process.env.REACT_APP_APPLICATION_DEV + "/api/sign-up",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        data: data,
      })
        .then(function (response) {
          props.handleNewDialogClose(true);
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

  const [usertypes, setUserTypes] = useState <Array<IUserTypes>>([]) ;
  const [usertypessel, setUserTypesSel] = useState ("") ;
  const getAllUserTypes = () => {
    const data = {
      IdUsuario: localStorage.getItem("IdUsuario"),
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/user-types",
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
      open={props.newDialogOpen}
      onClose={() => props.handleNewDialogClose()}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle
        id="edit-dialog-title"
        sx={{ fontFamily: "MontserratRegular" }}
      >
        Registro de Usuario
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
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              margin="dense"
              id="nombreUsuario"
              label="Nombre de Usuario"
              type="text"
              fullWidth
              variant="standard"
              value={nombreUsuario}
              required
              inputProps={{ minLength: 4 }}
              onChange={(v) => setNombreUsuario(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="nombre"
              label="Nombre(s)"
              type="text"
              fullWidth
              variant="standard"
              value={nombre}
              required
              onChange={(v) => setNombre(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="apellidoPaterno"
              label="Apellido Paterno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoPaterno}
              required
              onChange={(v) => setApellidoPaterno(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="apellidoMaterno"
              label="Apellido Materno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoMaterno}
              required
              onChange={(v) => setApellidoMaterno(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              id="correo"
              label="Correo Electrónico"
              type="text"
              fullWidth
              variant="standard"
              value={correo}
              required
              onChange={(v) => setCorreo(v.target.value)}
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
                onChange={(v) => setTipoUsuario(v.target.value) }
                id="tipousuario"
                value={tipousuario}
                sx={{ display: "flex", pt: 1 }}
              >
                {usertypes.map((types) => (
                  <MenuItem
                    key={types.Id}
                    value={types.Id}
                  >
                    {types.Descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => props.handleNewDialogClose()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => handleStoreBtn()}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Grabar
        </Button>
      </DialogActions>
    </Dialog>
  );
};




