/* eslint-disable array-callback-return */
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
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

  const [solicitudesFiltered, setSolicitudesFiltered] =
    useState<Array<ISolicitud>>(solicitudes);

  const [detalleSolicitud, setDetalleSolicitud] = useState<
    Array<IDetalleSolicitud>
  >([
    {
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
    },
  ]);

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
          setDetalleSolicitud(r.data.data);
        }
      });
  };

  const [IdSolicitud, setIdSolicitud] = useState("");

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
      .then(
        (response) => {
        if (response.status !== 200 && response.status !== 201) {
          alertaInformativa("No se encontro información.");
        } else {
          // Obtén el nombre del archivo del servidor
          const contentDisposition = response.headers["content-disposition"];
          const matches =
            contentDisposition && contentDisposition.match(/filename="(.+)"/);
          const nombreArchivo = matches
            ? matches[1]
            : `${detalleSolicitud[0]?.Nombre+" "+detalleSolicitud[0]?.ApellidoPaterno+" "+detalleSolicitud[0]?.ApellidoMaterno.toUpperCase()}.pdf`;

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

        console.error("Error al obtener el documento:", error);
      });
  };

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
    setPuedeFirmar(detalleSolicitud[0].PuedeFirmar === 1);
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

      detalleSolicitud[0].Nombre === detalleUsuario.Nombre
        ? (auxiliar.Nombre = false)
        : (auxiliar.Nombre = true);

      detalleSolicitud[0].ApellidoPaterno === detalleUsuario.ApellidoPaterno
        ? (auxiliar.ApellidoPaterno = false)
        : (auxiliar.ApellidoPaterno = true);

      detalleSolicitud[0].ApellidoMaterno === detalleUsuario.ApellidoMaterno
        ? (auxiliar.ApellidoMaterno = false)
        : (auxiliar.ApellidoMaterno = true);

      detalleSolicitud[0]?.NombreUsuario === detalleUsuario?.NombreUsuario
        ? (auxiliar.NombreUsuario = false)
        : (auxiliar.NombreUsuario = true);

      detalleSolicitud[0].CorreoElectronico === detalleUsuario.CorreoElectronico
        ? (auxiliar.CorreoElectronico = false)
        : (auxiliar.CorreoElectronico = true);

      detalleSolicitud[0].Puesto === detalleUsuario.Puesto
        ? (auxiliar.Puesto = false)
        : (auxiliar.Puesto = true);

      detalleSolicitud[0].Celular === detalleUsuario.Celular
        ? (auxiliar.Celular = false)
        : (auxiliar.Celular = true);

      detalleSolicitud[0].Curp === detalleUsuario.Curp
        ? (auxiliar.Curp = false)
        : (auxiliar.Curp = true);

      detalleSolicitud[0].Rfc === detalleUsuario.Rfc
        ? (auxiliar.Rfc = false)
        : (auxiliar.Rfc = true);

      detalleSolicitud[0].Telefono === detalleUsuario.Telefono
        ? (auxiliar.Telefono = false)
        : (auxiliar.Telefono = true);

      detalleSolicitud[0].Ext === detalleUsuario.Ext
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
    if (detalleSolicitud[0]?.NombreUsuario) checkCambios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detalleSolicitud[0]]);

  const [openDialogImpDoc, setOpenDialogImpDoc] = useState(false);
  const [openDialogModificar, setOpenDialogModificar] = useState(false);
  const [openDialogRechazar, setOpenDialogRechazar] = useState(false);
  const [openDialogAceptar, setOpenDialogAceptar] = useState(false);

  const [comentario, setComentario] = useState("");

  return (
    <Grid container item
      xl={12}
      xs={12}
      lg={12}
      md={12}
      sm={12} 
      sx={{ height: "100vh", width:"100vw", display: "flex", overflow: "auto" }}>
      <Header menuActual="Solicitudes"/>

      {/* <CommentsDialog
        open={openComments}
        close={handleCloseComments}
        solicitud={solicitudSeleccionada}
      /> */}

      <Grid container item
        xl={12}
        xs={12}
        lg={12}
        md={12}
        sm={12}
        justifyContent="center" height={"90vh"}>
        <Hidden>
          <Grid item xs={12} md={4} paddingLeft={0.4}>
            <FormControl
              sx={{
                width: "98%",
                bgcolor: "#fff",
                borderRadius: ".4vw",
                m: 2,
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

            <Grid
              sx={{
                width: "98%",
                height: "75vh",
                alignItems: "center",
                bgcolor: "#fff",
                boxShadow: "15",
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
                ml: 2,
                mr: 2,
              }}
            >
              <List component="nav" aria-label="main mailbox folders">
                <Divider />
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
                    return (
                      <Grid key={x}>
                        <ListItemButton
                          key={x}
                          onClick={() => {
                            itemSelected(x, item.Id);
                          }}
                          sx={{
                            pl: 2,
                            "&.Mui-selected ": {
                              backgroundColor: "#c4a57b",
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: "#cbcbcb",
                            },
                            backgroundColor:
                              item?.tipoSoli.toUpperCase() === "ALTA"
                                ? "#fbffae8a"
                                : item?.tipoSoli.toUpperCase() === "BAJA"
                                  ? "#ffbcbc6e"
                                  : item?.tipoSoli.toUpperCase() ===
                                    "MODIFICACION"
                                    ? "#c3e3ffa8"
                                    : "#dcffc8a1",
                          }}
                          selected={selectedIndex === x ? true : false}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{}}
                          >
                            <Grid item container xs={12}>
                              <Grid item xs={12} md={6}>
                                <Typography className="h6" color="text.primary">
                                  {"NOMBRE: "}
                                  <label className="textoNormal">
                                    {item.NombreUsuario.toUpperCase()}
                                  </label>
                                </Typography>
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <Typography className="h6" color="text.primary">
                                  {"FECHA: "}
                                  <label className="textoNormal">
                                    {moment(
                                      item.FechaDeCreacion,
                                      moment.ISO_8601
                                    )
                                      .format("DD/MM/YYYY HH:mm:SS")
                                      .toString()}
                                  </label>
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container item xs={12} md={6}>
                              <Typography className="h6" color="text.primary">
                                {"APLICACIÓN: "}
                                <label className="textoNormal">
                                  {item.AppNombre.toUpperCase()}
                                </label>
                              </Typography>
                            </Grid>

                            <Grid container item xs={12} md={6}>
                              <Typography className="h6" color="text.primary">
                                {"SOLICITANTE: "}
                                <label className="textoNormal">
                                  {item.NombreSolicitante.toUpperCase()}
                                </label>
                              </Typography>
                            </Grid>

                            <Grid container item xs={12} md={6}>
                              <Typography className="h6" color="text.primary">
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
          </Grid>
        </Hidden>

        <Hidden mdDown>
          <Grid
            container 
            item
            xs={12}
            md={8}
            paddingBottom={2}
            justifyContent="center"
            alignItems="center"
          >
            {solicitudes.length !== 0 ? (
              <Grid
                container
                direction="column"
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
                  bgcolor: COLOR.blanco,
                  m: 4,
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
                  detalleSolicitud[0].Nombre +
                  " " +
                  detalleSolicitud[0].ApellidoPaterno ? (
                  <Grid
                    container
                    p={3}
                    height={"100%"}
                    justifyContent="center"
                    alignItems={"flex-end"}
                  >
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
                    >
                      <Grid item container
                        xl={10}
                        xs={10}
                        lg={10}
                        md={10}
                        sm={10}
                        sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <Grid item>
                          <Button
                            className="aceptar"
                            variant="contained"
                            onClick={() => {
                              setOpenDialogAceptar(true);
                            }}
                          >
                            Aceptar
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            className="cancelar"
                            variant="contained"
                            onClick={() => {
                              setOpenDialogRechazar(true);
                            }}
                          >
                            Rechazar
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid justifyContent={"center"}>
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
        </Hidden>

        <Dialog
          open={openDialogRechazar}
          onClose={() => setOpenDialogRechazar(false)}
        >
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Seguro que desea rechazar la solicitud para{" "}
              {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
              {detalleSolicitud[0]?.Nombre +
                " " +
                detalleSolicitud[0]?.ApellidoPaterno}
              ?
            </DialogContentText>
            <TextField
              sx={{ width: "100%" }}
              label="Agregar comentario"
              placeholder="Agregue el motivo por el que se rechaza la solicitud"
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
              variant="contained"
              className="cancelar"
              onClick={() => {
                setOpenDialogRechazar(false);
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
                  "2",
                  solicitudesFiltered[selectedIndex]?.tipoSoli
                );
                setOpenDialogRechazar(false);
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
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
        </Dialog>

        <Dialog
          open={openDialogAceptar}
          onClose={() => setOpenDialogAceptar(false)}
        >
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Seguro que desea aceptar la solicitud de{" "}
              {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
              {detalleSolicitud[0]?.Nombre +
                " " +
                detalleSolicitud[0]?.ApellidoPaterno}{" "}
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
        >
          <DialogTitle>Descargar Documento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Desea descargar la solicitud de{" "}
              {solicitudesFiltered[selectedIndex]?.tipoSoli} de{" "}
              {detalleSolicitud[0]?.Nombre +
                " " +
                detalleSolicitud[0]?.ApellidoPaterno}
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
    </Grid>
  );
};

export default Solicitudes;
