/* eslint-disable array-callback-return */
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { alertaInformativa } from "../../components/alertas/toast";
import { Header } from "../../components/header";
import { COLOR } from "../styles/colors";
import { IApps } from "./IApps";
import { IDetalleSolicitud, ISolicitud, iOnChangeInfo } from "./ISolicitud";
import VerSolicitudesModal from "./VerSolicitudesModal";
export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([]);

  const [solicitudesFiltered, setSolicitudesFiltered] = useState<
    Array<ISolicitud>
  >(solicitudes);

  const [detalleSolicitud, setDetalleSolicitud] = useState<IDetalleSolicitud>({
    ApellidoMaterno: "",
    ApellidoPaterno: "",
    Celular: "",
    CorreoElectronico: "",
    CreadoPor: "",
    Curp: "",
    Estatus: 0,
    Ext: "",
    FechaDeCreacion: "",
    Id: "",
    IdTipoUsuario: "",
    Nombre: "",
    NombreApp: "",
    NombreSolicitante: "",
    NombreUsuario: "",
    PuedeFirmar: 1,
    Puesto: "",
    Rfc: "",
    Roles: "",
    Telefono: "",
    TpoUsuario: "",
    UResponsable: "",
  });

  const [detalleUsuario, setDetalleUsuario] = useState({
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
    UResponsable: "",
  });

  const [onChangeInfo, setOnChangeInfo] = useState<iOnChangeInfo>({
    ApellidoMaterno: false,
    ApellidoPaterno: false,
    Celular: false,
    CorreoElectronico: false,
    Curp: false,
    Ext: false,
    Id: false,
    IdTipoUsuario: false,
    Nombre: false,
    NombreApp: false,
    NombreSolicitante: false,
    NombreUsuario: false,
    PuedeFirmar: false,
    Puesto: false,
    Rfc: false,
    Roles: false,
    Telefono: false,
    TpoUsuario: false,
    UResponsable: false,
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
      setSolicitudesFiltered(solicitudes);
    } else {
      setSolicitudesFiltered(solicitudes.filter((item) => item.IdApp === x));
    }
  };

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

  const modificarSolicitud = (estado: string, tipoSoli: string) => {
    axios
      .put(
        process.env.REACT_APP_APPLICATION_DEV + "/api/solicitud-transaction",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdSolicitud: detalleSolicitud.Id,
          Estado: estado,
          TipoSoli: tipoSoli,
          AdminPlataforma: adminPlataforma ? 1 : 0,
          PermisoFirma: puedeFirmar ? 1 : 0,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          if (selectedIndex - 1 >= 0) {
            setSolicitudSeleccionada(solicitudesFiltered[selectedIndex - 1].Id);
            setSelectedIndex(selectedIndex - 1);
          } else setSelectedIndex(-1);
          filtroXApp(idApp);
          getSolicitudes();
        }
      });
  };

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
          setSolicitudesFiltered(r.data.data);
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
          setDetalleSolicitud(r.data.data[0]);
        }
      });
  };

  const getDatosDocumento = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_DEV +
          "/api/docSolicitudActualUsuario",
        {
          params: {
            IdSolicitud: IdSolicitud,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          alertaInformativa("No se encontro información.");
        } else {
          // Obtén el nombre del archivo del servidor
          const contentDisposition = response.headers["content-disposition"];
          const matches =
            contentDisposition && contentDisposition.match(/filename="(.+)"/);
          const nombreArchivo = matches
            ? matches[1]
            : `${
                detalleSolicitud?.Nombre +
                " " +
                detalleSolicitud?.ApellidoPaterno +
                " " +
                detalleSolicitud?.ApellidoMaterno.toUpperCase()
              }.pdf`;

          // Crea un enlace temporal y simula un clic para descargar el archivo
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
          );
          const link = document.createElement("a");
          link.setAttribute("download", nombreArchivo);
          link.setAttribute("href", url);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((error) => {
        alertaInformativa("No se encontro información.");
      });
  };
  const [IdSolicitud, setIdSolicitud] = useState("");

  useEffect(() => {
    getApps();
    getSolicitudes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //registro seleccionado
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //filtrado port aplicacion
  const [appSelectedIndex, setAppSelectedIndex] = useState("");

  const [adminPlataforma, setAdminPlataforma] = useState(false);
  const [puedeFirmar, setPuedeFirmar] = useState(false);

  useEffect(() => {
    setPuedeFirmar(detalleSolicitud.PuedeFirmar === 1);
  }, [detalleSolicitud]);

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

      detalleSolicitud.Nombre === detalleUsuario.Nombre
        ? (auxiliar.Nombre = false)
        : (auxiliar.Nombre = true);

      detalleSolicitud.ApellidoPaterno === detalleUsuario.ApellidoPaterno
        ? (auxiliar.ApellidoPaterno = false)
        : (auxiliar.ApellidoPaterno = true);

      detalleSolicitud.ApellidoMaterno === detalleUsuario.ApellidoMaterno
        ? (auxiliar.ApellidoMaterno = false)
        : (auxiliar.ApellidoMaterno = true);

      detalleSolicitud?.NombreUsuario === detalleUsuario?.NombreUsuario
        ? (auxiliar.NombreUsuario = false)
        : (auxiliar.NombreUsuario = true);

      detalleSolicitud.CorreoElectronico === detalleUsuario.CorreoElectronico
        ? (auxiliar.CorreoElectronico = false)
        : (auxiliar.CorreoElectronico = true);

      detalleSolicitud.Puesto === detalleUsuario.Puesto
        ? (auxiliar.Puesto = false)
        : (auxiliar.Puesto = true);

      detalleSolicitud.Celular === detalleUsuario.Celular
        ? (auxiliar.Celular = false)
        : (auxiliar.Celular = true);

      detalleSolicitud.Curp === detalleUsuario.Curp
        ? (auxiliar.Curp = false)
        : (auxiliar.Curp = true);

      detalleSolicitud.Rfc === detalleUsuario.Rfc
        ? (auxiliar.Rfc = false)
        : (auxiliar.Rfc = true);

      detalleSolicitud.Telefono === detalleUsuario.Telefono
        ? (auxiliar.Telefono = false)
        : (auxiliar.Telefono = true);

      detalleSolicitud.Ext === detalleUsuario.Ext
        ? (auxiliar.Ext = false)
        : (auxiliar.Ext = true);

      setOnChangeInfo({ ...auxiliar });
    }
    setPuedeFirmar(false);
    setAdminPlataforma(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalleUsuario]);

  const checkCambios = () => {
    if (
      solicitudesFiltered[selectedIndex]?.tipoSoli.toUpperCase() ===
      "MODIFICACION"
    ) {
      // getDetalleUsuario();
    } else {
      setOnChangeInfo({
        ApellidoMaterno: false,
        ApellidoPaterno: false,
        Celular: false,
        CorreoElectronico: false,
        Curp: false,
        Ext: false,
        Id: false,
        IdTipoUsuario: false,
        Nombre: false,
        NombreApp: false,
        NombreSolicitante: false,
        NombreUsuario: false,
        PuedeFirmar: false,
        Puesto: false,
        Rfc: false,
        Roles: false,
        Telefono: false,
        TpoUsuario: false,
        UResponsable: false,
      });
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0) {
      setSolicitudSeleccionada(solicitudesFiltered[selectedIndex].Id);
      getDetalleSolicitud();
      // getComentarios();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  useEffect(() => {
    if (detalleSolicitud?.NombreUsuario) checkCambios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalleSolicitud]);

  const [openDialogImpDoc, setOpenDialogImpDoc] = useState(false);
  const [openDialogModificar, setOpenDialogModificar] = useState(false);
  const [openDialogRechazar, setOpenDialogRechazar] = useState(false);
  const [openDialogAceptar, setOpenDialogAceptar] = useState(false);

  const [comentario, setComentario] = useState("");
  const listadoSolicitudes = () => {
    return (
      <>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-around",
            padding: { xs: 1, sm: 2 },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ 
              display: "flex",
              marginBottom: { xs: 1, sm: 2 },
            }}
          >
            <FormControl
              sx={{
                width: "100%",
                bgcolor: "#fff",
                borderRadius: { xs: "8px", sm: ".4vw" },
              }}
            >
              <InputLabel>
                <Typography sx={{ fontFamily: "MontserratBold" }}>
                  Filtro por aplicación
                </Typography>
              </InputLabel>
              <Select
                value={appSelectedIndex}
                label="Filtar---por---aplicacion"
                onChange={(c) => {
                  filtroXApp(c.target.value);
                  setIdApp(c.target.value);
                }}
              >
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
            item
            xs={12}
            sx={{
              width: "100%",
              height: { xs: "60vh", md: "75vh" },
              alignItems: "center",
              bgcolor: "#fff",
              boxShadow: "15",
              borderRight: "solid 1px",
              overflow: "auto",
              borderRadius: { xs: "8px", sm: "15px" },
              borderColor: "#fff",
              "&::-webkit-scrollbar": {
                width: { xs: "4px", sm: "6px" },
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
              sx={{ 
                padding: { xs: "8px", sm: "12px", md: "16px" },
                backgroundColor: "transparent",
              }}
            >
              {solicitudesFiltered?.map((item, x) => {
                if (
                  !(
                    (solicitudesFiltered[x]?.tipoSoli.toUpperCase() ===
                      "ALTA" &&
                      solicitudesFiltered[x].Estatus === 3) ||
                    (solicitudesFiltered[x].tipoSoli?.toUpperCase() ===
                      "MODIFICACION" &&
                      solicitudesFiltered[x].Estatus === 3)
                  )
                ) {
                  // Definir colores pasteles según el tipo de solicitud
                  const getColorByType = (tipo: string) => {
                    switch (tipo?.toUpperCase()) {
                      case "ALTA":
                        return "#a8e6a3"; // Verde pastel
                      case "VINCULACIÓN":
                      case "VINCULACION":
                        return "#ffcc80"; // Naranja pastel
                      case "MODIFICACIÓN":
                      case "MODIFICACION":
                        return "#fff59d"; // Amarillo pastel
                      case "BAJA":
                        return "#e0e0e0"; // Gris pastel
                      default:
                        return "#e3f2fd"; // Azul pastel por defecto
                    }
                  };

                  const getBackgroundByType = (tipo: string) => {
                    switch (tipo?.toUpperCase()) {
                      case "ALTA":
                        return "#f1f8e9"; // Fondo verde muy claro
                      case "VINCULACIÓN":
                      case "VINCULACION":
                        return "#fff3e0"; // Fondo naranja muy claro
                      case "MODIFICACIÓN":
                      case "MODIFICACION":
                        return "#fffde7"; // Fondo amarillo muy claro
                      case "BAJA":
                        return "#fafafa"; // Fondo gris muy claro
                      default:
                        return "#f8f9fa"; // Fondo neutral
                    }
                  };

                  return (
                    <Grid key={x} sx={{ mb: { xs: 0.5, sm: 1 } }}>
                      <ListItemButton
                        key={x}
                        onClick={() => {
                          itemSelected(x, item.Id);
                        }}
                        sx={{
                          padding: 0,
                          borderRadius: { xs: "8px", sm: "12px" },
                          overflow: "hidden",
                          backgroundColor: getBackgroundByType(item?.tipoSoli),
                          border: selectedIndex === x ? "2px solid #AF8C55" : "1px solid #e0e0e0",
                          boxShadow: selectedIndex === x 
                            ? "0 4px 12px rgba(175, 140, 85, 0.2)" 
                            : { xs: "0 1px 4px rgba(0, 0, 0, 0.1)", sm: "0 2px 8px rgba(0, 0, 0, 0.1)" },
                          transition: "all 0.2s ease-in-out",
                          minHeight: { xs: "70px", sm: "80px" },
                          "&:hover": {
                            backgroundColor: getBackgroundByType(item?.tipoSoli),
                            boxShadow: { 
                              xs: "0 2px 8px rgba(0, 0, 0, 0.15)", 
                              sm: "0 4px 16px rgba(0, 0, 0, 0.15)" 
                            },
                            transform: { xs: "translateY(-1px)", sm: "translateY(-2px)" },
                          },
                          "&.Mui-selected": {
                            backgroundColor: getBackgroundByType(item?.tipoSoli),
                          },
                        }}
                        selected={selectedIndex === x ? true : false}
                      >
                        {/* Barra de color lateral */}
                        <Box
                          sx={{
                            width: { xs: "4px", sm: "6px" },
                            height: "100%",
                            backgroundColor: getColorByType(item?.tipoSoli),
                            minHeight: { xs: "70px", sm: "80px" },
                            flexShrink: 0,
                          }}
                        />
                        
                        {/* Contenido de la tarjeta */}
                        <Box sx={{ 
                          padding: { xs: "12px", sm: "16px" }, 
                          width: "100%",
                          minHeight: { xs: "70px", sm: "80px" },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}>
                          {/* Primera fila: Nombre y Fecha */}
                          <Grid container spacing={{ xs: 0.5, sm: 1 }} sx={{ mb: { xs: 0.5, sm: 1 } }}>
                            <Grid item xs={12} sm={8} md={7}>
                              <Typography 
                                variant="subtitle2"
                                sx={{ 
                                  fontWeight: 600,
                                  color: "#2c3e50",
                                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                                  lineHeight: { xs: 1.1, sm: 1.2 },
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: { xs: "nowrap", sm: "normal" },
                                }}
                              >
                                {item.NombreUsuario.toUpperCase()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={5} sx={{ 
                              textAlign: { xs: 'left', sm: 'right' },
                              mt: { xs: 0, sm: 0 },
                            }}>
                              <Typography 
                                variant="caption"
                                sx={{ 
                                  color: "#666",
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  backgroundColor: "transparent",
                                  padding: { xs: "1px 4px", sm: "2px 6px" },
                                  borderRadius: "4px",
                                  display: "inline-block",
                                }}
                              >
                                {moment(item.FechaDeCreacion, moment.ISO_8601)
                                  .format("DD/MM/YYYY HH:mm")
                                  .toString()}
                              </Typography>
                            </Grid>
                          </Grid>

                          {/* Segunda fila: Aplicación */}
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: "#34495e",
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              mb: { xs: 0.5, sm: 1 },
                              lineHeight: 1.3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: { xs: "nowrap", sm: "normal" },
                            }}
                          >
                            <Box component="span" sx={{ fontWeight: 600 }}>APP:</Box> {item.AppNombre}
                          </Typography>

                          {/* Tercera fila: Solicitante y Tipo */}
                          <Grid container spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
                            <Grid item xs={12} sm={7} md={6}>
                              <Typography 
                                variant="caption"
                                sx={{ 
                                  color: "#7f8c8d",
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: { xs: "nowrap", sm: "normal" },
                                }}
                              >
                                <Box component="span" sx={{ fontWeight: 600 }}>SOLICITANTE:</Box> {item.NombreSolicitante}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={5} md={6} sx={{ 
                              textAlign: { xs: 'left', sm: 'right' },
                              mt: { xs: 0.5, sm: 0 },
                            }}>
                              <Typography 
                                variant="caption"
                                sx={{ 
                                  color: getColorByType(item?.tipoSoli),
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  fontWeight: 600,
                                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                                  padding: { xs: "2px 6px", sm: "2px 8px" },
                                  borderRadius: { xs: "6px", sm: "8px" },
                                  border: `1px solid ${getColorByType(item?.tipoSoli)}`,
                                  display: "inline-block",
                                  textAlign: "center",
                                  minWidth: { xs: "60px", sm: "auto" },
                                }}
                              >
                                {item?.tipoSoli.toUpperCase()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </ListItemButton>
                    </Grid>
                  );
                }
              })}
            </List>
          </Grid>
        </Grid>
      </>
    );
  };

  const informacionSolicitud = () => {
    return (
      <>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          height={{ xs: "auto", md: "90vh" }}
          sx={{ padding: { xs: 1, sm: 2 } }}
        >
          {solicitudes.length !== 0 ? (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: { xs: "100%", sm: "98%" },
                height: { xs: "auto", md: "95%" },
                minHeight: { xs: "70vh", md: "auto" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #b3afaf",
                borderRadius: { xs: "8px", sm: "15px" },
                boxShadow: "15",
                bgcolor: COLOR.blanco,
                overflow: "auto",
              }}
            >
              {selectedIndex < 0 ? (
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
                    sx={{
                      width: "50%",
                      height: "50%",
                      opacity: "20%",
                    }}
                  />
                  <Typography
                    color="primary"
                    sx={{ fontFamily: "MontserratSemiBold" }}
                  >
                    Sin información
                  </Typography>
                  <Typography
                    color="primary"
                    sx={{ fontFamily: "MontserratSemiBold" }}
                  >
                    Seleccione un registro para visualizar la información
                  </Typography>
                </Box>
              ) : solicitudesFiltered[selectedIndex]?.NombreUsuario ===
                detalleSolicitud.Nombre +
                  " " +
                  detalleSolicitud.ApellidoPaterno ? (
                <Grid
                  container
                  p={3}
                  sx={{
                    display: "flex",
                    overflow: "auto",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    height: "100%",
                    // bgcolor: "greenyellow",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setSelectedIndex(-1);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <VerSolicitudesModal
                    detalleSolicitud={detalleSolicitud}
                    // comentCount={comentCount}
                    onChangeInfo={onChangeInfo}
                    detalleUsuario={detalleUsuario}
                    solicitudSeleccionada={solicitudSeleccionada}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={puedeFirmar}
                        onChange={() => {
                          setPuedeFirmar(!puedeFirmar);
                        }}
                      />
                    }
                    label="Permiso para firmar"
                  />

                  <Grid
                    container
                    justifyContent="center"
                    flexDirection={"column"}
                    alignItems={"center"}
                    spacing={{ xs: 2, sm: 1 }}
                  >
                    <Grid
                      item
                      container
                      xs={12}
                      sm={10}
                      md={10}
                      lg={10}
                      xl={10}
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 2, sm: 0 },
                      }}
                    >
                      <Grid item xs={12} sm="auto">
                        <Button
                          className="aceptar"
                          variant="contained"
                          fullWidth={window.innerWidth < 600}
                          onClick={() => {
                            setOpenDialogAceptar(true);
                          }}
                        >
                          Aceptar
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm="auto">
                        <Button
                          className="cancelar"
                          variant="contained"
                          fullWidth={window.innerWidth < 600}
                          onClick={() => {
                            setOpenDialogRechazar(true);
                          }}
                        >
                          Rechazar
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid 
                      item 
                      xs={12}
                      sx={{ 
                        justifyContent: "center",
                        display: "flex",
                        gap: 1,
                        mt: { xs: 1, sm: 0 }
                      }}
                    >
                      <Tooltip title="Visualizar solicitud anterior">
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
                      </Tooltip>
                      <Tooltip title="Visualizar solicitud siguiente">
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
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <CircularProgress />
              )}
            </Grid>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InfoTwoToneIcon
                color="primary"
                sx={{
                  width: "100%",
                  height: "80%",
                  opacity: "20%",
                }}
              />
              <Typography color="primary" fontFamily="MontserratBold">
                Sin información
              </Typography>
              <Typography color="primary" fontFamily="MontserratBold">
                Seleccione un registro para visualizar la información
              </Typography>
            </Box>
          )}
        </Grid>
      </>
    );
  };
  return (
    <Grid
      container
      item
      xl={12}
      xs={12}
      lg={12}
      md={12}
      sm={12}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "auto",
      }}
    >
      <Header menuActual="Solicitudes" />

      {/* <CommentsDialog
        open={openComments}
        close={handleCloseComments}
        solicitud={solicitudSeleccionada}
      /> */}

