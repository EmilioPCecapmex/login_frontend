import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SelectValues from "../../Interfaces/SelectValues";
import { UserServices, userDetail } from "../../services/UserServices";
import SliderProgress from "../Componentes/SliderProgress";
import { getCatalogo } from "../../services/catalogosService";
import {
  IDepartamento,
  IDependencia,
  IPerfil,
  IRol,
  ISecretaria,
  IUResponsable,
} from "./ICatalogos";

export interface NewDialogProps {
  modoModal: boolean;
  idUsuario: string;
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

interface IError {
  valid: boolean;
  text: string;
}

interface IObjectError {
  nombre: IError;
  aPaterno: IError;
  aMAterno: IError;
  nUsuario: IError;
  email: IError;
  curp: IError;
  rfc: IError;
  puesto: IError;
  celular: IError;
  telefono: IError;
  ext: IError;
  tpoUsuario: IError;
  secretaria: IError;
  dependencia: IError;
  departamento: IError;
  rol: IError;
  uResponsable: IError;
  aplicacion: IError;
}

export const SolicitudModificarUsuario = (props: NewDialogProps) => {
  useEffect(() => {
    userDetail({ IdUsuario: props.idUsuario, IdApp: props.idApp });
  }, []);

  //------------------------CATALOGOS-------------------------------------------
  const [departamentos, setDepartamentos] = useState<Array<IDepartamento>>([]);
  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [dependencias, setDependencias] = useState<Array<IDependencia>>([]);
  const [secretarias, setSecretarias] = useState<Array<ISecretaria>>([]);
  const [uResponsables, setUResponsables] = useState<Array<IUResponsable>>([]);

  const [dependenciasFiltered, setDependenciasFiltered] = useState<
    Array<IDependencia>
  >([]);
  const [secretariasFiltered, setSecretariasFiltered] = useState<
    Array<ISecretaria>
  >([]);

  useEffect(() => {
    setDependenciasFiltered(dependencias);
  }, [dependencias]);
  useEffect(() => {
    setSecretariasFiltered(secretarias);
  }, [secretarias]);
  //elementos seleccionados
  const [departamento, setDepartamento] = useState<IDepartamento>({
    Id: "",
    Descripcion: "",
    NombreCorto: "",
    IdResponsable: "",
    Responsable: "",
    UltimaActualizacion: "",
    FechaCreacion: "",
    ModificadoPor: "",
    Modificador: "",
    CreadoPor: "",
    Creador: "",
    Deleted: "",
  });
  const [dependencia, setDependencia] = useState<IDependencia>({
    Id: "",
    Nombre: "",
    Direccion: "",
    Telefono: "",
    IdTipoDependencia: "",
    TipoDependencia: "",
    IdTitular: "",
    Titular: "",
    IdPerteneceA: "",
    PerteneceA: "",
    Deleted: "",
  });
  const [rol, setRol] = useState<IRol>({
    ControlInterno: "",
    Deleted: "",
    Descripcion: "",
    Id: "",
    Nombre: "",
  });
  const [perfil, setPerfil] = useState<IPerfil>({
    Deleted: "",
    Descripcion: "",
    Id: "",
    Referencia: "",
  });
  const [uResponsable, setUResponsable] = useState<IUResponsable>({
    Clave: "",
    Deleted: "",
    Descripcion: "",
    Id: "",
  });
  const [secretaria, setSecretaria] = useState<ISecretaria>({
    Deleted: "",
    Direccion: "",
    Id: "",
    IdTitular: "",
    Nombre: "",
    Nombre_corto: "",
    PerteneceA: "",
    Titular: "",
  });
  useEffect(() => {
    if (dependencia.Id != "") {
      let aux = secretarias.find((sec) => sec.Id === dependencia.IdPerteneceA);
      if (aux !== undefined) {
        setSecretaria(aux);
      }
    } else {
      setSecretariasFiltered(secretarias);
    }
  }, [dependencia.Id]);

  useEffect(() => {
    if (secretaria.Id !== "") {
      setDependenciasFiltered(
        dependencias.filter((obj) => obj.IdPerteneceA === secretaria.Id)
      );
    } else {
      setSecretariasFiltered(secretarias);
    }
  }, [secretaria]);

  useEffect(() => {
    if (dependenciasFiltered.find((obj) => obj === dependencia) === undefined)
      setDependencia({
        Id: "",
        Nombre: "",
        Direccion: "",
        Telefono: "",
        IdTipoDependencia: "",
        TipoDependencia: "",
        IdTitular: "",
        Titular: "",
        IdPerteneceA: "",
        PerteneceA: "",
        Deleted: "",
      });
  }, [dependenciasFiltered]);

  //------------------------CATALOGOS-------------------------------------------
  //------------------------Errores---------------------------------------------
  const [errores, setErrores] = useState<IObjectError>({
    nombre: {
      valid: false,
      text: "Ingresa nombre ",
    },
    aPaterno: {
      valid: false,
      text: "Ingresa apellido paterno ",
    },
    aMAterno: {
      valid: false,
      text: "Ingresa apellido materno ",
    },
    nUsuario: {
      valid: false,
      text: "Ingresa nombde de usuario ",
    },
    email: {
      valid: false,
      text: "Ingresa correo electronico valido",
    },
    curp: {
      valid: false,
      text: "Ingresa CURP",
    },
    rfc: {
      valid: false,
      text: "Ingresa RFC",
    },
    puesto: {
      valid: false,
      text: "Ingresa puesto",
    },
    celular: {
      valid: false,
      text: "Ingresa celular",
    },
    telefono: {
      valid: false,
      text: "Ingresa telefono",
    },
    ext: {
      valid: false,
      text: "Ingresa extencion",
    },
    tpoUsuario: {
      valid: false,
      text: "Selecciona tipo de usuario",
    },
    secretaria: {
      valid: false,
      text: "Selecciona secretaria",
    },
    dependencia: {
      valid: false,
      text: "Selecciona dependencia",
    },
    departamento: {
      valid: false,
      text: "Selecciona departamento",
    },

    rol: {
      valid: false,
      text: "Selecciona roles",
    },
    uResponsable: {
      valid: false,
      text: "Selecciona unidad resposnable",
    },
    aplicacion: {
      valid: false,
      text: "Selecciona aplicacion",
    },
  });

  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [puesto, setPuesto] = useState("");

  const [celular, setCelular] = useState(0);
  const [telefono, setTelefono] = useState(0);
  const [ext, setExt] = useState(0);
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");
  const [tipousuario, setTipoUsuario] = useState("");
  //-------------------------------validaciones de campos-------------------------------------------------------------
  function validarCadena(nombre: string): boolean {
    // Expresión regular para validar el nombre
    const patron = /^(?!.*\s{2})[a-zA-ZáÁéÉíÍóÓúÚñÑ0-9\s']*$/;

    // Comprobamos si el nombre cumple con el patrón
    return patron.test(nombre);
  }

  //-------------------------------END validaciones de campos----------------------------------------------------------

  const [puedeFirmar, setPuedeFirmar] = useState(false);
  const [apps, setApps] = useState<SelectValues[]>([]);
  const [app, setApp] = useState<SelectValues>({
    value: "",
    label: "",
  });

  useEffect(() => {
    if (apps.length) {
      let aux = apps.find((app) => app.value === props.idApp);
      if (aux) setApp(aux);
    }
  }, [apps]);

  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");

  const compruebaCelular = (value: number) => {
    if (value <= 9999999999) {
      setCelular(value);
      setErrores({
        ...errores,
        celular: {
          valid: false,
          text: "Ingresa celular valido",
        },
      });
    } else if (value.toString() === "NaN") {
      setCelular(0);
    }
  };
  const compruebaTelefono = (value: number) => {
    if (value <= 9999999999) {
      setTelefono(value);
      setErrores({
        ...errores,
        telefono: {
          valid: false,
          text: "Ingresa telefono valido",
        },
      });
    } else if (value.toString() === "NaN") {
      setTelefono(0);
    }
  };

  const compruebaExt = (value: number) => {
    if (value <= 9999) {
      setExt(value);
      setErrores({
        ...errores,
        ext: {
          valid: false,
          text: "Ingresa extencion valida",
        },
      });
    } else if (value.toString() === "NaN") {
      setExt(0);
    }
  };

  const compruebaRfc = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(value)) {
      setRfc(value.toUpperCase());
    }
  };

  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
  }

  const compruebaCurp = (value: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(value)) {
      setCurp(value.toUpperCase());
    }
  };

  const handleStoreBtn = () => {
    setErrores({
      nombre: {
        valid: nombre === "",
        text: "Ingresa nombre ",
      },
      aPaterno: {
        valid: apellidoPaterno === "",
        text: "Ingresa apellido paterno ",
      },
      aMAterno: {
        valid: apellidoMaterno === "",
        text: "Ingresa apellido materno ",
      },
      nUsuario: {
        valid: nombreUsuario === "",
        text: "Ingresa nombre de usuario valido",
      },
      email: {
        valid: !isValidEmail(),
        text: "Ingresa correo electronico valido",
      },
      curp: {
        valid: curp === "",
        text: "Ingresa CURP valido",
      },
      rfc: {
        valid: rfc === "",
        text: "Ingresa RFC valido",
      },
      puesto: {
        valid: puesto === "",
        text: "Ingresa puesto valido",
      },
      celular: {
        valid: celular <= 0,
        text: "Ingresa celular valido",
      },
      telefono: {
        valid: telefono <= 0,
        text: "Ingresa telefono valido",
      },
      ext: {
        valid: ext <= 0,
        text: "Ingresa extencion valida",
      },
      tpoUsuario: {
        valid: tipousuario === "",
        text: "Selecciona tipo de usuario",
      },
      secretaria: {
        valid: secretaria.Id === "",
        text: "Selecciona secretaria",
      },
      dependencia: {
        valid: dependencia.Id === "",
        text: "Selecciona dependencia",
      },
      departamento: {
        valid: departamento.Id === "",
        text: "Selecciona departamento",
      },
      rol: {
        valid: rol.Id === "",
        text: "Selecciona roles",
      },
      uResponsable: {
        valid: uResponsable.Id === "",
        text: "Selecciona unidad resposnable",
      },
      aplicacion: {
        valid: app.value === "",
        text: "Selecciona aplicacion",
      },
    });
    if (
      nombre === "" ||
      apellidoPaterno === "" ||
      apellidoMaterno === "" ||
      nombreUsuario === "" ||
      !isValidEmail() ||
      tipousuario === "" ||
      curp === "" ||
      rfc === "" ||
      puesto === "" ||
      celular <= 0 ||
      telefono <= 0 ||
      ext <= 0 ||
      secretaria.Id === "" ||
      dependencia.Id === "" ||
      departamento.Id === "" ||
      perfil.Id === "" ||
      rol.Id === "" ||
      uResponsable.Id === "" ||
      app.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Aviso",
        text: "Favor de completar todos los campos para continuar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#15212f",
      });
    } else {
      const data = {
        Nombre: nombre,
        APaterno: apellidoPaterno,
        AMaterno: apellidoMaterno,
        NombreUsuario: nombreUsuario,
        Email: correo,
        Curp: curp,
        RFC: rfc,
        Celular: celular,
        Telefono: telefono,
        Extencion: ext,
        TipoSolicitud: "ALTA",
        DatosAdicionales: "",
        IdApp: app.value,
        CreadoPor: props.idUsuarioSolicitante
          ? props.idUsuarioSolicitante
          : localStorage.getItem("IdUsuario"),
        IdUResponsable: uResponsable.Id,
        IdPerfil: perfil.Id,
        IdRol: rol.Id,
        IdDepartamento: departamento.Id,
        IdTipoUsuario: tipousuario,
        PuedeFirmar: puedeFirmar ? 1 : 0,
        Puesto: puesto,
        Dependencia: dependencia.Id,
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
    // setOpenSlider(true);
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
        // setOpenSlider(false)
      }
    });
  };
  useEffect(() => {
    getAllUserTypes();
    consulta("2", "select");
    // getCatalogo("tipodependencias", setTpoDependencia)
    getCatalogo("departamentos", setDepartamentos, "");
    getCatalogo("roles", setRoles, "");
    getCatalogo("dependencias", setDependencias, "");
    getCatalogo("secretarias", setSecretarias, "");
    getCatalogo("uresponsables", setUResponsables, "");

    if (props.idApp !== "") {
      let aux = apps.find((app) => (app.id = props.idApp));
      if (aux) setApp(aux);
    }
  }, []);

  return (
    <div
      className="ContainerSolicitudesUsuario"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <SliderProgress open={false} texto={""} />

      <Paper
        sx={{
          height: "90vh",
          width: "80vw",
          mt: "2vh",
          bgcolor: "#fefdfc",
          overflow: "auto",
          
        }}
      >
        <Grid
          container
          height={"100%"}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-evenly"}
         
        >
          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="nombre"
              label="Nombre(s)"
              type="text"
              fullWidth
              variant="standard"
              value={nombre}
              required
              inputProps={{ maxLength: 20 }}
              error={errores.nombre.valid}
              helperText={errores.nombre.valid ? errores.nombre.text : ""}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  setNombre(v.target.value);
                  if (nombre.length >= 3)
                    setErrores({
                      ...errores,
                      nombre: {
                        valid: false,
                        text: "Ingresa Nombre(s)",
                      },
                    });
                }
              }}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="apellidoPaterno"
              label="Apellido Paterno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoPaterno}
              required
              inputProps={{ maxLength: 20 }}
              error={errores.aPaterno.valid}
              helperText={errores.aPaterno.valid ? errores.aPaterno.text : ""}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  setApellidoPaterno(v.target.value);
                  if (apellidoPaterno.length >= 3)
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

          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="apellidoMaterno"
              label="Apellido Materno"
              type="text"
              fullWidth
              variant="standard"
              value={apellidoMaterno}
              required
              inputProps={{ maxLength: 20 }}
              error={errores.aMAterno.valid}
              helperText={errores.aMAterno.valid ? errores.aMAterno.text : ""}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  setApellidoMaterno(v.target.value);
                  if (apellidoMaterno.length >= 3)
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
          <Grid item xs={10} height={"10%"} md={4.5}>
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
              error={errores.nUsuario.valid}
              helperText={errores.nUsuario.valid ? errores.nUsuario.text : ""}
              inputProps={{ minLength: 4, maxLength: 30 }} //validacion de longuitud  de texto
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  setNombreUsuario(v.target.value.trim());
                  if (nombreUsuario.length >= 3)
                    setErrores({
                      ...errores,
                      nUsuario: {
                        valid: false,
                        text: "Ingresa nombre de usuario valido",
                      },
                    });
                }
              }}
            />
          </Grid>

          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="correo"
              label="Correo Electrónico"
              type="text"
              fullWidth
              variant="standard"
              value={correo}
              required
              inputProps={{ maxLength: 100 }}
              onChange={(v) => {
                setCorreo(v.target.value);
                if (correo.length >= 3 && !errores.email.valid)
                  setErrores({
                    ...errores,
                    email: {
                      valid: false,
                      text: "Ingresa correo electronico valido",
                    },
                  });
              }}
              error={errores.email.valid}
              helperText={errores.email.valid ? errores.email.text : ""}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <FormControl required variant="standard" fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Tipo de Usuario
              </InputLabel>
              <Select
                onChange={(v) => {
                  setTipoUsuario(v.target.value);
                  if (apellidoPaterno !== "")
                    setErrores({
                      ...errores,
                      tpoUsuario: {
                        valid: false,
                        text: "Selecciona tipo de usuario",
                      },
                    });
                }}
                id="tipousuario"
                value={tipousuario}
                sx={{ display: "flex", pt: 1 }}
                error={errores.tpoUsuario.valid}
              >
                {usertypes?.map((types) => (
                  <MenuItem key={types.Id} value={types.Id}>
                    {types.Descripcion}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {errores.tpoUsuario.valid ? errores.tpoUsuario.text : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="curp"
              label="CURP"
              type="text"
              fullWidth
              variant="standard"
              value={curp}
              required
              error={errores.curp.valid}
              helperText={errores.curp.valid ? errores.curp.text : ""}
              inputProps={{ maxLength: 18, minLength: 18 }}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  compruebaCurp(v.target.value);
                  if (curp.length >= 3)
                    setErrores({
                      ...errores,
                      curp: {
                        valid: false,
                        text: "Ingresa CURP valido",
                      },
                    });
                }
              }}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="rfc"
              label="RFC"
              type="text"
              fullWidth
              variant="standard"
              value={rfc}
              required
              error={errores.rfc.valid}
              helperText={errores.rfc.valid ? errores.rfc.text : ""}
              inputProps={{ maxLength: 13, minLength: 12 }}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  compruebaRfc(v.target.value);
                  if (rfc.length >= 12)
                    setErrores({
                      ...errores,
                      rfc: {
                        valid: false,
                        text: "Ingresa RFC valido",
                      },
                    });
                }
              }}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              margin="dense"
              id="puesto"
              label="Puesto"
              type="text"
              fullWidth
              variant="standard"
              value={puesto}
              required
              inputProps={{ maxLength: 255 }}
              error={errores.puesto.valid}
              helperText={errores.puesto.valid ? errores.puesto.text : ""}
              onChange={(v) => {
                if (validarCadena(v.target.value)) {
                  setPuesto(v.target.value);
                  if (puesto.length >= 3)
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
          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              fullWidth
              sx={{ mr: 4 }}
              margin="dense"
              id="celular"
              label="Celular"
              value={celular === 0 ? "" : celular}
              required
              inputProps={{ maxLength: 10 }}
              variant="standard"
              error={errores.celular.valid}
              helperText={errores.celular.valid ? errores.celular.text : ""}
              onChange={(v) => {
                compruebaCelular(parseInt(v.target.value));
                if (celular > 1)
                  setErrores({
                    ...errores,
                    celular: {
                      valid: false,
                      text: "Ingresa celular valido",
                    },
                  });
              }}
            />
          </Grid>

          <Grid item xs={10} height={"10%"} md={4.5}>
            <TextField
              fullWidth
              sx={{ mr: 6 }}
              margin="dense"
              id="telefono"
              label="Telefono"
              value={telefono === 0 ? "" : telefono}
              required
              inputProps={{ maxLength: 10 }}
              variant="standard"
              error={errores.telefono.valid}
              helperText={errores.telefono.valid ? errores.telefono.text : ""}
              onChange={(v) => {
                compruebaTelefono(parseInt(v.target.value));
                if (celular > 1)
                  setErrores({
                    ...errores,
                    telefono: {
                      valid: false,
                      text: "Ingresa telefono valido",
                    },
                  });
              }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            height={"10%"}
            md={4.5}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: "50%" }}
              margin="dense"
              id="ext"
              label="Ext"
              value={ext === 0 ? "" : ext}
              variant="standard"
              error={errores.ext.valid}
              inputProps={{ maxLength: 40 }}
              helperText={errores.ext.valid ? errores.ext.text : ""}
              onChange={(v) => {
                compruebaExt(parseInt(v.target.value));
                if (celular > 1)
                  setErrores({
                    ...errores,
                    ext: {
                      valid: false,
                      text: "Ingresa extencion valido",
                    },
                  });
              }}
            />

            <FormGroup sx={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={puedeFirmar}
                    onChange={(v) => setPuedeFirmar(v.target.checked)}
                  />
                }
                label={puedeFirmar ? "Puede firmar" : "No puede firmar"}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={10} height={"10%"} md={4.5}>
            <Typography variant="body2"> Secretarias: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              options={secretariasFiltered}
              getOptionLabel={(secretaria) =>
                secretaria.Nombre || "Seleccione secretaria"
              }
              value={secretaria}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setSecretaria(newValue);
                  setErrores({
                    ...errores,
                    secretaria: {
                      valid: false,
                      text: "Ingresa secretaria valida",
                    },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.secretaria.valid}
                />
              )}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            {/* <Typography variant="body2"> Dependencias: </Typography> */}
            {/* <SelectFragLogin
                        value={idDepartamento}
                        options={departamentos}
                        onInputChange={handleFilterChangeDepartamento}
                        placeholder={"Seleccione Departamento"}
                        label={idLabelDepartamentoNoAdmin ? idLabelDepartamentoNoAdmin : ""}
                        disabled={false}

                    /> */}
            <Typography variant="body2"> Dependencias: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              options={dependenciasFiltered}
              getOptionLabel={(option) =>
                option.Nombre || "Seleccione dependencia"
              }
              value={dependencia}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setDependencia(newValue);
                  setErrores({
                    ...errores,
                    dependencia: {
                      valid: false,
                      text: "Ingresa dependencia valida",
                    },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.dependencia.valid}
                />
              )}
            />
          </Grid>

          <Grid item xs={10} height={"10%"} md={4.5}>
            <Typography variant="body2"> Departamentos: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              options={departamentos}
              getOptionLabel={(departamento) =>
                departamento.Descripcion || "Seleccione departamento"
              }
              value={departamento}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setDepartamento(newValue);
                  setErrores({
                    ...errores,
                    departamento: {
                      valid: false,
                      text: "Ingresa departamento valido",
                    },
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.departamento.valid}
                />
              )}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}></Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <Typography variant="body2"> Roles: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              options={roles}
              getOptionLabel={(rol) => rol.Nombre || "Seleccione rol"}
              value={rol}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setRol(newValue);
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
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.rol.valid}
                />
              )}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <Typography variant="body2"> Unidad Responsable: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              options={uResponsables}
              getOptionLabel={(uresponsable) =>
                uresponsable.Descripcion || "Seleccione unidad  responsable"
              }
              value={uResponsable}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setUResponsable(newValue);
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
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.uResponsable.valid}
                />
              )}
            />
          </Grid>
          <Grid item xs={10} height={"10%"} md={4.5}>
            <Typography variant="body2"> Aplicaciones: </Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              disabled={props.idApp !== ""}
              options={apps}
              getOptionLabel={(app) => app.label || "Seleccione aplicacion"}
              value={app}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setApp(newValue);
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
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"
                  error={errores.aplicacion.valid}
                />
              )}
            />
          </Grid>
          {/* //Buttons */}

          <Grid
            item
            xs={10}
            height={"10%"}
            md={4.5}
            display={"flex"}
            justifyContent="flex-end"
            alignItems={"center"}
          >
            <Button
              className="aceptar"
              onClick={() => {
                handleStoreBtn();
              }}
              sx={{ fontFamily: "MontserratRegular", maxHeight: "50%" }}
            >
              Solicitar Usuario
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
