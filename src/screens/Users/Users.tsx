import {
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import {
  Box,
  Button,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Switch,
  Tooltip,
  Typography,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppsDialog } from "../../components/appsDialog";
import { Header } from "../../components/header";
import { NewDialog } from "../../components/newDialog";
import { isAdmin, sessionValid } from "../../funcs/validation";
import "./style/Fonts.css";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { alertaExito, alertaInformativa } from "../../components/alertas/toast";
import { IApps } from "../SolicitudDeUsuarios/SolicitudUsuario";

export interface Usuario {
  EstaActivoLabel: string;
  Id: string;
  EstaActivo: number;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  Curp: string;
  Rfc: string;
  Telefono: string;
  Celular: string;
  IdTipoUsuario: string;
  CreadoPor: string;
  ModificadoPor: string;
  NombreCreadoPor: string;
  NombreModificadoPor: string;
  PuedeFirmar: number;
}

export default function Users() {
  const navigate = useNavigate();
  const camposCsv = [
    "Nombre",
    "ApellidoPaterno",
    "ApellidoMaterno",
    "NombreUsuario",
    "CorreoElectronico",
    "EstaActivoLabel",
  ];

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
  });
  const [rows, setRows] = useState<Array<IUsuarios>>([]);

  const [showAllUsers, setShowAllUsers] = useState(false);

  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const handleNewDialogClose = (changed: boolean) => {
    if (changed === true) {
      Toast.fire({
        icon: "success",
        title: "¡Usuario Creado!",
        iconColor: "#af8c55",
        color: "#af8c55",
      });
      getAllUsers();
    }
    setNewDialogOpen(false);
  };

  const getDatosDocumento = (nombreUsuario = "", nombre = "") => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/docSolicitudUsuario", {
        params: {
          NombreUsuario: nombreUsuario,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        responseType: "blob",
      })
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
            : `${nombre.toUpperCase()}.pdf`;

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

  const sendCredentials = (NombreUsuario: string, Correo: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_DEV + "/api/reesend-credentials",
        { NombreUsuario: NombreUsuario, Correo: Correo },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        alertaExito(() => {}, "Se envio el correo.");
      });
  };
  const [appsDialogOpen, setAppsDialogOpen] = useState(false);
  const [appsDialogUsuario, setAppsDialogUsuario] = useState<Usuario>();
  const [idApp, setIdApp] = useState("");
  const [selectedAppId, setSelectedAppId] = useState("");

  const handleAppsDialogOpen = () => setAppsDialogOpen(true);

  const handleAppsBtnClick = (event: any, cellValues: any) => {
    setAppsDialogUsuario(cellValues.row);
    handleAppsDialogOpen();
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      isAdmin().then((r) => {
        if (r < 0) {
          navigate("../");
        }
      });
      sessionValid().then((r) => {
        if (localStorage.getItem("validation") === "true") {
        } else {
          navigate("../");
        }
      });
    } else {
      navigate("../");
    }
    // eslint-disable-next-line
  }, []);

  const [apps, setApps] = useState<Array<IApps>>([]);

  const getAllUsers = () => {
    console.log("selectedAppId: en el axios ",selectedAppId);
    
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/users",
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        IdApp: selectedAppId,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(function (response) {
        let rows = response.data.data.map((row: any) => {
          const estaActivoLabel = row.EstaActivo ? "Activo" : "Inactivo";
          const rowTemp = { EstaActivoLabel: estaActivoLabel, ...row };
          return rowTemp;
        });

        if (!showAllUsers) {
          rows = rows?.filter((x: { EstaActivoLabel: string | string[] }) =>
            x.EstaActivoLabel.includes("Activo")
          );
        }
        if (selectedAppId !== "") {
          console.log("Entre en el if");
          
          setRows(rows);
        } else {
          console.log("Entre en el else");
          setRows(rows);
        }

        setTimeout(() => {
          getAllUsers();
        }, 60000);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" +
            error?.response?.status +
            ") " +
            error?.response?.data?.message,
        }).then((r) => navigate("../"));
      });
  };

  const getAllApps = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/apps", {
        params: { IdUsuario: localStorage.getItem("IdUsuario") },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((response) => {
        
        setApps(response.data.data);
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
    getAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllUsers]);

  useEffect(() => {
    getAllApps();
    // setSelectedAppId(apps.Nombre[0])
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idUsuario, setIdUsuario] = useState("");

  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      headerAlign: "center",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip
              title={"Descargar solicitud - " + cellValues.row.NombreUsuario}
            >
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  alertaInformativa("Obteniendo información.");
                  getDatosDocumento(
                    cellValues.row.NombreUsuario,
                    cellValues.row.Nombre +
                      " " +
                      cellValues.row.ApellidoPaterno +
                      " " +
                      cellValues.row.ApellidoMaterno
                  );
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Editar - " + cellValues.row.NombreUsuario}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setIdApp("");
                  handleAppsBtnClick(event, cellValues);
                  setIdUsuario(cellValues.row.Id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                "enviar correo de acceso a " + cellValues.row.NombreUsuario
              }
            >
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  Swal.fire({
                    icon: "info",
                    title: "Mensaje",
                    iconColor: "#af8c55",
                    color: "#af8c55",
                    text: `¿Está seguro de que desea reenviar las credenciales de ${
                      cellValues?.row?.Nombre +
                      " " +
                      cellValues?.row?.ApellidoPaterno +
                      " " +
                      cellValues?.row?.ApellidoMaterno
                    } ? Esta acción generará una nueva contraseña que se enviará al usuario.`,
                    showCloseButton: true,
                    showCancelButton: true, // Muestra el botón de cancelar
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#15212f",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#AF8C55",
                  }).then((result) => {
                    // Handle the result after the user clicks on Aceptar or Cancelar
                    if (result.isConfirmed) {
                      sendCredentials(
                        cellValues?.row?.NombreUsuario,
                        cellValues?.row?.CorreoElectronico
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      // Código para la lógica cuando el usuario hace clic en Cancelar
                    }
                  });
                }}
              >
                <ForwardToInboxIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 200,
      hideable: false,
      headerAlign: "center",
    },
    {
      field: "ApellidoPaterno",
      headerName: "Apellido Paterno",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "ApellidoMaterno",
      headerName: "Apellido Materno",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "NombreUsuario",
      headerName: "Nombre Usuario",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "CorreoElectronico",
      headerName: "Correo Electrónico",
      width: 300,
    },
    {
      field: "NombreCreadoPor",
      headerName: "Creador",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "NombreModificadoPor",
      headerName: "Actualizado Por",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "EstaActivoLabel",
      headerName: "Estatus",
      width: 110,
      headerAlign: "center",
    },
  ];

  useEffect(() => {
    if (idApp !== "") {
      setNewDialogOpen(true);
    }
  }, [idApp]);

 

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Header menuActual="Usuarios" />

      <Grid sx={{ height: "84vh", width: "100vw" }}>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100vw"}
          sx={{
            height: "12%",
            "@media (min-width: 480px)": {
              height: "14%",
            },
            "@media (min-width: 768px)": {
              height: "11.5%",
            },
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Menu actual: Usuarios">
              <CardContent>
                <PeopleAltIcon
                  sx={{ color: "#AF8C55", fontSize: [30, 30, 30, 40, 40] }}
                />
              </CardContent>
            </Tooltip>

            <Typography
              fontFamily={"'Montserrat', sans-serif"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
                fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                color: "#AF8C55",
              }}
            >
              Usuarios
            </Typography>
          </Grid>

          <Grid item xl={4}>
            <InputLabel
              variant="standard"
              sx={{ fontFamily: "MontserratMedium" }}
            >
              Aplicación
            </InputLabel>
            <FormControl required  fullWidth>
              <Select
                value={selectedAppId}
                label="Aplicación"
                onChange={(e) => {
                  setSelectedAppId(e.target.value)
                  getAllUsers()
                  
                }}
              >
                {apps.map((app) => (
                  <MenuItem key={app.Id} value={app.Id}>
                    {app.Nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <CardContent
            sx={{
              "@media (min-width: 480px)": {
                flexDirection: "column",
              },
              "@media (min-width: 768px)": {
                flexDirection: "row",
                display: "flex",
              },
            }}
          >
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(v) => setShowAllUsers(v.target.checked)}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: ".7rem",
                        "@media (min-width: 480px)": {
                          fontSize: ".7rem",
                        },
                        "@media (min-width: 768px)": {
                          fontSize: "1rem",
                        },
                      }}
                    >
                      Usuarios Inactivos
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>

            <Grid>
              <Button
                className="aceptar"
                variant="text"
                onClick={() => {
                  setIdApp("");
                  setIdUsuario("");
                  setNewDialogOpen(true);
                }}
                sx={{
                  fontFamily: "MontserratBold",
                  backgroundColor: "#DFA94F",
                  color: "#000001",
                  boxShadow: 4,
                }}
                startIcon={<PersonAddIcon />}
              >
                <Typography
                  sx={{
                    fontSize: ".7rem",
                    "@media (min-width: 480px)": {
                      fontSize: ".7rem",
                    },
                    "@media (min-width: 768px)": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  Registrar Usuario
                </Typography>
              </Button>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          <MUIXDataGrid
            id={(row: any) => row.Id}
            columns={columns}
            rows={rows}
            camposCsv={camposCsv}
            exportTitle={"Catálogo de Usuarios"}
          />
        </Grid>
      </Grid>
      {newDialogOpen ? (
        <NewDialog
          newDialogOpen={newDialogOpen}
          handleNewDialogClose={handleNewDialogClose}
          idUsuario={idUsuario}
          idApp={idApp}
        />
      ) : null}

      {appsDialogOpen ? (
        <AppsDialog
          appsDialogOpen={appsDialogOpen}
          handleAppsDialogClose={() => {
            setAppsDialogOpen(false);
          }}
          usuario={appsDialogUsuario}
          setIdApp={setIdApp}
        />
      ) : null}
    </Grid>
  );
}

export interface IUsuarios {
  EstaActivoLabel: string;
  Id: string;
  EstaActivo: number;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  CreadoPor: string;
  ModificadoPor: string;
}

export const imprimirSolicitud = (datos: any) => {
  const objeto = {
    Fecha: datos?.Fecha,
    TipoDeMovimiento: datos?.TipoDeMovimiento,
    Nombre: datos?.Nombre,
    ApellidoPaterno: datos?.ApellidoPaterno,
    ApellidoMaterno: datos?.ApellidoMaterno,
    NombreUsuario: datos?.NombreUsuario,
    Correo: datos?.Correo,
    CURP: datos?.CURP,
    RFC: datos?.RFC,
    Telefono: datos?.Telefono,
    Extension: datos?.Extension,
    Celular: datos?.Celular,
    Tipo: datos?.TpoUsuario,
    Plataforma: datos?.AccesoApp,
    Puesto: datos?.Puesto,
    Estado:
      datos?.Estatus === 0
        ? "PENDIENTE"
        : datos?.Estatus === 1
        ? "ACEPTADA"
        : datos?.Estatus === 2
        ? "RECHAZADA"
        : datos?.Estatus === 3
        ? "SE SOLICITO MODIFICACIÓN"
        : "SE DESCONOCE",
  };
  let dataArray = new FormData();
  dataArray.append("data", JSON.stringify(objeto));
  axios
    .post(
      process.env.REACT_APP_APPLICATION_GENERASOLICITUD +
        "/api/generasolicitud",
      dataArray,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      }
    )
    .then((r) => {
      const a = window.URL || window.webkitURL;

      const url = a.createObjectURL(
        new Blob([r.data], { type: "application/pdf" })
      );

      let link = document.createElement("a");

      link.setAttribute(
        "download",
        `Solicitud ${datos?.TipoDeMovimiento}-${datos?.NombreUsuario}.pdf`
      );
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
    })
    .catch((r) => {});
};
