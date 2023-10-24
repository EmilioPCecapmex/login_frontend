import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menus } from "../menus/Menus";
import { getRoles } from "./RolesServices";
import ButtonsAdd from "../../screens/Componentes/ButtonsAdd";
import { DialogRoles } from "./DialogRoles";
import Swal from "sweetalert2";
import axios from "axios";
import { alertaError, alertaExito } from "../alertas/toast";

export interface IRol {
  ControlInterno: string;
  Deleted: number;
  Descripcion: string;
  Id: string;
  Nombre: string;
}

const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];

export function Roles({
  open,
  closeModal,
  idApp,
  app,
}: {
  open: boolean;
  closeModal: Function;
  idApp: string;
  app: string;
}) {
  document.title = "Roles";

  const [roles, setRoles] = useState<Array<IRol>>([]);
  const [bandera, setBandera] = useState(false);

  const [openMenus, setOpenMenu] = useState(false);
  const [openDialogRoles, setOpenDialogRoles] = useState(false);
  const [movimiento, setMovimiento] = useState("Agregar");
  const [registroData, setRegistroData] = useState<IRol>({
    ControlInterno: "",
    Deleted: 0,
    Descripcion: "",
    Id: "",
    Nombre: "",
  });

  const [idRol, setIdRol] = useState("");
  const [rol, setRol] = useState("");

  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 175,
      headerAlign: "left",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Editar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setRegistroData(cellValues.row);
                  setMovimiento("Editar");
                  setOpenDialogRoles(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Editar Acceso a Menús"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  if (cellValues.row.Id) {setIdRol(cellValues.row.Id);}
                  if (cellValues.row.Nombre) {setRol(cellValues.row.Nombre);}
                  setOpenMenu(true);
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {handleDeleteBtnClick(cellValues);}}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 600,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "ControlInterno",
      headerName: "Control Interno",
      width: 500,
      hideable: false,
      headerAlign: "left",
    },
  ];

  useEffect(() => {
    if (!openDialogRoles) getRoles(idApp, setRoles, () => setBandera(true));
  }, [openDialogRoles]);


  const handleDeleteBtnClick = (cellValues: any) => {
   
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      icon: "question",
      showCancelButton: true,
      
      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {...cellValues.row,  IdUsuario: localStorage.getItem("IdUsuario") || "",IdApp: idApp, };
        axios({
          method: "delete",
          url: process.env.REACT_APP_APPLICATION_DEV + `/api/rol`,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          data: data,
        })
          .then(function (response) {
            alertaExito(()=>{},"¡Registro eliminado!");
            getRoles(idApp, setRoles, () => setBandera(true));
          })
          .catch(function (error) {
            alertaError();
          });
      }
    });
  };

  return (
    <Dialog open={open} fullScreen>
      {!bandera ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "90",
          }}
        >
          <CircularProgress size={300} />
        </Box>
      ) : (
        <Grid container sx={{ width: "100vw", height: "100vh" }}>
          <Grid
            container
            item
            xl={12}
            sx={{
              height: "10%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              border: "1px solid"
              // bgcolor: "#c4a57b",
            }}
          >
            <Grid
              item
              xl={10}
              xs={10}
              lg={10}
              md={10}
              sm={10}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <Typography
                fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}>

                Roles
              </Typography>
            </Grid>
            <Grid
              item
              xl={1}
              xs={1}
              lg={1}
              md={1}
              sm={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <Tooltip title={"Salir"}>
                <IconButton
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <CloseIcon sx={{
                    fontSize: [30,30,30,40,40]
                  }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xl={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "85%",

            }}
          >
            <Grid sx={{ height: "100%", width: "100%" }}>
              {/* este box es la leyenda que se encuentra arriba a la izquierda */}

              <Grid
                container
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",

                }}
              >
                {/* <Grid
                  item
                  xl={2}
                  xs={2}
                  md={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                  }}

                >
                  <AppsIcon sx={{
                  fontSize: '24px', // Tamaño predeterminado del icono
                  '@media (max-width: 600px)': {
                    fontSize: 30, // Pantalla extra pequeña (xs y sm)
                  },
                  '@media (min-width: 601px) and (max-width: 960px)': {
                    fontSize: 30, // Pantalla pequeña (md)
                  },
                  '@media (min-width: 961px) and (max-width: 1280px)': {
                    fontSize: 40, // Pantalla mediana (lg)
                  },
                  '@media (min-width: 1281px)': {
                    fontSize: 40, // Pantalla grande (xl)
                  },
                }} />
                </Grid> */}

                <Grid
                  item
                  xl={8}
                  xs={8}
                  md={8}
                  sx={{
                    height: "10vh",
                    maxHeight: "10vh",
                    overflow: "clip",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",


                  }}

                >
                  <Tooltip
                    //sx={{ fontFamily: "Montserrat-Bold"}}

                    title={app}>
                    <Typography
                     fontFamily={"'Montserrat', sans-serif"}
                     sx={{
                       whiteSpace: "nowrap",
                       overflow: "hidden",
                       textOverflow: "ellipsis",
                       textAlign: "center",
                       fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                       color: "#AF8C55"
                     }}
                    >
                      {app}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid
                  item
                  xl={2}
                  xs={2}
                  md={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ButtonsAdd
                    handleOpen={() => {
                      setMovimiento("Agregar");
                      setOpenDialogRoles(true);
                    }}
                    agregar={true}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  height: "88%",
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: "2vh",
                }}
              >
                  <MUIXDataGrid
                    id={Math.random}
                    columns={columns}
                    rows={roles}
                    camposCsv={camposCsv}
                  />
              </Box>
            </Grid>
          </Grid>

        </Grid>
      )}
      {openMenus && (
        <Menus
          open={openMenus}
          closeModal={() => {
            setOpenMenu(false);
          }}
          idRol={idRol}
          rol={rol}
          idApp={idApp}
        />
      )}
      {openDialogRoles && (
        <DialogRoles
          open={openDialogRoles}
          closeDialog={setOpenDialogRoles}
          reloadData={registroData}
          movimiento={movimiento}
          IdApp={idApp}
        />
      )}
    </Dialog>
  );
}


