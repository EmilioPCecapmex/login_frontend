import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import moment from 'moment'

export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([]);

  const [solicitudesFiltered, setSolicitudesFiltered] =
    useState<Array<ISolicitud>>(solicitudes);

  const [detalleSolicitud, setDetalleSolicitud] = useState<
    Array<IDetalleSolicitud>
  >([]);

  const [apps, setApps] = useState<Array<IApps>>([]);

  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");

  const [openComments, setOpenComments] = useState(false);
  const handleCloseComments = () => {
    setOpenComments(false);
  };

  const filtroXApp = (x:string) => {
    if(x === ""){
        setSolicitudesFiltered(solicitudes)
    }else{
        setSolicitudesFiltered(solicitudes.filter((item) => item.IdApp === x))
    }
  }

  const getApps = () => {
    axios
      .get("http://10.200.4.105:5000/api/apps", {
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

  const getSolicitudes = () => {
    axios
      .get("http://10.200.4.200:5000/api/solicitudes", {
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
      .get("http://10.200.4.200:5000/api/detalleSol", {
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

  useEffect(() => {
    getApps();
    getSolicitudes();
  }, []);

  const navigate = useNavigate();
  //registro seleccionado
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //filtrado port aplicacion
  const [appSelectedIndex, setAppSelectedIndex] = useState("");

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
  });

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
    getDetalleSolicitud();
  }, [selectedIndex]);

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
      <CommentsDialog open={openComments} close={handleCloseComments} solicitud={solicitudSeleccionada}/>
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
                <InputLabel><Typography sx={{fontFamily: 'MontserratBold'}}>
                Filtro por aplicación
                    </Typography></InputLabel>
                <Select value={appSelectedIndex} label="Filtar---por---aplicacion" onChange={(c) => filtroXApp(c.target.value)}>
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
                  return (
                    <Box key={x}>
                      <ListItemButton
                        key={x}
                        onClick={() => {
                          {
                            itemSelected(x, item.Id);
                            // setSelectedIndex(x);
                            // setSolicitudSeleccionada(item.Id);
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

                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                               <Box sx={{display: 'flex', width: '60%'}}>
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
                                    fontSize: ".9rem",
                                  }}
                                >
                                  {item.NombreUsuario.toUpperCase()}
                                </Typography>
                                    </Box>
                               
                               <Box sx={{display: 'flex', width:'40%', justifyContent: 'flex-end'}}>
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
                                
                                <Box sx={{display: 'flex'}}>
                                  <Typography
                                  sx={{
                                    display: "inline",
                                    fontFamily: "MontserratSemiBold",
                                  }}
                                  color="text.primary"
                                >
                                  {"APLICACIÓN:"}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "MontserratMedium",
                                    ml: 1,
                                    fontSize: ".9rem",
                                  }}
                                >
                                  {item.AppNombre.toUpperCase()}
                                </Typography>
                               </Box>

                               <Box sx={{display: 'flex'}}>
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
                                    fontSize: ".9rem",
                                  }}
                                >
                                  {item.NombreSolicitante.toUpperCase()}
                                </Typography>
                               </Box>

                               <Box sx={{display: 'flex'}}>
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
                                    fontSize: ".9rem",
                                  }}
                                >
                                  {item.tipoSoli.toUpperCase()}
                                </Typography>
                               </Box>
                           
                              
                             
                               
                              
                             
                              </Box>

                      </ListItemButton>
                      <Divider />
                    </Box>
                  );
                })}
              </List>
            </Box>
          </Box>

          {solicitudes.length != 0 ? (
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
                {/* Id: "3",
                            IdUsuario: "687456444958566474",
                            DatosAdicionales: "Ut consequat semper viverra nam libero justo. Magna sit amet purus gravida quis blandit. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Morbi enim nunc faucibus a pellentesque sit amet. Nibh nisl condimentum id venenatis. Mauris vitae ultricies leo integer malesuada nunc vel risus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Adipiscing elit pellentesque habitant morbi tristique. Magna etiam tempor orci eu lobortis. Fames ac turpis egestas sed tempus. Volutpat lacus laoreet non curabitur gravida. Augue eget arcu dictum varius duis at consectetur. Nunc consequat interdum varius sit amet mattis",
                            Estatus: "0",
                            TipoSolicitud: "Nunc consequat interdum",
                            CreadoPor: "Proin fermentum leo vel orci porta non. Eu ultrices vitae auct",
                            FechaDeCreacion: "XX/XX/XXXX",
                            UltimaModificacion: "XX/XX/XXXX",
                            ModificadoPor: "Ut consequat semper viverra nam libero justo",
                            IdApp: "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" */}

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
                        sx={{ width: "100%", height: "80%", opacity: "20%" }}
                      />
                      <Typography sx={{ fontFamily: "MontserratSemiBold" }}>
                        Sin información
                      </Typography>
                      <Typography sx={{ fontFamily: "MontserratSemiBold" }}>
                        Seleccione un registro para visualizar la información
                      </Typography>
                    </Box>
                  ) : (
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
                              width: "32.5%",
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
                            value={moment(detalleSolicitud[0]?.FechaDeCreacion, moment.ISO_8601)
                                    .format("DD/MM/YYYY HH:mm:SS")
                                    .toString()
                            }
                            variant="standard"
                          />

                          <Box sx={{ width: "4%" }}>
                            <IconButton onClick={() => setOpenComments(true)}>
                              <CommentIcon fontSize="large" />
                            </IconButton>
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
                            }}
                            value={detalleSolicitud[0]?.Nombre || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.ApellidoPaterno || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.ApellidoMaterno || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.NombreUsuario || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.CorreoElectronico || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.Celular || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.Curp || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.Rfc || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.Telefono || ""}
                            variant="standard"
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
                            }}
                            value={detalleSolicitud[0]?.Ext || ""}
                            variant="standard"
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
                            justifyContent: "flex-end",
                          }}
                        >
                          <Box
                            sx={{ display: "flex", width: "10%", mr: "8vw" }}
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
                          <Box
                            sx={{
                              display: "flex",
                              width: "40%",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Button variant="contained" color="error">
                              Rechazar
                            </Button>
                            <Button variant="contained" color="primary">
                              Aceptar
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
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
    </Box>
  );
};

export default Solicitudes;
