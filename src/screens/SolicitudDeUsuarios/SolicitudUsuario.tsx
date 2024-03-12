import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserServices } from "../../services/UserServices";
import { getCatalogo } from "../../services/catalogosService";
import { IEntidadPadre, IRol } from "./ICatalogos";
import SliderProgress from "../Componentes/SliderProgress";

export interface NewDialogProps {
  modoModal: boolean;
  token: string;
  idUsuarioSolicitante: string;
  idUsuarioModificado: string;
  idApp: string;
  handleDialogClose: Function;
}

export interface IApps {
  Id: string;
  Nombre: string;
  Descripcion: string;
  EstaActivo: string;
  Path: string;
}

export interface IUserTypes {
  Id: string;
  Nombre: string;
  Descripcion: string;
}

export interface IInfoUsuario {
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  Aplicacion: { Id: string; Nombre: string };
  TipoUsuario: { Id: string; Nombre: string };
  Puesto: string;
  CURP: string;
  RFC: string;
  Celular: string;
  Telefono: string;
  Ext: string;
  Roles: { Id: string; Nombre: string }[];
  Entidad: { Id: string; Nombre: string };
  PuedeFirmar: boolean;
}

export const SolicitudUsuario = (props: NewDialogProps) => {
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  const IdUsuario =
    props.idUsuarioModificado || query.get("idUsuarioModificado") || "";

  const [bajaUsuario, setBajaUsuario] = useState(false);

  const [apps, setApps] = useState<Array<IApps>>([]);
  const [usertypes, setUserTypes] = useState<Array<IUserTypes>>([]);
  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [entidades, setEntidades] = useState<Array<IEntidadPadre>>([]);

  const [existeCorreo, setExisteCorreo] = useState(false);
  const [existeNUsuario, setExisteNUsuario] = useState(false);

  const [infoUsuario, setInfoUsuario] = useState<IInfoUsuario>({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreUsuario: "",
    CorreoElectronico: "",
    Aplicacion: {
      Id: props.idApp || localStorage.getItem("IdApp")!,
      Nombre: "",
    },
    TipoUsuario: { Id: "", Nombre: "" },
    Puesto: "",
    CURP: "",
    RFC: "",
    Celular: "",
    Telefono: "",
    Ext: "",
    Roles: [],
    Entidad: { Id: "", Nombre: "" },
    PuedeFirmar: false,
  });

  function validarCadena(Nombre: string): boolean {
    const patron = /^(?!.*\s{2})[a-zA-ZáÁéÉíÍóÓúÚñÑ0-9\s']*$/;
    return patron.test(Nombre);
  }

  const Toast = Swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const compruebaRfc = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (!format.test(value)) {
      setInfoUsuario({ ...infoUsuario, RFC: value });
    }
  };

  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9ñÑ._%+-]+@[a-zA-Z0-9ñÑ.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(infoUsuario.CorreoElectronico);
  }

  const compruebaCurp = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (!format.test(value)) {
      setInfoUsuario({ ...infoUsuario, CURP: value });
    }
  };

  const checkFill = () => {
    let err = [];
    if (infoUsuario.NombreUsuario.length < 4 || existeNUsuario) {
      err.push(
        `Ingresa <strong style="color: red;">Nombre Usuario</strong> válido`
      );
    }
    if (!isValidEmail()) {
      err.push(
        `Ingresa <strong style="color: red;">Correo Electrónico</strong> válido`
      );
    }
    if (infoUsuario.Nombre === "") {
      err.push(`Ingresa <strong style="color: red;">Nombre</strong>`);
    }
    if (infoUsuario.ApellidoPaterno === "") {
      err.push(`Ingresa <strong style="color: red;">Apellido Paterno</strong>`);
    }
    if (infoUsuario.ApellidoMaterno === "") {
      err.push(`Ingresa <strong style="color: red;">Apellido Materno</strong>`);
    }
    if (infoUsuario.Puesto === "") {
      err.push(`Ingresa <strong style="color: red;">Puesto</strong>`);
    }
    if (infoUsuario.CURP === "") {
      err.push(`Ingresa <strong style="color: red;">CURP</strong>`);
    }
    if (infoUsuario.RFC === "") {
      err.push(`Ingresa <strong style="color: red;">RFC</strong>`);
    }
    if (infoUsuario.Celular.length < 10) {
      err.push(
        `Ingresa número de <strong style="color: red;">Celular</strong> válido`
      );
    }
    if (infoUsuario.Telefono.length < 10) {
      err.push(
        `Ingresa número de <strong style="color: red;">Teléfono</strong> válido`
      );
    }
    if (infoUsuario.Aplicacion.Id === "") {
      err.push(`Ingresa <strong style="color: red;">Aplicación</strong>`);
    }
    if (infoUsuario.TipoUsuario.Nombre === "") {
      err.push(`Ingresa <strong style="color: red;">Tipo Usuario</strong>`);
    }
    if (infoUsuario.Roles.length === 0) {
      err.push(`Ingresa <strong style="color: red;">Roles</strong>`);
    }
    if (infoUsuario.Entidad.Nombre === "") {
      err.push(`Ingresa <strong style="color: red;">Entidad</strong>`);
    }

    if (err.length > 0) {
      Toast.fire({
        icon: "info",
        html: `
          <div style="height:50%; width:100%;">
            <h3>Se han encontrado los siguientes errores:</h3>
            <div style="text-align: left; margin-left: 10px; color: black; height: auto; overflow: auto;">
              <small>
                <strong>
                  *
                </strong>${err.join("<br><strong>*</strong>")}
              </small>
            </div>
          </div>`,

        // confirmButtonColor: "#15212f",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "aceptar", // Agrega una clase CSS personalizada al botón de confirmación
        },
      });
    } else {
      handleStoreBtn();
    }
  };

  const handleStoreBtn = () => {
    const IdRoles: any[] = [];
    infoUsuario.Roles.forEach(function (item) {
      IdRoles.push(item.Id);
    });
    const data = {
      Nombre: infoUsuario.Nombre,
      APaterno: infoUsuario.ApellidoPaterno,
      AMaterno: infoUsuario.ApellidoMaterno,
      NombreUsuario: infoUsuario.NombreUsuario,
      Email: infoUsuario.CorreoElectronico,
      Curp: infoUsuario.CURP,
      RFC: infoUsuario.RFC,
      Celular: infoUsuario.Celular.toString(),
      Telefono: infoUsuario.Telefono.toString(),
      Extencion: infoUsuario.Ext.toString(),
      TipoSolicitud: bajaUsuario
        ? "BAJA"
        : existeCorreo
        ? "VINCULACION"
        : IdUsuario
        ? "MODIFICACION"
        : "ALTA",
      IdApp: infoUsuario.Aplicacion.Id,
      CreadoPor: props.idUsuarioSolicitante
        ? props.idUsuarioSolicitante
        : localStorage.getItem("IdUsuario"),
      Roles: JSON.stringify({ Roles: IdRoles }),
      IdTipoUsuario: infoUsuario.TipoUsuario.Id,
      PuedeFirmar: infoUsuario.PuedeFirmar ? 1 : 0,
      Puesto: infoUsuario.Puesto,
      Entidad: infoUsuario.Entidad.Id,
    };

    UserServices.createsolicitud(
      data,
      String(jwt) !== "null"
        ? String(jwt)
        : String(localStorage.getItem("jwtToken"))
    )
      .then((res) => {
        console.log(res.status);

        if (res.status === 200) {
          if (
            res.data.data[0][0].Respuesta === "406" ||
            res.data.data[0][0].Respuesta === "403"
          )
            Swal.fire({
              icon: "info",
              title: "Mensaje",
              iconColor: "#af8c55",
              color: "#af8c55",
              text: res.data.data[0][0].Mensaje,
              confirmButtonText: "Aceptar",
                      confirmButtonColor: "#15212f",
            });

          if (res.data.data[0][0].Respuesta === "201") {
            Swal.fire({
              icon: "success",
              title: "Mensaje",
              text: "¡Se creo la solicitud!",
              confirmButtonText: "Aceptar",
                      confirmButtonColor: "#15212f",
              customClass: {
                confirmButton: "aceptar", // Agrega una clase CSS personalizada al botón de confirmación
              },
            }).then((result) => {
              if (result.isConfirmed) {
                props.handleDialogClose(false);
              }
            });
          }

          // setUserTypes(res?.data?.data);
        } else if (res.status === 409) {
          Swal.fire({
            icon: "info",
            title: "Mensaje",
            iconColor: "#af8c55",
            color: "#af8c55",
            text: ` Sucedio un error ${res.data.error}`,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#15212f",
          });
          // alertaInformativa()
        } else {
          Swal.fire({
            icon: "info",
            title: "Mensaje",
            iconColor: "#af8c55",
            color: "#af8c55",
            text: " Sucedio un error",
            confirmButtonText: "Aceptar",
                    confirmButtonColor: "#15212f",
          });
          setBajaUsuario(false);
        }
      })
      .catch((error) => {
        console.log("error", error.data.error);

        Swal.fire({
          icon: "info",
          title: "Mensaje",
          iconColor: "#af8c55",
          color: "#af8c55",
          text: "Error al realizar el registro " + error,
        });
      });
  };

  const getAllUserTypes = () => {
    const data = {
      IdApp: props.idApp,
    };
    UserServices.usertypes(
      data,
      String(jwt) !== "null"
        ? String(jwt)
        : String(localStorage.getItem("jwtToken"))
    ).then((res) => {
      if (res.status === 200) {
        setUserTypes(res?.data?.data);
      }
    });
  };

  const cleanData = () => {
    setInfoUsuario({
      ...infoUsuario,
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: "",
      //  usuario,
      CorreoElectronico: "",
      // CorreoElectronico,
      Puesto: "",
      CURP: "",
      RFC: "",
      Celular: "",
      Telefono: "",
      Ext: "",
      Roles: [],
      PuedeFirmar: false,
    });
  };

  const existeEmail = (CorreoElectronico: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(CorreoElectronico)) {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_DEV + "/api/validar-email",
          {
            Email: CorreoElectronico,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          const data = r.data.result[0];
          if (data) {
            setExisteCorreo(true);
            setInfoUsuario({
              ...infoUsuario,
              Nombre: data.Nombre,
              ApellidoPaterno: data.ApellidoPaterno,
              ApellidoMaterno: data.ApellidoMaterno,
              NombreUsuario: data.NombreUsuario,
              CorreoElectronico: CorreoElectronico,
              Puesto: data.Puesto,
              CURP: data.Curp,
              RFC: data.Rfc,
              Celular: data.Celular,
              Telefono: data.Telefono,
              Ext: data.Ext,
              PuedeFirmar: data.PuedeFirmar === 1,
            });
          } else {
            setExisteCorreo(false);
            // cleanData(CorreoElectronico, "");
          }
        })
        .catch((err) => {
          setExisteCorreo(false);
          // cleanData(CorreoElectronico, "");
        });
    } else {
      setExisteCorreo(false);
      // cleanData(CorreoElectronico, "");
    }
  };

  const existeUName = (uName: string) => {
    if (uName.length > 4) {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_DEV + "/api/validar-username",
          {
            UserName: uName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          const data = r.data.result[0];
          if (data.Existe !== 0) {
            setExisteNUsuario(true);
          } else {
            setExisteNUsuario(false);
          }
        })
        .catch((err) => {});
    } else {
      setExisteNUsuario(false);
    }
  };

  const [datosObtenidos, setDatosObtenidos] = useState(true);

  useEffect(() => {
    if (
      (infoUsuario.Entidad.Nombre !== "" && infoUsuario.NombreUsuario) ||
      !props.idApp ||
      !localStorage.getItem("IdApp")!
    )
      setDatosObtenidos(false);
  }, [infoUsuario.Entidad.Nombre]);

  useEffect(() => {
    if (apps.length > 0) {
      if (props.idApp !== "") {
        let aux = apps.find((app) => app.Id === props.idApp);
        if (aux) {
          setInfoUsuario({
            ...infoUsuario,
            Aplicacion: { Id: aux.Id, Nombre: aux.Nombre },
          });
          getCatalogo("roles", setRoles, props.idApp, props.token);
        }
      }
    }
  }, [apps]);

  useEffect(() => {
    getAllUserTypes();
  }, [infoUsuario.Aplicacion]);

  useEffect(() => {
    getCatalogo("apps", setApps, "", props.token);
    getCatalogo("lista-entidades", setEntidades, "", props.token);

    if (IdUsuario) {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_DEV + "/api/userapp-detail",
          {
            IdUsuario: IdUsuario,
            IdApp: props.idApp,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          const data = r.data.data;
          const roles = r.data.roles[0];
          setInfoUsuario({
            ...infoUsuario,
            Nombre: data.Nombre,
            ApellidoPaterno: data.ApellidoPaterno,
            ApellidoMaterno: data.ApellidoMaterno,
            NombreUsuario: data.NombreUsuario,
            CorreoElectronico: data.CorreoElectronico,
            Aplicacion: {
              Id: props.idApp || "",
              Nombre: data.Aplicacion || "",
            },
            TipoUsuario: {
              Id: data.IdTipoUsuario || "",
              Nombre: data.TipoUsuario || "",
            },
            Puesto: data.Puesto,
            CURP: data.CURP,
            RFC: data.RFC,
            Celular: data.Celular,
            Telefono: data.Telefono,
            Ext: data.Ext,
            Roles: roles || [],
            Entidad: {
              Id: data.IdEntidad || "",
              Nombre: data.Entidad || "",
            },
            PuedeFirmar: data.PuedeFirmar === 1,
          });
          console.log("data.Entidad ", data.Entidad);
          console.log("data.Nombre", data.Nombre);
          console.log("data.ApellidoPaterno", data.ApellidoPaterno);
          console.log("ApellidoMaterno", data.ApellidoMaterno);
          console.log("data.NombreUsuario", data.NombreUsuario);
          console.log("data.CorreoElectronico", data.CorreoElectronico);
          console.log("data.Aplicacion", data.Aplicacion);
          console.log("data.IdTipoUsuario", data.IdTipoUsuario);
          console.log("data.Puesto", data.Puesto);
          console.log("data.TipoUsuario", data.TipoUsuario);
          if (
            !data.Entidad ||
            !data.Nombre ||
            !data.ApellidoPaterno ||
            !data.ApellidoMaterno ||
            !data.NombreUsuario ||
            !data.CorreoElectronico ||
            !data.Aplicacion ||
            !data.IdTipoUsuario ||
            !data.TipoUsuario ||
            !data.Puesto
          ) {
            Swal.fire({
              icon: "info",
              title: "Mensaje",
              iconColor: "#af8c55",
              color: "#af8c55",
              text:
                "La información del usuario está incompleta. Contacte con un administrador.",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#15212f",
              showCloseButton: true, // Muestra el botón de cerrar para que el usuario pueda cerrar la alerta
            }).then((result) => {
              if (result.isConfirmed) {
                // Aquí puedes agregar tu lógica personalizada para el botón "OK"
                props.handleDialogClose(false);
              }
            });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    
    <Grid
      container item
      display={"flex"}
      justifyContent={"space-evenly"}
      alignContent={"space-around"}
      spacing={4}
    >
      
      <Grid item xs={10} md={4.5} >
        <TextField
          disabled={IdUsuario !== ""}
          label="Correo Electrónico"
          type="text"
          fullWidth
          variant="standard"
          helperText={
            !isValidEmail() && infoUsuario.CorreoElectronico.length > 0
              ? "Ingresa correo válido: correo@correo.com | correo@correo.com.mx"
              : isValidEmail() && infoUsuario.CorreoElectronico.length > 0
              ? "Correo válido"
              : ""
          }
          value={infoUsuario.CorreoElectronico}
          inputProps={{ maxLength: 100 }}
          onChange={(v) => {
            setInfoUsuario({
              ...infoUsuario,
              CorreoElectronico: v.target.value,
            });

            existeEmail(v.target.value);
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo || IdUsuario !== ""}
          error={existeNUsuario}
          autoFocus
          label="Nombre de Usuario"
          type="text"
          fullWidth
          variant="standard"
          helperText={
            infoUsuario.NombreUsuario.length > 0 &&
            infoUsuario.NombreUsuario.length < 4
              ? "Ingresa nombre de usuario de entre 4 a 30 dígitos"
              : existeNUsuario
              ? "Nombre de usuario actualmente en uso"
              : ""
          }
          value={infoUsuario.NombreUsuario}
          inputProps={{ minLength: 4, maxLength: 30 }}
          onChange={(v) => {
            if (/^[^$%&|<>#'"]*$/.test(v.target.value)) {
              existeUName(v.target.value);
              setInfoUsuario({ ...infoUsuario, NombreUsuario: v.target.value });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="Nombre(s)"
          fullWidth
          variant="standard"
          value={infoUsuario.Nombre}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({ ...infoUsuario, Nombre: v.target.value });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="Apellido Paterno"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.ApellidoPaterno}
          inputProps={{ maxLength: 20 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({
                ...infoUsuario,
                ApellidoPaterno: v.target.value,
              });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="Apellido Materno"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.ApellidoMaterno}
          inputProps={{ maxLength: 20 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({
                ...infoUsuario,
                ApellidoMaterno: v.target.value,
              });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="Puesto"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.Puesto}
          inputProps={{ maxLength: 255 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({ ...infoUsuario, Puesto: v.target.value });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="CURP"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.CURP}
          inputProps={{ maxLength: 18, minLength: 18 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              compruebaCurp(v.target.value.toUpperCase());
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          label="RFC"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.RFC}
          inputProps={{ maxLength: 13, minLength: 12 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              compruebaRfc(v.target.value.toUpperCase());
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          disabled={existeCorreo}
          fullWidth
          sx={{ mr: 4 }}
          label="Teléfono Móvil "
          value={infoUsuario.Celular}
          inputProps={{ maxLength: 10 }}
          variant="standard"
          helperText={
            infoUsuario.Celular.length > 0 && infoUsuario.Celular.length < 10
              ? "Ingresa número a 10 dígitos"
              : ""
          }
          onChange={(v) => {
            setInfoUsuario({
              ...infoUsuario,
              Celular: /^[0-9]+$/.test(v.target.value) ? v.target.value : "",
            });
          }}
        />
      </Grid>

      <Grid
        item
        xs={10}
        md={4.5}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <TextField
          disabled={existeCorreo}
          sx={{ width: "60%" }}
          label="Teléfono"
          value={infoUsuario.Telefono}
          inputProps={{ maxLength: 10 }}
          variant="standard"
          helperText={
            infoUsuario.Telefono.length > 0 && infoUsuario.Telefono.length < 10
              ? "Ingresa número a 10 dígitos"
              : ""
          }
          onChange={(v) => {
            if (/^[0-9]+$/.test(v.target.value) || v.target.value === "")
              setInfoUsuario({
                ...infoUsuario,
                Telefono: v.target.value,
              });
          }}
        />

        <TextField
          disabled={existeCorreo}
          sx={{ width: "30%" }}
          label="Extensión"
          value={infoUsuario.Ext}
          variant="standard"
          type="tel"
          inputProps={{ maxLength: 4 }}
          onChange={(v) => {
            if (/^[0-9*]+$/.test(v.target.value) || v.target.value === "") {
              setInfoUsuario({
                ...infoUsuario,
                Ext: v.target.value,
              });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2"> Aplicación: </Typography>
        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          openText="Abrir"
          disabled={props.idApp !== "" || IdUsuario !== ""}
          options={apps}
          getOptionLabel={(app) => app.Nombre || "Seleccione Aplicación"}
          value={infoUsuario.Aplicacion}
          onChange={(event, v) => {
            if (v !== null) {
              setInfoUsuario({
                ...infoUsuario,
                TipoUsuario: { Nombre: "", Id: "" },
                Roles: [],
                Aplicacion: { Id: v?.Id, Nombre: v?.Nombre! },
              });
              getCatalogo("roles", setRoles, v?.Id, props.token);
            }
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre || value.Nombre === ""
          }
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2"> Tipo de usuario: </Typography>
        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          openText="Abrir"
          options={usertypes}
          getOptionLabel={(ut) => ut.Nombre || "Seleccione Tipo de Usuario"}
          value={infoUsuario.TipoUsuario}
          onChange={(event, v) => {
            setInfoUsuario({
              ...infoUsuario,
              TipoUsuario: { Nombre: v?.Nombre!, Id: v?.Id! },
            });
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre || value.Nombre === ""
          }
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2"> Roles: </Typography>
        <Autocomplete
          multiple
          disabled={roles.length === 0}
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          openText="Abrir"
          options={roles}
          getOptionLabel={(rol) => rol.Nombre || "Seleccione Roles"}
          value={infoUsuario.Roles}
          onChange={(event, newValue) => {
            if (newValue != null) {
              setInfoUsuario({ ...infoUsuario, Roles: newValue });
            }
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre || value.Nombre === ""
          }
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2">Entidad: </Typography>

        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          openText="Abrir"
          options={entidades}
          getOptionLabel={(entidad) => entidad.Nombre || "Seleccione Entidad"}
          value={infoUsuario.Entidad}
          onChange={(event, v) => {
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                Entidad: { Id: v.Id, Nombre: v.Nombre },
              });
            }
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre || value.Nombre === ""
          }
        />
      </Grid>

      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}
      >
        <Grid
          item
          container
          xs={11.5}
          sm={11.5}
          md={6}
          lg={6}
          xl={6}
          sx={{ display: "flex",justifyContent:'space-between' }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={infoUsuario.PuedeFirmar}
                  onChange={(v) =>
                    setInfoUsuario({
                      ...infoUsuario,
                      PuedeFirmar: !infoUsuario.PuedeFirmar,
                    })
                  }
                />
              }
              label={infoUsuario.PuedeFirmar ? "Puede firmar" : "No puede firmar"}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {IdUsuario === "" ? (
              <Button
                className="aceptar"
                onClick={() => {
                  cleanData();
                }}
                sx={{ fontFamily: "MontserratRegular", mr: 2 }}
              >
                Limpiar Datos
              </Button>
            ) : null}
          </Grid>
        </Grid>

        <Grid
          item
          xs={11.5}
          sm={11.5}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              
            }}
          >
            {IdUsuario && (
              <Button
                className="cancelar"
                onClick={() => {
                  setBajaUsuario(true);
                }}
                sx={{ fontFamily: "MontserratRegular", mr: 2 }}
              >
                Eliminar Usuario
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              className="aceptar"
              onClick={() => {
                checkFill();
              }}
              sx={{ fontFamily: "MontserratRegular", }}
            >
              {IdUsuario ? "Solicitar Modificación" : "Solicitar Usuario"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <SliderProgress
        open={datosObtenidos}
        fnc={() => props.handleDialogClose(false)}
        texto="Obteniendo datos"
      />

      <Dialog open={bajaUsuario} onClose={() => setBajaUsuario(false)}>
        <DialogTitle sx={{ fontFamily: "MontserratSemiBold" }}>
          Baja de Usuario
        </DialogTitle>
        <DialogContent sx={{ fontFamily: "MontserratRegular" }}>
          ¿Está seguro que desea solicitar la baja de este usuario?
        </DialogContent>
        <DialogActions>
          <Button
            className="cancelar"
            onClick={() => {
              // navigate(-1);
              setBajaUsuario(false);
            }}
            sx={{ fontFamily: "MontserratRegular", mr: 2 }}
          >
            Cancelar
          </Button>
          <Button
            className="aceptar"
            onClick={() => {
              // checkFill();
              handleStoreBtn();
            }}
            sx={{ fontFamily: "MontserratRegular" }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
    
    
  );
};
