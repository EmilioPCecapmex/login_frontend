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
import SelectValues from "../../Interfaces/SelectValues";
import { UserServices } from "../../services/UserServices";
import { getCatalogo } from "../../services/catalogosService";
import { IEntidadPadre, IPerfil, IRol, IUResponsable } from "./ICatalogos";

export interface NewDialogProps {
  modoModal: boolean;
  token: string;
  idUsuarioSolicitante: string;
  idApp: string;
  handleDialogClose: Function;
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
  Aplicacion: { value: string; label: string };
  TipoUsuario: { Id: string; Nombre: string };
  Puesto: string;
  CURP: string;
  RFC: string;
  Celular: number;
  Telefono: number;
  Ext: number;
  Perfiles: { Id: string; Descripcion: string }[];
  Roles: { Id: string; Nombre: string }[];
  UnidadResponsable: { Id: string; Descripcion: string };
  Entidad: { value: string; descripcion: string };
  PuedeFirmar: boolean;
}

export const SolicitudUsuario = (props: NewDialogProps) => {
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  //------------------------CATALOGOS-------------------------------------------

  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [perfiles, setPerfiles] = useState<Array<IPerfil>>([]);
  const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);
  const [entidades, setEntidades] = useState<Array<IEntidadPadre>>([]);
  const [apps, setApps] = useState<Array<SelectValues>>([]);

  //elementos seleccionados
  const [infoUsuario, setInfoUsuario] = useState<IInfoUsuario>({
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreUsuario: "",
    CorreoElectronico: "",
    Aplicacion: { value: props.idApp, label: "" },
    TipoUsuario: { Id: "", Nombre: "" },
    Puesto: "",
    CURP: "",
    RFC: "",
    Celular: 0,
    Telefono: 0,
    Ext: 0,
    Perfiles: [],
    Roles: [],
    UnidadResponsable: { Id: "", Descripcion: "" },
    Entidad: { value: "", descripcion: "" },
    PuedeFirmar: false,
  });

  const [errores, setErrores] = useState({});

  function validarCadena(Nombre: string): boolean {
    const patron = /^(?!.*\s{2})[a-zA-ZáÁéÉíÍóÓúÚñÑ0-9\s']*$/;
    return patron.test(Nombre);
  }

  useEffect(() => {
    if (apps.length) {
      let aux = apps.find((app) => app.value === props.idApp);
      if (aux) {
        setInfoUsuario({
          ...infoUsuario,
          Aplicacion: { value: aux?.id!, label: aux?.label! },
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

  const handleStoreBtn = () => {
    // setErrores({
    //   nombre: {
    //     valid: infoUsuario.Nombre === "",
    //     text: "Ingresa infoUsuario.Nombre ",
    //   },
    //   aPaterno: {
    //     valid: infoUsuario.ApellidoPaterno === "",
    //     text: "Ingresa apellido paterno ",
    //   },
    //   aMAterno: {
    //     valid: infoUsuario.ApellidoMaterno === "",
    //     text: "Ingresa apellido materno ",
    //   },
    //   nUsuario: {
    //     valid: infoUsuario.NombreUsuario === "",
    //     text: "Ingresa infoUsuario.Nombre de usuario valido",
    //   },
    //   email: {
    //     valid: !isValidEmail(),
    //     text: "Ingresa infoUsuario.CorreoElectronico electronico valido",
    //   },
    //   CURP: {
    //     valid: infoUsuario.CURP === "",
    //     text: "Ingresa CURP valido",
    //   },
    //   RFC: {
    //     valid: infoUsuario.RFC === "",
    //     text: "Ingresa RFC valido",
    //   },
    //   puesto: {
    //     valid: infoUsuario.Puesto === "",
    //     text: "Ingresa puesto valido",
    //   },
    //   Celular: {
    //     valid: infoUsuario.Celular <= 0,
    //     text: "Ingresa Celular valido",
    //   },
    //   Telefono: {
    //     valid: infoUsuario.Telefono <= 0,
    //     text: "Ingresa Telefono valido",
    //   },
    //   Ext: {
    //     valid: infoUsuario.Ext <= 0,
    //     text: "Ingresa extension valida",
    //   },
    //   tpoUsuario: {
    //     valid: infoUsuario.TipoUsuario.Nombre === "",
    //     text: "Selecciona tipo de usuario",
    //   },
    //   entidad: {
    //     valid: infoUsuario.Entidad.descripcion === "",
    //     text: "Selecciona departamento",
    //   },
    //   perfil: {
    //     valid: infoUsuario.Perfiles.length === 0,
    //     text: "Selecciona perfiles",
    //   },
    //   rol: {
    //     valid: infoUsuario.Roles.length === 0,
    //     text: "Selecciona roles",
    //   },
    //   uResponsable: {
    //     valid: infoUsuario.UnidadResponsable.Id === "",
    //     text: "Selecciona unidad resposnable",
    //   },
    //   aplicacion: {
    //     valid: infoUsuario.Aplicacion.value === "",
    //     text: "Selecciona aplicacion",
    //   },
    // });
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
      infoUsuario.Perfiles.length === 0 ||
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
      const IdPerfiles: any[] = [];
      infoUsuario.Perfiles.forEach(function (item) {
        IdPerfiles.push(item.Id);
      });
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
        TipoSolicitud: "ALTA",
        IdApp: infoUsuario.Aplicacion.value,
        CreadoPor: props.idUsuarioSolicitante
          ? props.idUsuarioSolicitante
          : localStorage.getItem("IdUsuario"),
        IdUResponsable: infoUsuario.UnidadResponsable.Id,
        Perfiles: JSON.stringify({ Perfiles: IdPerfiles }),
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
              props.handleDialogClose(false);
              Swal.fire({
                icon: "success",
                title: "Mensaje",
                text: res.data.data[0][0].Mensaje,
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

  const [usertypes, setUserTypes] = useState<Array<IUserTypes>>([]);

  const getAllUserTypes = () => {
    const data = {
      IdUsuario:
        props.modoModal && props.token && props.idUsuarioSolicitante
          ? props.idUsuarioSolicitante
          : localStorage.getItem("IdUsuario"),
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

  const consulta = (catalogo: string, opcion: string) => {
    UserServices.consultaCatalogos(
      { cat: catalogo, opcion: opcion },
      String(jwt) !== "null"
        ? String(jwt)
        : String(localStorage.getItem("jwtToken"))
    ).then((res) => {
      if (res.status === 200) {
        if (catalogo === "2" && opcion === "select") {
          setApps(res.data.data);
        }
      }
    });
  };

  useEffect(() => {
    getAllUserTypes();
    consulta("2", "select");
    getCatalogo("roles", setRoles, infoUsuario.Aplicacion.value);
    getCatalogo("perfiles", setPerfiles, infoUsuario.Aplicacion.value);
    getCatalogo("entidad-padre", setEntidades, "");
    getCatalogo("uresponsables", setUResponsables, "");

    if (props.idApp !== "") {
      let aux = apps.find((app) => (app.id = props.idApp));
      if (aux) {
        setInfoUsuario({
          ...infoUsuario,
          Aplicacion: { value: aux?.id!, label: aux?.label! },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      justifyContent={"space-evenly"}
      alignContent={"space-around"}
      height={"90%"}
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
            if (infoUsuario.CorreoElectronico.length >= 3)
              setErrores({
                ...errores,
                email: {
                  valid: false,
                  text: "Ingresa Correo Electronico electronico valido",
                },
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
          getOptionLabel={(app) => app.label || "Seleccione aplicacion"}
          value={infoUsuario.Aplicacion}
          onChange={(event, v) => {
            setInfoUsuario({
              ...infoUsuario,
              TipoUsuario: { Nombre: "", Id: "" },
            });
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                Aplicacion: { value: v?.value, label: v?.label! },
              });
              getCatalogo("roles", setRoles, v?.value);
              getCatalogo("perfiles", setPerfiles, v?.value);
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
            option.Descripcion === value.Descripcion || value.Descripcion === ""
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
        <Typography variant="body2"> Perfiles: </Typography>
        <Autocomplete
          multiple
          disabled={perfiles.length === 0}
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          options={perfiles}
          getOptionLabel={(perfil) => perfil.Descripcion}
          value={infoUsuario.Perfiles}
          onChange={(event, newValue) => {
            if (newValue != null) {
              setInfoUsuario({ ...infoUsuario, Perfiles: newValue });
              setErrores({
                ...errores,
                perfil: {
                  valid: false,
                  text: "Selecciona perfil valido",
                },
              });
            }
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Descripcion === value.Descripcion || value.Descripcion === ""
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
        <Typography variant="body2"> Unidad Responsable: </Typography>
        <Autocomplete
          noOptionsText="No se encontraron opciones"
          clearText="Borrar"
          closeText="Cerrar"
          options={uResponsables}
          getOptionLabel={(uresponsable) => uresponsable.Descripcion}
          value={infoUsuario.UnidadResponsable}
          onChange={(event, v) => {
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                UnidadResponsable: { Id: v?.Id!, Descripcion: v?.Descripcion! },
              });
              setErrores({
                ...errores,
                uResponsable: {
                  valid: false,
                  text: "Ingresa unidad responsable valido",
                },
              });
            }
          }}
          renderInput={(params) => (
            <TextField key={params.id} {...params} variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) =>
            option.Descripcion === value.Descripcion || value.Descripcion === ""
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
          getOptionLabel={(entidad) => entidad.descripcion}
          value={infoUsuario.Entidad}
          onChange={(event, v) => {
            if (v != null) {
              setInfoUsuario({
                ...infoUsuario,
                Entidad: { value: v.value, descripcion: v.descripcion },
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
            option.descripcion === value.descripcion || value.descripcion === ""
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
        <Button
          className="aceptar"
          onClick={() => {
            handleStoreBtn();
          }}
          sx={{ fontFamily: "MontserratRegular" }}
        >
          Solicitar Usuario
        </Button>
      </Grid>
    </Grid>
  );
};
