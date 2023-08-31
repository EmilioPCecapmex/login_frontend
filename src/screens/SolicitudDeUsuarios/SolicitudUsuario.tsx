import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserServices } from "../../services/UserServices";
import { getCatalogo } from "../../services/catalogosService";
import { IEntidadPadre, IRol } from "./ICatalogos";
import axios from "axios";

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
  Celular: number;
  Telefono: number;
  Ext: number;
  Roles: { Id: string; Nombre: string }[];
  Entidad: { Id: string; Nombre: string };
  PuedeFirmar: boolean;
}

export const SolicitudUsuario = (props: NewDialogProps) => {
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  //------------------------CATALOGOS-------------------------------------------

  const [bajaUsuario, setBajaUsuario] = useState(false);

  const [apps, setApps] = useState<Array<IApps>>([]);
  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [entidades, setEntidades] = useState<Array<IEntidadPadre>>([]);

  //elementos seleccionados
  const [infoUsuario, setInfoUsuario] = useState<IInfoUsuario>({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreUsuario: "",
    CorreoElectronico: "",
    Aplicacion: { Id: props.idApp, Nombre: "" },
    TipoUsuario: { Id: "", Nombre: "" },
    Puesto: "",
    CURP: "",
    RFC: "",
    Celular: 0,
    Telefono: 0,
    Ext: 0,
    Roles: [],
    Entidad: { Id: "", Nombre: "" },
    PuedeFirmar: false,
  });

  const [errores, setErrores] = useState({});

  function validarCadena(Nombre: string): boolean {
    const patron = /^(?!.*\s{2})[a-zA-ZáÁéÉíÍóÓúÚñÑ0-9\s']*$/;
    return patron.test(Nombre);
  }

  useEffect(() => {
    if (apps.length) {
      let aux = apps.find((app) => app.Id === props.idApp);
      if (aux) {
        setInfoUsuario({
          ...infoUsuario,
          Aplicacion: { Id: aux?.Id!, Nombre: aux?.Nombre! },
        });

        axios
          .post(
            process.env.REACT_APP_APPLICATION_DEV + "/api/userapp-detail",
            {
              IdUsuario: props.idUsuarioModificado,
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
            console.log(r);
            const data = r.data.data;
            const roles = r.data.roles[0];
            console.log(r.data.roles[0]);

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
                Nombre:
                  entidades.find((ent) => ent.Id === data.IdEntidad)?.Nombre! ||
                  "",
              },
              PuedeFirmar: data.PuedeFirmar === 1,
            });
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apps]);

  const compruebaCelular = (value: number) => {
    if (value <= 9999999999) {
      setInfoUsuario({ ...infoUsuario, Celular: value });
      setErrores({
        ...errores,
        Celular: {
          valid: false,
          text: "Ingresa Celular valido",
        },
      });
    } else if (value.toString() === "NaN") {
      setInfoUsuario({ ...infoUsuario, Celular: 0 });
    }
  };
  const compruebaTelefono = (value: number) => {
    if (value <= 9999999999) {
      setInfoUsuario({ ...infoUsuario, Telefono: value });
      setErrores({
        ...errores,
        Telefono: {
          valid: false,
          text: "Ingresa Telefono valido",
        },
      });
    } else if (value.toString() === "NaN") {
      setInfoUsuario({ ...infoUsuario, Telefono: 0 });
    }
  };

  const compruebaExt = (value: number) => {
    if (value <= 9999) {
      setInfoUsuario({ ...infoUsuario, Ext: value });
      setErrores({
        ...errores,
        Ext: {
          valid: false,
          text: "Ingresa extension valida",
        },
      });
    } else if (value.toString() === "NaN") {
      setInfoUsuario({ ...infoUsuario, Ext: 0 });
    }
  };

  const compruebaRfc = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (!format.test(value)) {
      setInfoUsuario({ ...infoUsuario, RFC: value });
    }
  };

  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        icon: "error",
        html: `
        <div style="height:50%; width:100%;">
        <h3>Se han encontrado los siguientes errores:</h3>
        <div style="text-align: left; margin-left: 10px; color: black; height: auto; overflow: auto;">
      <small>
      <strong>
      *</strong>${err.join("<br><strong>*</strong>")}
      </small>
      </div>
      </div>`,
      });
    } else {
      handleStoreBtn();
    }
  };

  const handleStoreBtn = () => {
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
        : props.idUsuarioModificado
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

    if (
      infoUsuario.Nombre === "" ||
      infoUsuario.ApellidoMaterno === "" ||
      infoUsuario.ApellidoPaterno === "" ||
      infoUsuario.NombreUsuario === "" ||
      !isValidEmail() ||
      infoUsuario.TipoUsuario.Nombre === "" ||
      infoUsuario.CURP === "" ||
      infoUsuario.RFC === "" ||
      infoUsuario.Puesto === "" ||
      infoUsuario.Celular <= 0 ||
      infoUsuario.Telefono <= 0 ||
      infoUsuario.Ext <= 0 ||
      infoUsuario.Entidad.descripcion === "" ||
      infoUsuario.Roles.length === 0 ||
      infoUsuario.UnidadResponsable.Id === "" ||
      infoUsuario.Aplicacion.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
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
        TipoSolicitud: props.idUsuarioModificado ? "MODIFICACION" : "ALTA",
        IdApp: infoUsuario.Aplicacion.value,
        CreadoPor: props.idUsuarioSolicitante
          ? props.idUsuarioSolicitante
          : localStorage.getItem("IdUsuario"),
        IdUResponsable: infoUsuario.UnidadResponsable.Id,
        Roles: JSON.stringify({ Roles: IdRoles }),
        IdTipoUsuario: infoUsuario.TipoUsuario.Id,
        PuedeFirmar: infoUsuario.PuedeFirmar ? 1 : 0,
        Puesto: infoUsuario.Puesto,
        Entidad: infoUsuario.Entidad.value,
      };

      UserServices.createsolicitud(
        data,
        String(jwt) !== "null"
          ? String(jwt)
          : String(localStorage.getItem("jwtToken"))
      )
        .then((res) => {
          if (res.status === 200) {
            if (
              res.data.data[0][0].Respuesta === "406" ||
              res.data.data[0][0].Respuesta === "403"
            )
              Swal.fire({
                icon: "error",
                title: "Mensaje",
                text: res.data.data[0][0].Mensaje,
              });

            if (res.data.data[0][0].Respuesta === "201") {
              Swal.fire({
                icon: "success",
                title: "Mensaje",
                text: res.data.data[0][0].Mensaje,
              }).then((result) => {
                if (result.isConfirmed) {
                  props.handleDialogClose(false);
                }
              });
            }

            // setUserTypes(res?.data?.data);
          } else {
            Swal.fire({
              icon: "error",
              title: "Mensaje",
              text: "(" + res.response.status + ") ",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "Error al realizar el registro",
          });
        });
    }
  };

  const [existeCorreo, setExisteCorreo] = useState(false);
  const [existeNUsuario, setExisteNUsuario] = useState(false);

  const [usertypes, setUserTypes] = useState<Array<IUserTypes>>([]);

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

  useEffect(() => {
    getAllUserTypes();
  }, [infoUsuario.Aplicacion]);

  useEffect(() => {
    getCatalogo("apps", setApps, "");
    getCatalogo("lista-entidades", setEntidades, "");

    if (props.idApp !== "") {
      let aux = apps.find((app) => (app.Id = props.idApp));
      if (aux) {
        setInfoUsuario({
          ...infoUsuario,
          Aplicacion: { Id: aux?.Id!, Nombre: aux?.Nombre! },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanData = (CorreoElectronico: string, usuario: string) => {
    setInfoUsuario({
      ...infoUsuario,
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: usuario,
      CorreoElectronico: CorreoElectronico,
      Aplicacion: { Id: props.idApp, Nombre: "" },
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
            cleanData(CorreoElectronico, "");
          }
        })
        .catch((err) => {
          setExisteCorreo(false);
          cleanData(CorreoElectronico, "");
        });
    } else {
      setExisteCorreo(false);
      cleanData(CorreoElectronico, "");
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

  return (
    <Grid
      container
      justifyContent={"space-evenly"}
      alignContent={"space-around"}
      height={"90vh"}
    >
      <Grid item xs={10} md={4.5}>
        <TextField
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
              if (infoUsuario.ApellidoPaterno.length >= 3)
                setErrores({
                  ...errores,
                  aPaterno: {
                    valid: false,
                    text: "Ingresa apellido paterno",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
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
              if (infoUsuario.ApellidoMaterno.length >= 3)
                setErrores({
                  ...errores,
                  aMAterno: {
                    valid: false,
                    text: "Ingresa apellido materno",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          autoFocus
          label="Nombre de Usuario"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.NombreUsuario}
          inputProps={{ minLength: 4, maxLength: 30 }} //validacion de longuitud  de texto
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({ ...infoUsuario, NombreUsuario: v.target.value });
              if (infoUsuario.NombreUsuario.length >= 3)
                setErrores({
                  ...errores,
                  nUsuario: {
                    valid: false,
                    text: "Ingresa infoUsuario.Nombre de usuario valido",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          label="Correo Electrónico"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.CorreoElectronico}
          inputProps={{ maxLength: 100 }}
          onChange={(v) => {
            setInfoUsuario({
              ...infoUsuario,
              CorreoElectronico: v.target.value,
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
            setInfoUsuario({
              ...infoUsuario,
              Telefono: /^[0-9]+$/.test(v.target.value) ? v.target.value : "",
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
            setInfoUsuario({
              ...infoUsuario,
              Ext: /^[0-9]+$/.test(v.target.value) ? v.target.value : "",
            });
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2"> Aplicación: </Typography>
        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          disabled={props.idApp !== ""}
          options={apps}
          getOptionLabel={(app) => app.Nombre || "Seleccione aplicacion"}
          value={infoUsuario.Aplicacion}
          onChange={(event, v) => {
            setInfoUsuario({
              ...infoUsuario,
              TipoUsuario: { Nombre: "", Id: "" },
            });
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                TipoUsuario: { Nombre: "", Id: "" },
                Roles: [],
                Aplicacion: { Id: v?.Id, Nombre: v?.Nombre! },
              });
              getCatalogo("roles", setRoles, v?.Id);
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
          options={usertypes}
          getOptionLabel={(ut) => ut.Nombre}
          value={infoUsuario.TipoUsuario}
          onChange={(event, v) => {
            setInfoUsuario({
              ...infoUsuario,
              TipoUsuario: { Nombre: "", Id: "" },
            });
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                TipoUsuario: {
                  Nombre: v?.Nombre,
                  Id: v?.Id!,
                },
              });
              setErrores({
                ...errores,
                aplicacion: {
                  valid: false,
                  text: "Ingresa aplicacion valido",
                },
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

      <Grid item xs={10} md={4.5}>
        <TextField
          label="Puesto"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.Puesto}
          inputProps={{ maxLength: 255 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              setInfoUsuario({ ...infoUsuario, Puesto: v.target.value });
              if (infoUsuario.Puesto.length >= 3)
                setErrores({
                  ...errores,
                  puesto: {
                    valid: false,
                    text: "Ingresa puesto",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          label="CURP"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.CURP}
          inputProps={{ maxLength: 18, minLength: 18 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              compruebaCurp(v.target.value.toUpperCase());
              if (infoUsuario.CURP.length >= 3)
                setErrores({
                  ...errores,
                  CURP: {
                    valid: false,
                    text: "Ingresa CURP valido",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          label="RFC"
          type="text"
          fullWidth
          variant="standard"
          value={infoUsuario.RFC}
          inputProps={{ maxLength: 13, minLength: 12 }}
          onChange={(v) => {
            if (validarCadena(v.target.value)) {
              compruebaRfc(v.target.value.toUpperCase());
              if (infoUsuario.RFC.length >= 12)
                setErrores({
                  ...errores,
                  RFC: {
                    valid: false,
                    text: "Ingresa RFC valido",
                  },
                });
            }
          }}
        />
      </Grid>

      <Grid item xs={10} md={4.5}>
        <TextField
          fullWidth
          sx={{ mr: 4 }}
          label="Celular"
          value={infoUsuario.Celular === 0 ? "" : infoUsuario.Celular}
          inputProps={{ maxLength: 10 }}
          variant="standard"
          onChange={(v) => {
            compruebaCelular(parseInt(v.target.value));
            if (infoUsuario.Celular > 1)
              setErrores({
                ...errores,
                Celular: {
                  valid: false,
                  text: "Ingresa Celular valido",
                },
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
          sx={{ width: "60%" }}
          label="Teléfono"
          value={infoUsuario.Telefono === 0 ? "" : infoUsuario.Telefono}
          inputProps={{ maxLength: 10 }}
          variant="standard"
          onChange={(v) => {
            compruebaTelefono(parseInt(v.target.value));
            if (infoUsuario.Celular > 1)
              setErrores({
                ...errores,
                Telefono: {
                  valid: false,
                  text: "Ingresa Telefono valido",
                },
              });
          }}
        />
        <TextField
          sx={{ width: "30%" }}
          label="Extensión"
          value={infoUsuario.Ext === 0 ? "" : infoUsuario.Ext}
          variant="standard"
          inputProps={{ maxLength: 40 }}
          onChange={(v) => {
            compruebaExt(parseInt(v.target.value));
            if (infoUsuario.Celular > 1)
              setErrores({
                ...errores,
                Ext: {
                  valid: false,
                  text: "Ingresa extencion valido",
                },
              });
          }}
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
          options={roles}
          getOptionLabel={(rol) => rol.Nombre}
          value={infoUsuario.Roles}
          onChange={(event, newValue) => {
            if (newValue != null) {
              setInfoUsuario({ ...infoUsuario, Roles: newValue });
              setErrores({
                ...errores,
                rol: {
                  valid: false,
                  text: "Ingresa extencion valido",
                },
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

      <Grid item xs={10} md={4.5}>
        <Typography variant="body2">Entidad: </Typography>
        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          options={entidades}
          getOptionLabel={(entidad) => entidad.Nombre || "Seleccione entidad"}
          value={infoUsuario.Entidad}
          onChange={(event, v) => {
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                Entidad: { Id: v.Id, Nombre: v.Nombre },
              });
              setErrores({
                ...errores,
                entidades: {
                  valid: false,
                  text: "Ingresa entidad valido",
                },
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
        xs={10}
        md={4.5}
        display={"flex"}
        justifyContent="space-between"
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
        <Grid>
          {/* <Button
            className="cancelar"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ fontFamily: "MontserratRegular", mr: 2 }}
          >
            Cancelar
          </Button> */}
          <Button
            className="aceptar"
            onClick={() => {
              handleStoreBtn();
            }}
            sx={{ fontFamily: "MontserratRegular" }}
          >
            {props.idUsuarioSolicitante
              ? "Solicitar Modificación"
              : "Solicitar Usuario"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