<Grid
  container
  xl={12}
  lg={12}
  md={12}
  sm={12}
  xs={12}
  justifyContent="center"
  height={"90vh"}
  overflow={"auto"}
  alignItems={'center'}
  sx={{ 
    display: "flex",
    padding: { xs: 1, sm: 2 },
  }}
>
  <Grid item lg={4} md={5} xs={12} sx={{ height: { xs: 'auto', md: '100%' } }}>
    <Hidden mdDown implementation="css">
      {listadoSolicitudes()}
    </Hidden>
    <Hidden mdUp implementation="css">
      {selectedIndex === -1 ? listadoSolicitudes() : informacionSolicitud()}
    </Hidden>
  </Grid>

  <Grid item lg={8} md={7} xs={12} sx={{ height: { xs: 'auto', md: '100%' } }}>
    <Hidden mdDown implementation="css">
      {informacionSolicitud()}
    </Hidden>
  </Grid>
</Grid>


      <Dialog
        open={openDialogRechazar}
        onClose={() => {
          setOpenDialogRechazar(false);
          setComentario("");
        }}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 2, sm: 3 },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          }
        }}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea rechazar la solicitud para{" "}
            {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
            {detalleSolicitud?.Nombre + " " + detalleSolicitud?.ApellidoPaterno}
            ?
          </DialogContentText>
          <TextField
            sx={{ width: "100%", mt: 2 }}
            label="Agregar comentario *"
            placeholder="Agregue el motivo por el que se rechaza la solicitud"
            variant="filled"
            multiline
            rows={3}
            value={comentario}
            error={comentario.length > 0 && comentario.length < 10}
            helperText={
              <span>
                {comentario.length < 10 ? (
                  <span style={{ color: 'red' }}>
                    Es obligatorio agregar un comentario (mínimo 10 caracteres)
                  </span>
                ) : (
                  <span style={{ color: 'green' }}>Comentario válido</span>
                )}
                <span style={{ float: 'right', color: comentario.length < 10 ? 'red' : 'green' }}>
                  {comentario.length}/10
                </span>
              </span>
            }
            onChange={(c) => {
              setComentario(c.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="cancelar"
            onClick={() => {
              setOpenDialogRechazar(false);
              setComentario("");
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={comentario.length < 10}
            variant="contained"
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'none',
              fontSize: '14px',
              backgroundColor: comentario.length < 10 ? '#9e9e9e !important' : '#15212f !important',
              color: '#fff !important',
              '&:hover': {
                backgroundColor: comentario.length < 10 ? '#757575 !important' : 'rgba(47, 47, 47, 0.2) !important',
                color: comentario.length < 10 ? '#fff !important' : '#000 !important',
              },
              '&:disabled': {
                backgroundColor: '#9e9e9e !important',
                color: '#fff !important',
              }
            }}
            onClick={() => {
              setIdSolicitud(solicitudSeleccionada);
              setOpenDialogImpDoc(true);
              modificarSolicitud(
                "2",
                solicitudesFiltered[selectedIndex]?.tipoSoli
              );
              setOpenDialogRechazar(false);
              setComentario("");
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
          open={openDialogModificar}
          onClose={() => setOpenDialogModificar(false)}
        >
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Seguro que desea pedir modificacion de la solicitud de{" "}
              {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
              {detalleSolicitud[0]?.Nombre +
                " " +
                detalleSolicitud[0]?.ApellidoPaterno}
              ?
            </DialogContentText>
            <TextField
              sx={{ width: "100%" }}
              label="Agregar comentario"
              placeholder="Agregue el motivo por el que se solicita modificacion a la solicitud"
              variant="filled"
              multiline
              rows={3}
              onChange={(c) => {
                setComentario(c.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="cancelar"
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialogModificar(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="aceptar"
              disabled={comentario.length >= 10 ? false : true}
              variant="contained"
              color="primary"
              onClick={() => {
                setIdSolicitud(solicitudSeleccionada);
                setOpenDialogImpDoc(true);
                modificarSolicitud(
                  "3",
                  solicitudesFiltered[selectedIndex]?.tipoSoli
                );
                setOpenDialogModificar(false);
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog> */}

      <Dialog
        open={openDialogAceptar}
        onClose={() => setOpenDialogAceptar(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 2, sm: 3 },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          }
        }}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea aceptar la solicitud de{" "}
            {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
            {detalleSolicitud?.Nombre + " " + detalleSolicitud?.ApellidoPaterno}{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="cancelar"
            onClick={() => {
              setOpenDialogAceptar(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="aceptar"
            onClick={() => {
              setIdSolicitud(solicitudSeleccionada);
              modificarSolicitud(
                "1",
                solicitudesFiltered[selectedIndex]?.tipoSoli
              );
              setOpenDialogImpDoc(true);
              setOpenDialogAceptar(false);
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogImpDoc}
        onClose={() => setOpenDialogImpDoc(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 2, sm: 3 },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          }
        }}
      >
        <DialogTitle>Descargar Documento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea descargar la solicitud de{" "}
            {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
            {detalleSolicitud?.Nombre + " " + detalleSolicitud?.ApellidoPaterno}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="cancelar"
            onClick={() => {
              setOpenDialogImpDoc(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="aceptar"
            onClick={() => {
              getDatosDocumento();
              setOpenDialogImpDoc(false);
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Solicitudes;
