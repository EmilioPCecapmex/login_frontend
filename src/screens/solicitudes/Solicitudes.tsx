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
  Switch,
  Checkbox,
  Badge,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { IDetalleSolicitud, ISolicitud } from "./ISolicitud";
import { IApps } from "./IApps";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentsDialog } from "../../components/commentsDialog";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { imprimirSolicitud } from "../Users/Users";

export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([]);

  const [solicitudesFiltered, setSolicitudesFiltered] =
    useState<Array<ISolicitud>>(solicitudes);

  const [detalleSolicitud, setDetalleSolicitud] = useState<
    Array<IDetalleSolicitud>
  >([{
    Respuesta: "",
    Mensaje: "",
    Id: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreUsuario: "",
    CorreoElectronico: "",
    Curp: "",
    Rfc: "",
    Telefono: "",
    Ext: "",
    Celular: "",
    IdTipoUsuario: "",
    EstaActivo: 0,
    Deleted: 0,
    FechaDeCreacion: "",
    CreadoPor: "",
    Estatus: 0,
    DatosAdicionales: "",
    NombreApp: "",
    NombreSolicitante: "",
  }]);

  const [detalleUsuario, setDetalleUsuario] = useState
    ({
      Id: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      NombreUsuario: "",
      CorreoElectronico: "",
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
      .put(process.env.REACT_APP_APPLICATION_DEV +"/api/solicitud-transaction", {

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
          getSolicitudes();

          if ((estado === "2" || estado === "3") && comentario != "") {
            createComentarios()
          }
        }
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
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

  const [IdSolicitud,setIdSolicitud]=useState("");

  const getDatosDocumento = () => {
    axios
      .get( process.env.REACT_APP_APPLICATION_DEV +"/api/docSolicitudActualUsuario", {
        params: {
          IdSolicitud : IdSolicitud
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          imprimirSolicitud(r.data.result[0][0]);
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
  const [comentCount,setComentCount]=useState(0);

  const getComentarios = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV +"/api/comentarios-solicitudes",
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


  useEffect(() => {
    if (selectedIndex - 1 >= 0) {
      setSolicitudSeleccionada(solicitudesFiltered[selectedIndex - 1].Id)
      setSelectedIndex(selectedIndex - 1);
    }
    else
      setSelectedIndex(-1);
      filtroXApp(idApp);
  }, [solicitudes]);

  //cuando se seleciona un filtro, se establece en el primer registro
  useEffect(() => {
    setSelectedIndex(-1);
  }, [appSelectedIndex]);

  useEffect(() => {
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

  }, [selectedIndex]);

  useEffect(() => {
    if (detalleSolicitud[0]?.NombreUsuario)
      checkCambios();
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
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <CommentsDialog open={openComments} close={handleCloseComments} solicitud={solicitudSeleccionada} />
      <Box
        sx={{
          height: "90vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "95%",
            width: "95%",
            border: "1px solid #b3afaf",
            borderRadius: 5,
            backgroundColor: "#E4E4E4",
            display: "flex",
          }}
        >
          {/* Lateral  filtro y lista de informacion*/}
          <Box
            sx={{
              width: "30%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl
                fullWidth
                sx={{ bgcolor: "#fff", borderRadius: ".4vw", boxShadow: "15" }}
              >
                <InputLabel><Typography sx={{ fontFamily: 'MontserratBold' }}>
                  Filtro por aplicación
                </Typography></InputLabel>
                <Select value={appSelectedIndex} label="Filtar---por---aplicacion" onChange={(c) =>{ filtroXApp(c.target.value); setIdApp(c.target.value);}}>
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
            </Box>
            <Box
              sx={{
                width: "95%",
                height: "79%",
                display: "flex",
                alignItems: "center",
                pb: 2,
                bgcolor: "#fff",
                boxShadow: "15",
                pt: 2,
                borderRight: "solid 1px",
                overflow: "auto",
                borderRadius: ".4vw",
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
                sx={{ width: "100%", height: "100%", borderRadius: ".4vw" }}
              >
                <Divider />
                {solicitudesFiltered?.map((item, x) => {
                  if (!((solicitudesFiltered[x]?.tipoSoli.toUpperCase() === "ALTA" && solicitudesFiltered[x].Estatus === 3) || (solicitudesFiltered[x].tipoSoli?.toUpperCase() === "MODIFICACION" && solicitudesFiltered[x].Estatus === 3))) {
                    return (
                      <Box key={x}>
                        <ListItemButton
                          key={x}
                          onClick={() => {
                            {
                              itemSelected(x, item.Id);
                            }
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
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              flexDirection: 'column'
                            }}
                          >

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', width: '60%', alignItems: 'center' }}>
                                <Typography
                                  sx={{
                                    display: "inline",
                                    fontFamily: "MontserratSemiBold",
                                  }}
                                  color="text.primary"
                                >
                                  {"NOMBRE:"}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "MontserratMedium",
                                    ml: 1,
                                    fontSize: ".8rem",
                                  }}
                                >
                                  {item.NombreUsuario.toUpperCase()}
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', width: '40%', justifyContent: 'flex-end' }}>
                                <Typography
                                  sx={{
                                    display: "inline",
                                    fontFamily: "MontserratSemiBold",
                                    fontSize: '.6vw'
                                  }}
                                  color="text.primary"
                                >
                                  {"Fecha:"}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "MontserratMedium",
                                    ml: 1,
                                    fontSize: '.6vw'
                                  }}
                                >
                                  {moment(item.FechaDeCreacion, moment.ISO_8601)
                                    .format("DD/MM/YYYY HH:mm:SS")
                                    .toString()}
                                </Typography>
                              </Box>


                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                sx={{
                                  display: "inline",
                                  fontFamily: "MontserratSemiBold"
                                }}
                                color="text.primary"
                              >
                                {"APLICACIÓN:"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "MontserratMedium",
                                  ml: 1,
                                  fontSize: ".8rem",
                                }}
                              >
                                {item.AppNombre.toUpperCase()}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                sx={{
                                  display: "inline",
                                  fontFamily: "MontserratSemiBold",
                                }}
                                color="text.primary"
                              >
                                {"SOLICITANTE:"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "MontserratMedium",
                                  ml: 1,
                                  fontSize: ".8rem",
                                }}
                              >
                                {item.NombreSolicitante.toUpperCase()}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                sx={{
                                  display: "inline",
                                  fontFamily: "MontserratSemiBold",
                                }}
                                color="text.primary"
                              >
                                {"TIPO DE SOLICITUD:"}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "MontserratMedium",
                                  ml: 1,
                                  fontSize: ".8rem",
                                }}
                              >
                                {item?.tipoSoli.toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>

                        </ListItemButton>
                        <Divider />
                      </Box>
                    );
                  }

                })}
              </List>
            </Box>
          </Box>

          {solicitudes.length !== 0 ? (
            <Box
              sx={{
                width: "70%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  height: "95%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #b3afaf",
                  borderRadius: "15px",
                  boxShadow: "15",
                }}
              >

                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "#fff",
                    borderRadius: "15px",
                    opacity: "80%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    boxShadow: "15",
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
                          sx={{ width: "100%", height: "80%", opacity: "20%" }}
                        />
                        <Typography sx={{ fontFamily: "MontserratSemiBold" }}>
                          Sin información
                        </Typography>
                        <Typography sx={{ fontFamily: "MontserratSemiBold" }}>
                          Seleccione un registro para visualizar la información
                        </Typography>
                      </Box>
                    ) :
                    (solicitudesFiltered[selectedIndex]?.NombreUsuario === (detalleSolicitud[0].Nombre + " " + detalleSolicitud[0].ApellidoPaterno)) ?

                      <Box
                        sx={{
                          width: "98%",
                          height: "95%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          bgcolor: "#fff",
                          borderRadius: "15px",
                        }}
                      >

                        <Box
                          sx={{
                            width: "98%",
                            height: "95%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "15%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  Aplicación
                                </Typography>
                              }
                              InputLabelProps={{}}
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "32.5%", bgcolor: null
                              }}
                              value={detalleSolicitud[0]?.NombreApp || ""}
                              variant="standard"
                              
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  SOLICITADO POR
                                </Typography>
                              }
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "30%",
                              }}
                              value={detalleSolicitud[0]?.NombreSolicitante || ""}
                              variant="standard"
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  FECHA DE REGISTRO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "13.5%",
                              }}
                              value={detalleSolicitud[0]?.FechaDeCreacion.split("T")[0]}
                              variant="standard"
                            />

                            <Box sx={{ width: "4%" }}>
                              <Tooltip title="Ver comentarios">
                                <Badge badgeContent={comentCount} color="primary">
                                  <IconButton onClick={() => setOpenComments(true)}
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "#c4a57b",
                                        },
                                      },
                                    ]}>
                                    <CommentIcon fontSize="large" />
                                  </IconButton>
                                </Badge>
                              </Tooltip>

                            </Box>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: "15%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  NOMBRE(S)
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.Nombre ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Nombre || ""}
                              variant="standard"
                              helperText={onChangeInfo.Nombre ? detalleUsuario.Nombre : null}
                            />

                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  APELLIDO PATERNO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.ApellidoPaterno ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.ApellidoPaterno || ""}
                              variant="standard"
                              helperText={onChangeInfo.ApellidoPaterno ? detalleUsuario.ApellidoPaterno : null}
                            />

                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  APELLIDO MATERNO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.ApellidoMaterno ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.ApellidoMaterno || ""}
                              variant="standard"
                              helperText={onChangeInfo.ApellidoMaterno ? detalleUsuario.ApellidoMaterno : null}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: "15%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  USUARIO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.NombreUsuario ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.NombreUsuario || ""}
                              variant="standard"
                              helperText={onChangeInfo.NombreUsuario ? detalleUsuario.NombreUsuario : null}
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  CORREO ELECTRÓNICO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.CorreoElectronico ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.CorreoElectronico || ""}
                              variant="standard"
                              helperText={onChangeInfo.CorreoElectronico ? detalleUsuario.CorreoElectronico : null}
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  CELULAR
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.Celular ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Celular || ""}
                              variant="standard"
                              helperText={onChangeInfo.Celular ? detalleUsuario.Celular : null}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: "15%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  CURP
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.Curp ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Curp || ""}
                              variant="standard"
                              helperText={onChangeInfo.Curp ? detalleUsuario.Curp : null}
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  RFC
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "25%",
                                backgroundColor: onChangeInfo.Rfc ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Rfc || ""}
                              variant="standard"
                              helperText={onChangeInfo.Rfc ? detalleUsuario.Rfc : null}
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  TÉLEFONO
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "15%",
                                backgroundColor: onChangeInfo.Telefono ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Telefono || ""}
                              variant="standard"
                              helperText={onChangeInfo.Telefono ? detalleUsuario.Telefono : null}
                            />
                            <TextField
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  EXTENSIÓN
                                </Typography>
                              }
                              InputProps={{ readOnly: true }}
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "10%",
                                backgroundColor: onChangeInfo.Ext ? "#fde6a2" : null,
                              }}
                              value={detalleSolicitud[0]?.Ext || ""}
                              variant="standard"
                              helperText={onChangeInfo.Ext ? detalleUsuario.Ext : null}
                            />
                          </Box>

                          <Box
                            sx={{
                              width: "100%",
                              height: "30%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <TextField
                              multiline
                              rows={8}
                              label={
                                <Typography
                                  sx={{ fontFamily: "MontserratSemiBold" }}
                                >
                                  INFORMACIÓN ADICIONAL
                                </Typography>
                              }
                              sx={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: "1.5vw",
                                width: "90%",
                              }}
                              value={detalleSolicitud[0]?.DatosAdicionales || ""}
                              variant="filled"
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: "10%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end", mt: "2vh"
                            }}
                          >

                            <Box
                              sx={{
                                display: "flex",
                                width: "80%",

                                justifyContent: "flex-end", mr: "2vw"
                              }}
                            >
                              {solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() === "ALTA" || solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() === "MODIFICACION" ?
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "90%" }}>
                                  <Box sx={{ display: "flex", flexDirection: "row", width: "65%" }}>

                                    <FormControlLabel control={<Checkbox checked={puedeFirmar} onChange={() => { setPuedeFirmar(!puedeFirmar) }} />} label="Permiso para firmar" />
                                    <FormControlLabel control={<Checkbox checked={adminPlataforma} onChange={() => { setAdminPlataforma(!adminPlataforma) }} />} label="Admin. de plataforma" />

                                  </Box>
                                  <Box sx={{ display: "flex", flexDirection: "row", width: "35%" }}>
                                    <Button variant="contained" color="info" sx={{ fontSize: ".7vw" }} onClick={() => { setOpenDialogModificar(true); }}>Solicitar modificar</Button>
                                  </Box>
                                </Box>
                                : null}
                              <Button variant="contained" color="primary" sx={{ mr: "2vw" }} onClick={() => { setOpenDialogAceptar(true); }}>Aceptar</Button>
                              <Button variant="contained" color="error" sx={{ mr: "2vw" }} onClick={() => { setOpenDialogRechazar(true); }}>Rechazar</Button>
                            </Box>

                            <Box
                              sx={{ display: "flex", width: "10%", justifyContent: "flex-end", mr: "2vw" }}
                            >
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
                            </Box>

                          </Box>
                        </Box>
                      </Box> : <CircularProgress />
                  }
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "70%",
                height: "100%",
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
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InfoTwoToneIcon
                  sx={{ width: "100%", height: "80%", opacity: "20%" }}
                />
                <Typography fontFamily="MontserratBold">
                  Sin información
                </Typography>
                <Typography fontFamily="MontserratBold">
                  Seleccione un registro para visualizar la información
                </Typography>
              </Box>
            </Box>
          )}


        </Box>
      </Box>

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
          <Button variant="contained" color="error" onClick={() => { handleCloseOpenDialogRechazar() }}>Cancelar</Button>
          <Button disabled={comentario.length >= 10 ? false : true} variant="contained" color="primary" onClick={() => { setIdSolicitud(solicitudSeleccionada);setOpenDialogImpDoc(true); modificarSolicitud("2", solicitudesFiltered[selectedIndex]?.tipoSoli); handleCloseOpenDialogRechazar(); }}>Aceptar</Button>
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
          <Button variant="contained" color="error" onClick={() => { handleCloseOpenDialogModificar() }}>Cancelar</Button>
          <Button disabled={comentario.length >= 10 ? false : true} variant="contained" color="primary" onClick={() => { setIdSolicitud(solicitudSeleccionada);setOpenDialogImpDoc(true); modificarSolicitud("3", solicitudesFiltered[selectedIndex]?.tipoSoli); handleCloseOpenDialogModificar(); }}>Aceptar</Button>
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
          <Button variant="contained" color="error" onClick={() => { handleCloseOpenDialogAceptar() }}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={() => { setIdSolicitud(solicitudSeleccionada); modificarSolicitud("1", solicitudesFiltered[selectedIndex]?.tipoSoli);setOpenDialogImpDoc(true); handleCloseOpenDialogAceptar(); }}>Aceptar</Button>
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
          <Button variant="contained" color="error" onClick={() => { handleCloseOpenDialogImpDoc() }}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={() => { getDatosDocumento(); handleCloseOpenDialogImpDoc(); }}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Solicitudes;