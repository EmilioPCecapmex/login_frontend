import {
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import { AppsDialog } from "../../components/appsDialog";
import { Header } from "../../components/header";
import { NewDialog } from "../../components/newDialog";
import { isAdmin, sessionValid } from "../../funcs/validation";
import { SolicitudModificarUsuario } from "../SolicitudDeUsuarios/SolicitudModificarUsuario";
import "./style/Fonts.css";

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
        title: "Usuario Creado Exitosamente",
      });
      getAllUsers();
    }
    setNewDialogOpen(false);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // const [editDialogUsuario, setEditDialogUsuario] = useState<Usuario>();
  // const handleEditDialogOpen = () => setEditDialogOpen(true);

  const handleEditDialogClose = (changed: boolean) => {
    if (changed === true) {
      Toast.fire({
        icon: "success",
        title: "Cambios realizados exitosamente",
      });
      getAllUsers();
    }
    setEditDialogOpen(false);
  };

  // const handleEditBtnClick = (event: any, cellValues: any) => {
  //   setEditDialogUsuario(cellValues.row);
  //   handleEditDialogOpen();
  // };

  const getDatosDocumento = (nombreUsuario: any) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_DEV + "/api/docSolicitudUsuario", {
        params: {
          NombreUsuario: nombreUsuario,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200 && r.data.result[0].length !== 0) {
          imprimirSolicitud(r.data.result[0][0]);
        } else {
          Toast.fire({
            icon: "error",
            title: "No se encontro solicitud!",
          });
        }
      });
  };

  const [appsDialogOpen, setAppsDialogOpen] = useState(false);
  const [appsDialogUsuario, setAppsDialogUsuario] = useState<Usuario>();
  const handleAppsDialogOpen = () => setAppsDialogOpen(true);

  const handleAppsDialogClose = (changed: boolean) => {
    if (changed === true) {
      Toast.fire({
        icon: "success",
        title: "Plataformas de usuario actualizadas exitosamente",
      });
      getAllUsers();
    }
    setAppsDialogOpen(false);
  };

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

  const getAllUsers = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/users",
      params: { IdUsuario: localStorage.getItem("IdUsuario") },
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

        setRows(rows);
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

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllUsers]);

  const [idUsuario, setIdUsuario] = useState("");
  const [idApp, setIdApp] = useState("");

  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      //headerAlign: "center",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip
              title={"Descargar solicitud - " + cellValues.row.NombreUsuario}
            >
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  getDatosDocumento(cellValues.row.NombreUsuario);
                  //imprimirDocumento(event, cellValues);
                  // handleAppsBtnClick(event, cellValues);
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Editar - " + cellValues.row.NombreUsuario}>
              <IconButton
                sx={{ color: "black" }}
                // onClick={(event) => {
                //   handleEditBtnClick(event, cellValues);
                // }}
                onClick={(event) => {
                  setIdApp("");
                  handleAppsBtnClick(event, cellValues);
                  setIdUsuario(cellValues.row.Id);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title={"Visualizar acceso a plataformas"}>
              <IconButton
                sx={{color:"black"}}
                onClick={(event) => {
                  handleAppsBtnClick(event, cellValues);
                }}
              >
                <AccountTreeIcon />
              </IconButton>
            </Tooltip> */}
          </Box>
        );
      },
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 150,
      hideable: false,
      //headerAlign: "center",
    },
    {
      field: "ApellidoPaterno",
      headerName: "Apellido Paterno",
      width: 150,
      //headerAlign: "center",
    },
    {
      field: "ApellidoMaterno",
      headerName: "Apellido Materno",
      width: 150,
      //headerAlign: "center",
    },
    {
      field: "NombreUsuario",
      headerName: "Nombre Usuario",
      width: 150,
      //headerAlign: "center",
    },
    {
      field: "CorreoElectronico",
      headerName: "Correo Electrónico",
      width: 300,
      // headerAlign: "center",
    },
    {
      field: "NombreCreadoPor",
      headerName: "Creador",
      width: 150,
      //headerAlign: "center",
    },
    {
      field: "NombreModificadoPor",
      headerName: "Actualizado Por",
      width: 150,
      // headerAlign: "center",
    },
    {
      field: "EstaActivoLabel",
      headerName: "Estatus",
      width: 100,
      //headerAlign: "center",
    },
  ];

  useEffect(() => {
    if (idApp !== "") {
      setNewDialogOpen(true);
    }
  }, [idApp]);

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Header />

      <Box
        sx={{
          height: "88vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Card
            sx={{
              height: "82vh",
              width: "90vw",
              boxShadow: 10,
              "@media (min-width: 480px)": {
                width: "90vw",
              },

              "@media (min-width: 768px)": {
                width: "90vw",
              },

              "@media (min-width: 1140px)": {
                width: "90vw",
              },

              "@media (min-width: 1400px)": {
                width: "90vw",
              },

              "@media (min-width: 1870px)": {
                width: "90vw",
              },
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  container
                  xs={12}
                  md={6}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <PeopleAltIcon />
                  <Typography className="h6">
                    Listado de usuarios con acceso a plataformas.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} justifyContent="flex-end">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={(v) => setShowAllUsers(v.target.checked)}
                        />
                      }
                      label={
                        <Typography className="h5">
                          Usuarios Inactivos
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Grid>
            <div>
              <MUIXDataGrid
                id={(row: any) => row.Id}
                columns={columns}
                rows={rows}
              />
            </div>
          </Card>
        </Box>
        <NewDialog
          newDialogOpen={newDialogOpen}
          handleNewDialogClose={handleNewDialogClose}
          idUsuario={idUsuario}
          idApp={idApp}
        />

        {/* (
          <EditDialog
            editDialogOpen={editDialogOpen}
            handleEditDialogClose={handleEditDialogClose}
            usuario={editDialogUsuario}
          />
        ) */}
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
        {/* {appsDialogOpen ? (
          <AppsDialog
            appsDialogOpen={appsDialogOpen}
            handleAppsDialogClose={handleAppsDialogClose}
            usuario={appsDialogUsuario}
          />
        ) : null} */}
      </Box>
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
