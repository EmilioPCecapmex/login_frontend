/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  IconButton,
  Button,
  Typography,
  TextField,
  List,
  ListItemButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Grid,
  Hidden,
} from "@mui/material";
import Swal from "sweetalert2";
import { Header } from "../../components/header";
import { IDetalleSolicitud, ISolicitud } from "./ISolicitud";
import { IApps } from "./IApps";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { CommentsDialog } from "../../components/commentsDialog";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { imprimirSolicitud } from "../Users/Users";
import { TimerCounter } from "../../components/timer/timer";
import { COLOR } from "../styles/colors";
import VerSolicitudesModal from "./VerSolicitudesModal";
import CloseIcon from '@mui/icons-material/Close';
export const Solicitudes = () => {

  const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([]);

  const [solicitudesFiltered, setSolicitudesFiltered] =
    useState<Array<ISolicitud>>(solicitudes);

  const [detalleSolicitud, setDetalleSolicitud] = useState<
    Array<IDetalleSolicitud>
  >([{
    ApellidoMaterno: "",
  ApellidoPaterno: "",
  Celular: "",
  CorreoElectronico: "",
  CreadoPor: "",
  Curp: "",
  DatosAdicionales: "",
  Departamento: "",
  Dependencia: "",
  Estatus: 0,
  Ext: "",
  FechaDeCreacion: "",
  Id: "",
  IdDepartamento: "",
  IdDependencia: "",
  IdPerfil: "",
  IdRol: "",
  IdTipoUsuario: "",
  IdUResponsable: "",
  Mensaje: "",
  Nombre: "",
  NombreApp: "",
  NombreSolicitante: "",
  NombreUsuario: "",
  Perfil: "",
  PuedeFirmar: 0,
  Puesto: "",
  Respuesta: "",
  Rfc: "",
  Rol: "",
  Telefono: "",
  TpoUsuario: "",
  UResponsable: "",
  Secretaria:""
  }]);

  const [detalleUsuario, setDetalleUsuario] = useState
    ({
      Id: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: "",
      CorreoElectronico: "",
      Puesto: "",
      Curp: "",
      Rfc: "",
      Telefono: "",
      Ext: "",
      Celular: "",
      IdTipoUsuario: "",
    });

  const [onChangeInfo, setOnChangeInfo] = useState
    ({
      Nombre: false,
      ApellidoPaterno: false,
      ApellidoMaterno: false,
      NombreUsuario: false,
      CorreoElectronico: false,
      Puesto: false,
      Curp: false,
      Rfc: false,
      Telefono: false,
      Ext: false,
      Celular: false,
    });


  const [apps, setApps] = useState<Array<IApps>>([]);
  const [idApp, setIdApp] = useState("");


  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");

  const [openComments, setOpenComments] = useState(false);

  const handleCloseComments = () => {
    setOpenComments(false);
  };

  const filtroXApp = (x: string) => {
    if (x === "") {
      setSolicitudesFiltered(solicitudes)
    } else {
      setSolicitudesFiltered(solicitudes.filter((item) => item.IdApp === x))
    }
  }

  const getApps = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/apps", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setApps(r.data.data);
        }
      });
  };

  const createComentarios = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/create-comentario",
        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdSolicitud: detalleSolicitud[0].Id,
          Comentario: comentario
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 201) {


          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });

        }
      })
      .catch((r) => {
        if (r.response.status === 409) {

        }
      });
  }

  const modificarSolicitud = (estado: string, tipoSoli: string) => {

    // process.env.REACT_APP_APPLICATION_DEV + 
    axios
      .put(process.env.REACT_APP_APPLICATION_DEV + "/api/solicitud-transaction", {

        IdUsuario: localStorage.getItem("IdUsuario"),
        IdSolicitud: detalleSolicitud[0].Id,
        Estado: estado,
        TipoSoli: tipoSoli,
        AdminPlataforma: adminPlataforma ? 1 : 0,
        PermisoFirma: puedeFirmar ? 1 : 0,

      },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        })
      .then((r) => {
        if (r.status === 200) {
          if (selectedIndex - 1 >= 0) {
            setSolicitudSeleccionada(solicitudesFiltered[selectedIndex - 1].Id)
            setSelectedIndex(selectedIndex - 1);
          }
          else
            setSelectedIndex(-1);
          filtroXApp(idApp);
          getSolicitudes();

          if ((estado === "2" || estado === "3") && comentario !== "") {
            createComentarios()
          }
        }
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  })

  const getSolicitudes = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/solicitudes", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setSolicitudes(r.data.data);
          setSolicitudesFiltered(r.data.data)
          setTimeout(() => {
            getSolicitudes();
          }, 60000);
        }
      });
  };

  const getDetalleSolicitud = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/detalleSol", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdSolicitud: solicitudSeleccionada,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setDetalleSolicitud(r.data.data);
        }
      });
  };

  const getDetalleUsuario = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/user-detail",
        {
          IdUsuario: detalleSolicitud[0].CorreoElectronico,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {


        if (r.status === 200) {
          setDetalleUsuario(r.data.data)

        }
      })
      .catch((r) => {
        if (r.response.status === 409) {

          Toast.fire({
            icon: "error",
            title: "Busqueda Fallida!",
          });
        }
      });
  }

  const [IdSolicitud, setIdSolicitud] = useState("");

  const getDatosDocumento = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/docSolicitudActualUsuario", {
        params: {
          IdSolicitud: IdSolicitud
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          imprimirSolicitud(r.data.result[0][0]);
        } else {
          Toast.fire({
            icon: "error",
            title: "Error al imprimir la solicitud!",
          });
        }
      });
  }

  useEffect(() => {
    getApps();
    getSolicitudes();
  }, []);

  //registro seleccionado
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //filtrado port aplicacion
  const [appSelectedIndex, setAppSelectedIndex] = useState("");

  const [adminPlataforma, setAdminPlataforma] = useState(false);
  const [puedeFirmar, setPuedeFirmar] = useState(false);

  useEffect(() => {
    setPuedeFirmar(detalleSolicitud[0].PuedeFirmar===1)
  }, [detalleSolicitud])
  
  const [comentCount, setComentCount] = useState(0);
  /////////////////////// modal de Ver Solicitudes
  const [openVerSolicitudesModal, setOpenVerSolicitudesModal] = useState(false);


  ///////////////////
  const getComentarios = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/comentarios-solicitudes",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        IdSolicitud: solicitudSeleccionada,
      },
    })
      .then(function (response) {
        setComentCount(response.data.data.length);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.msg,
        });
      });
  };


  const itemSelected = (x: number, id: string) => {
    setSelectedIndex(x);
    setSolicitudSeleccionada(id);
  };

  const flowSolicitudes = (x: number) => {
    setSolicitudSeleccionada(solicitudes[x].Id);
  };

  //cuando se seleciona un filtro, se establece en el primer registro
  useEffect(() => {
    setSelectedIndex(-1);
  }, [appSelectedIndex]);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (detalleUsuario.CorreoElectronico != "") {
      let auxiliar = onChangeInfo;

      (detalleSolicitud[0].Nombre === detalleUsuario.Nombre) ?
        auxiliar.Nombre = false : auxiliar.Nombre = true;

      (detalleSolicitud[0].ApellidoPaterno === detalleUsuario.ApellidoPaterno) ?
        auxiliar.ApellidoPaterno = false : auxiliar.ApellidoPaterno = true;

      (detalleSolicitud[0].ApellidoMaterno === detalleUsuario.ApellidoMaterno) ?
        auxiliar.ApellidoMaterno = false : auxiliar.ApellidoMaterno = true;

      (detalleSolicitud[0]?.NombreUsuario === detalleUsuario?.NombreUsuario) ?
        auxiliar.NombreUsuario = false : auxiliar.NombreUsuario = true;

      (detalleSolicitud[0].CorreoElectronico === detalleUsuario.CorreoElectronico) ?
        auxiliar.CorreoElectronico = false : auxiliar.CorreoElectronico = true;

      (detalleSolicitud[0].Puesto === detalleUsuario.Puesto) ?
        auxiliar.Puesto = false : auxiliar.Puesto = true;

      (detalleSolicitud[0].Celular === detalleUsuario.Celular) ?
        auxiliar.Celular = false : auxiliar.Celular = true;

      (detalleSolicitud[0].Curp === detalleUsuario.Curp) ?
        auxiliar.Curp = false : auxiliar.Curp = true;

      (detalleSolicitud[0].Rfc === detalleUsuario.Rfc) ?
        auxiliar.Rfc = false : auxiliar.Rfc = true;

      (detalleSolicitud[0].Telefono === detalleUsuario.Telefono) ?
        auxiliar.Telefono = false : auxiliar.Telefono = true;

      (detalleSolicitud[0].Ext === detalleUsuario.Ext) ?
        auxiliar.Ext = false : auxiliar.Ext = true;

      setOnChangeInfo({ ...auxiliar })
    }
    setPuedeFirmar(false);
    setAdminPlataforma(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalleUsuario])

  const checkCambios = () => {
    if (solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() === "MODIFICACION")
      getDetalleUsuario();
    else {

      setOnChangeInfo({
        Nombre: false,
        ApellidoPaterno: false,
        ApellidoMaterno: false,
        NombreUsuario: false,
        Puesto: false,
        CorreoElectronico: false,
        Curp: false,
        Rfc: false,
        Telefono: false,
        Ext: false,
        Celular: false,
      });

    }
  }


  useEffect(() => {

    if (selectedIndex >= 0) {
      setSolicitudSeleccionada(solicitudesFiltered[selectedIndex].Id)
      getDetalleSolicitud();
      getComentarios();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);
  useEffect(() => {
    if (detalleSolicitud[0]?.NombreUsuario)
      checkCambios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalleSolicitud[0]]);

  const [openDialogImpDoc, setOpenDialogImpDoc] = useState(false);
  const [openDialogModificar, setOpenDialogModificar] = useState(false);
  const [openDialogRechazar, setOpenDialogRechazar] = useState(false);
  const [openDialogAceptar, setOpenDialogAceptar] = useState(false);

  const handleCloseOpenDialogImpDoc = () => {
    setOpenDialogImpDoc(false);
  };

  const handleCloseOpenDialogModificar = () => {
    setOpenDialogModificar(false);
  };

  const handleCloseOpenDialogRechazar = () => {
    setOpenDialogRechazar(false);
  };

  const handleCloseOpenDialogAceptar = () => {
    setOpenDialogAceptar(false);
  };

  const [comentario, setComentario] = useState("");

  return (
    <>
      <Header />
      <TimerCounter />

      <CommentsDialog open={openComments} close={handleCloseComments} solicitud={solicitudSeleccionada} />

      <Grid container justifyContent="center"  >
        <Grid item xs={12}
          sx={{
            height: "100%",
            width: "95%",
            borderRadius: 5,
          }}>

          <Grid container >
            {/* Lateral  filtro y lista de informacion*/}


            <Hidden >
              <Grid item xs={12} md={4}
                sx={{ height: "80vh" }}
                paddingLeft={.4}
              >

                <div className="div-Solicitudes" >

                  <Grid container justifyContent="center" paddingBottom={2} paddingTop={1.5}>
                    <FormControl
                      sx={{ width: "98%", bgcolor: "#fff", borderRadius: ".4vw", boxShadow: "15" }}
                    >
                      <InputLabel><Typography sx={{ fontFamily: 'MontserratBold' }}>
                        Filtro por aplicación
                      </Typography></InputLabel>
                      <Select value={appSelectedIndex} label="Filtar---por---aplicacion" onChange={(c) => { filtroXApp(c.target.value); setIdApp(c.target.value); }}>
                        <MenuItem value={""} onClick={() => setAppSelectedIndex("")}>
                          TODAS LAS APPS
                        </MenuItem>
                        {apps.map((item, x) => {
                          return (
                            <MenuItem
                              key={x}
                              value={item.Id}
                              onClick={() => {
                                setAppSelectedIndex(item.Id);
                              }}
                            >
                              {item.Nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                  </Grid>

                  <Grid
                    sx={{
                      width: "98%",
                      height: "99%",
                      alignItems: "center",
                      pb: 2,
                      bgcolor: "#fff",
                      boxShadow: "15",
                      pt: 2,
                      borderRight: "solid 1px",
                      overflow: "scroll ",
                      borderRadius: "15px",
                      borderColor: "#fff",
                      "&::-webkit-scrollbar": {
                        width: ".3vw",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,.5)",
                        outline: "1px solid slategrey",
                        borderRadius: 10,
                      },
                    }}
                  >
                    <List
                      component="nav"
                      aria-label="main mailbox folders"
                    >
                      <Divider />
                      {solicitudesFiltered?.map((item, x) => {
                        if (!((solicitudesFiltered[x]?.tipoSoli.toUpperCase() === "ALTA" && solicitudesFiltered[x].Estatus === 3) || (solicitudesFiltered[x].tipoSoli?.toUpperCase() === "MODIFICACION" && solicitudesFiltered[x].Estatus === 3))) {
                          return (
                            <Grid key={x} >
                              <ListItemButton
                                key={x}
                                onClick={() => {
                                  itemSelected(x, item.Id);
                                  setOpenVerSolicitudesModal(true);
                                }}
                                sx={{

                                  pl: 2,
                                  "&.Mui-selected ": {
                                    backgroundColor: "#c4a57b",
                                  },
                                  "&.Mui-selected:hover": {
                                    backgroundColor: "#cbcbcb",
                                  },
                                }}
                                selected={selectedIndex === x ? true : false}
                              >
                                <Grid
                                  container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                >

                                  <Grid item container xs={12} >
                                    <Grid item xs={12} md={6}>
                                      <Typography className="h6" color="text.primary">
                                        {"NOMBRE: "}
                                        <label className="textoNormal">
                                          {item.NombreUsuario.toUpperCase()}
                                        </label>
                                      </Typography>

                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                      <Typography className="h6" color="text.primary" >
                                        {"FECHA: "}
                                        <label className="textoNormal">
                                          {moment(item.FechaDeCreacion, moment.ISO_8601).format("DD/MM/YYYY HH:mm:SS").toString()}
                                        </label>
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container item xs={12} md={6}>
                                    <Typography className="h6" color="text.primary" >
                                      {"APLICACIÓN: "}
                                      <label className="textoNormal">
                                        {item.AppNombre.toUpperCase()}
                                      </label>
                                    </Typography>
                                  </Grid>


                                  <Grid container item xs={12} md={6}>
                                    <Typography className="h6" color="text.primary" >
                                      {"SOLICITANTE: "}
                                      <label className="textoNormal">
                                        {item.NombreSolicitante.toUpperCase()}
                                      </label>
                                    </Typography>
                                  </Grid>

                                  <Grid container item xs={12} md={6}>
                                    <Typography className="h6" color="text.primary" >
                                      {"TIPO DE SOLICITUD: "}
                                      <label className="textoNormal">
                                        {item?.tipoSoli.toUpperCase()}
                                      </label>
                                    </Typography>
                                  </Grid>
                                </Grid>

                              </ListItemButton>
                              <Divider />
                            </Grid>
                          );
                        }

                      })}
                    </List>
                  </Grid>
                </div>
              </Grid>

            </Hidden>

            <Hidden mdUp >
              <Dialog fullScreen open={openVerSolicitudesModal}>

                <Grid container item xs={12} md={12} paddingBottom={2} alignItems="center" >
                  <div className="div-VerSolicitudes" >
                    <Grid item container direction="column" justifyContent="center" alignItems="center" >
                      {solicitudes.length !== 0 ? (
                        <Grid paddingLeft={2} container direction="column"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            width: "100%",
                            height: "95%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            border: "1px solid #b3afaf",
                            borderRadius: "15px",
                            boxShadow: "15",
                            bgcolor: COLOR.blanco
                          }}
                        >

                          <Grid item container     justifyContent="flex-end" >

                            <Hidden smUp>
                              <Grid item container xs={10} justifyContent="center" >
                                <IconButton
                                  onClick={() => {
                                    let a = selectedIndex;
                                    a--;
                                    if (a >= 0) {
                                      setSelectedIndex(a);
                                      flowSolicitudes(a);
                                    }
                                  }}
                                  
                                >
                                   Ant.  <SkipPreviousIcon fontSize="large" />
                               

                                </IconButton>
                                <IconButton
                                  onClick={() => {
                                    let a = selectedIndex;
                                    a = a + 1;
                                    if (a < solicitudes.length) {
                                      setSelectedIndex(a);
                                      flowSolicitudes(a);
                                    }
                                  }}
                                >
                                  <SkipNextIcon fontSize="large" /> Sig.
                                </IconButton>
                              </Grid>

                            </Hidden>

                            <Grid item container  justifyContent="flex-end"  xs={2}><Button
                             className="cancelar" variant="contained" color="error" onClick={() => { setOpenVerSolicitudesModal(false); }}>
                              <CloseIcon />
                            </Button>
                            </Grid>

                          </Grid>
                          {selectedIndex < 0 ?
                            (
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <InfoTwoToneIcon    color="primary"
                                sx={{ width: "50%", height: "50%", opacity: "20%" }}
                                />
                                <Typography color="primary"  sx={{ fontFamily: "MontserratSemiBold" }}>
                                  Sin información
                                </Typography>
                                <Typography color="primary" sx={{ fontFamily: "MontserratSemiBold" }}>
                                  Seleccione un registro para visualizar la información
                                </Typography>
                              </Box>
                            ) :
                            (solicitudesFiltered[selectedIndex]?.NombreUsuario === (detalleSolicitud[0].Nombre + " " + detalleSolicitud[0].ApellidoPaterno)) ?

                              <Grid container rowSpacing={2} justifyContent="space-between">

                                <VerSolicitudesModal
                                  detalleSolicitud={detalleSolicitud}
                                  comentCount={comentCount}
                                  onChangeInfo={onChangeInfo}
                                  detalleUsuario={detalleUsuario}
                                  solicitudSeleccionada={solicitudSeleccionada} />

                                <Grid item container xs={12} direction="row"
                                  justifyContent="space-evenly"
                                  alignItems="flex-end"   >


                                  {/* {solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() === "ALTA" || solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() === "MODIFICACION" ?
                                    <> */}
                                  {/* <Grid item container xs={6} sm={4} md={3} justifyContent="center"> */}

                                    <FormControlLabel control={<Checkbox
                                      disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}

                                      checked={puedeFirmar} onChange={() => { setPuedeFirmar(!puedeFirmar) }} />} label="Permiso para firmar" />
                                  {/* </Grid> */}
                                  {/* <Grid item container xs={6} sm={4} md={3} justifyContent="center">

                                    <FormControlLabel control={<Checkbox
                                      disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}

                                      checked={adminPlataforma} onChange={() => { setAdminPlataforma(!adminPlataforma) }} />} label="Admin. de plataforma" />
                                  </Grid> */}


                                  {/* <Grid item container xs={12} sm={4} md={3} justifyContent="center">
                                    <Button
                                      disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}

                                      className="aceptar" color="primary" variant="contained" onClick={() => { setOpenDialogModificar(true); }}>Solicitar modificar</Button>
                                  </Grid> */}
                                  {/* </>
                                    :
                                    null} */}

                                  <Grid item container
                                    paddingTop={1}
                                    paddingBottom={2}
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center">

                                    <Grid item xs={3}>

                                      <Button fullWidth className="aceptar" variant="contained" color="primary" onClick={() => { setOpenDialogAceptar(true); }}>Aceptar</Button>
                                    </Grid>
                                    <Grid item xs={3}>

                                      <Button fullWidth className="cancelar" variant="contained" color="error" onClick={() => { setOpenDialogRechazar(true); }}>Rechazar</Button>

                                    </Grid>

                                    <Hidden smDown>
                                      <Grid item container xs={12} justifyContent="center" >
                                        <IconButton
                                          onClick={() => {
                                            let a = selectedIndex;
                                            a--;
                                            if (a >= 0) {
                                              setSelectedIndex(a);
                                              flowSolicitudes(a);
                                            }
                                          }}
                                        >
                                          <SkipPreviousIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            let a = selectedIndex;
                                            a = a + 1;
                                            if (a < solicitudes.length) {
                                              setSelectedIndex(a);
                                              flowSolicitudes(a);
                                            }
                                          }}
                                        >
                                          <SkipNextIcon fontSize="large" />
                                        </IconButton>
                                      </Grid>
                                    </Hidden>
                                  </Grid>
                                </Grid>
                              </Grid>

                              : <CircularProgress />
                          }
                        </Grid>

                      ) : (
                        <Box
                          sx={{
                            // width: "70%",
                            // height: "100%",
                            bgcolor: "#ECE8DA",
                            borderRadius: "15px",
                            opacity: "80%",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            flexDirection: "column",
                            boxShadow: "15",

                          }}
                        >
                          <Box
                            sx={{
                              // width: "100%",
                              // height: "80%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",

                            }}
                          >
                            <InfoTwoToneIcon
                  color="primary"
                              sx={{ width: "100%", height: "80%", opacity: "20%" }}
                            />
                            <Typography color="primary" fontFamily="MontserratBold">
                              Sin información
                            </Typography>
                            <Typography color="primary" fontFamily="MontserratBold">
                              Seleccione un registro para visualizar la información
                            </Typography>
                          </Box>
                        </Box>

                      )}
                    </Grid>
                  </div>
                </Grid>
                </Dialog>

            </Hidden>

            <Hidden mdDown >
              <Grid container item xs={12} md={8} paddingBottom={2} justifyContent="center" alignItems="center" >
                <div className="div-VerSolicitudes" >
                  <Grid item container direction="column" justifyContent="center" alignItems="center" >
                    {solicitudes.length !== 0 ? (
                      <Grid paddingLeft={2} container direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          width: "98%",
                          height: "95%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          border: "1px solid #b3afaf",
                          borderRadius: "15px",
                          boxShadow: "15",
                          bgcolor: COLOR.blanco
                        }}
                      >
                        {selectedIndex < 0 ?
                          (
                            <Box
                              sx={{
                                width: "100%",
                                height: "80%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <InfoTwoToneIcon
                            color="primary"
                                sx={{ width: "50%", height: "50%", opacity: "20%" }}
                              />
                              <Typography color="primary" sx={{ fontFamily: "MontserratSemiBold" }}>
                                Sin información
                              </Typography>
                              <Typography color="primary" sx={{ fontFamily: "MontserratSemiBold" }}>
                                Seleccione un registro para visualizar la información
                              </Typography>
                            </Box>
                          ) :
                          (solicitudesFiltered[selectedIndex]?.NombreUsuario === (detalleSolicitud[0].Nombre + " " + detalleSolicitud[0].ApellidoPaterno)) ?

                            <Grid container paddingLeft={3} paddingTop={3} paddingRight={3} rowSpacing={3} justifyContent="space-between">

                              <VerSolicitudesModal
                                detalleSolicitud={detalleSolicitud}
                                comentCount={comentCount}
                                onChangeInfo={onChangeInfo}
                                detalleUsuario={detalleUsuario}
                                solicitudSeleccionada={solicitudSeleccionada} />

                              <Grid item container xs={12} direction="row"
                                justifyContent="space-evenly"
                                alignItems="flex-end"   >

                                <Grid item container xs={6} md={3} justifyContent="center">

                                  <FormControlLabel control={<Checkbox
                                    disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}

                                    checked={puedeFirmar} onChange={() => { setPuedeFirmar(!puedeFirmar) }} />} label="Permiso para firmar" />
                                </Grid>
                                {/* <Grid item container xs={6} md={3} justifyContent="center">

                                  <FormControlLabel control={<Checkbox
                                    disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}
                                    checked={adminPlataforma} onChange={() => { setAdminPlataforma(!adminPlataforma) }} />} label="Admin. de plataforma" />
                                </Grid> */}


                                {/* <Grid item container xs={12} md={4} justifyContent="center">
                                  <Button
                                    disabled={solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "ALTA" && solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() !== "MODIFICACION"}
                                    className="aceptar" variant="contained"  onClick={() => { setOpenDialogModificar(true); }}>Solicitar modificar</Button>
                                </Grid> */}
                                {/* </>
                                  :
                                  null} */}

                                <Grid item container
                                  direction="row"
                                  justifyContent="space-evenly"
                                  alignItems="center">
                                  <Grid container item xs={12} paddingTop={2} justifyContent="space-evenly">
                                    <Grid item xs={2}>

                                      <Button className="aceptar" fullWidth variant="contained" onClick={() => { setOpenDialogAceptar(true); }}>Aceptar</Button>
                                    </Grid>
                                    <Grid item xs={2}>

                                      <Button className="Solicitudes-cancelar-usuario" fullWidth variant="contained" onClick={() => { setOpenDialogRechazar(true); }}>Rechazar</Button>

                                    </Grid>
                                  </Grid>
                                  <Grid item container xs={12} paddingTop={2} justifyContent="center">

                                    <IconButton
                                      onClick={() => {
                                        let a = selectedIndex;
                                        a--;
                                        if (a >= 0) {
                                          setSelectedIndex(a);
                                          flowSolicitudes(a);
                                        }
                                      }}
                                    >
                                      <SkipPreviousIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        let a = selectedIndex;
                                        a = a + 1;
                                        if (a < solicitudes.length) {
                                          setSelectedIndex(a);
                                          flowSolicitudes(a);
                                        }
                                      }}
                                    >
                                      <SkipNextIcon fontSize="large" />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>

                            </Grid>
                            : <CircularProgress />
                        }
                      </Grid>

                    ) : (
                      <Box
                        sx={{
                          // width: "70%",
                          // height: "100%",
                          bgcolor: "#ECE8DA",
                          borderRadius: "15px",
                          opacity: "80%",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          flexDirection: "column",
                          boxShadow: "15",

                        }}
                      >
                        <Box
                          sx={{
                            // width: "100%",
                            // height: "80%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",

                          }}
                        >
                          <InfoTwoToneIcon
                    color="primary"
                            sx={{ width: "100%", height: "80%", opacity: "20%" }}
                          />
                          <Typography color="primary" fontFamily="MontserratBold">
                            Sin información
                          </Typography>
                          <Typography color="primary" fontFamily="MontserratBold">
                            Seleccione un registro para visualizar la información
                          </Typography>
                        </Box>
                      </Box>

                    )}
                  </Grid>
                </div>
              </Grid>
            </Hidden>

          </Grid>
        </Grid>
        {/* </Box> */}

        {/* DIALOG DE OPCION RECHAZAR */}
        <Dialog
          open={openDialogRechazar}
          onClose={handleCloseOpenDialogRechazar}
        >
          <DialogTitle >
            Confirmación
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              ¿Seguro que desea rechazar la solicitud para {solicitudesFiltered[selectedIndex]?.tipoSoli} de {detalleSolicitud[0]?.Nombre + " " + detalleSolicitud[0]?.ApellidoPaterno}?
            </DialogContentText>
            <TextField
              sx={{ width: "100%" }}
              label="Agregar comentario"
              placeholder="Agregue el motivo por el que se rechaza la solicitud"
              variant="filled"
              multiline
              rows={3}
              onChange={(c) => { setComentario(c.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" className="cancelar" onClick={() => { handleCloseOpenDialogRechazar() }}>Cancelar</Button>
            <Button className="aceptar" disabled={comentario.length >= 10 ? false : true} variant="contained" color="primary" onClick={() => { setIdSolicitud(solicitudSeleccionada); setOpenDialogImpDoc(true); modificarSolicitud("2", solicitudesFiltered[selectedIndex]?.tipoSoli); handleCloseOpenDialogRechazar(); }}>Aceptar</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG DE OPCION PEDIR MODIFICACION */}

        <Dialog
          open={openDialogModificar}
          onClose={handleCloseOpenDialogRechazar}
        >
          <DialogTitle >
            Confirmación
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              ¿Seguro que desea pedir modificacion de la solicitud de {solicitudesFiltered[selectedIndex]?.tipoSoli} de {detalleSolicitud[0]?.Nombre + " " + detalleSolicitud[0]?.ApellidoPaterno}?
            </DialogContentText>
            <TextField
              sx={{ width: "100%" }}
              label="Agregar comentario"
              placeholder="Agregue el motivo por el que se solicita modificacion a la solicitud"
              variant="filled"
              multiline
              rows={3}
              onChange={(c) => { setComentario(c.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button className="cancelar" variant="contained" color="error" onClick={() => { handleCloseOpenDialogModificar() }}>Cancelar</Button>
            <Button className="aceptar" disabled={comentario.length >= 10 ? false : true} variant="contained" color="primary" onClick={() => { setIdSolicitud(solicitudSeleccionada); setOpenDialogImpDoc(true); modificarSolicitud("3", solicitudesFiltered[selectedIndex]?.tipoSoli); handleCloseOpenDialogModificar(); }}>Aceptar</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG DE OPCION ACEPTAR */}

        <Dialog
          open={openDialogAceptar}
          onClose={handleCloseOpenDialogAceptar}
        >
          <DialogTitle >
            Confirmación
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              ¿Seguro que desea aceptar la solicitud de {solicitudesFiltered[selectedIndex]?.tipoSoli} de {detalleSolicitud[0]?.Nombre + " " + detalleSolicitud[0]?.ApellidoPaterno} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" className="cancelar" onClick={() => { handleCloseOpenDialogAceptar() }}>Cancelar</Button>
            <Button variant="contained" className="aceptar" onClick={() => { setIdSolicitud(solicitudSeleccionada); modificarSolicitud("1", solicitudesFiltered[selectedIndex]?.tipoSoli); setOpenDialogImpDoc(true); handleCloseOpenDialogAceptar(); }}>Aceptar</Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG IMPRIMIR DOCUMENTO */}
        <Dialog
          open={openDialogImpDoc}
          onClose={handleCloseOpenDialogImpDoc}
        >
          <DialogTitle >
            Descargar Documento
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              ¿Desea descargar la solicitud de {solicitudesFiltered[selectedIndex]?.tipoSoli} de {detalleSolicitud[0]?.Nombre + " " + detalleSolicitud[0]?.ApellidoPaterno}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" className="cancelar" onClick={() => { handleCloseOpenDialogImpDoc() }}>Cancelar</Button>
            <Button variant="contained" className="aceptar" onClick={() => { getDatosDocumento(); handleCloseOpenDialogImpDoc(); }}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default Solicitudes;





