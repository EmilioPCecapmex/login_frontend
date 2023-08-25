import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { NewDialogApp } from "../../components/newApp";
import { EditDialogApp } from "../../components/editApp";
import MUIXDataGridApp from "../../components/MUIXDataGridApp";
import { Header } from "../../components/header";
import AppsIcon from "@mui/icons-material/Apps";
import { TimerCounter } from "../../components/timer/timer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Roles } from "../../components/Roles/Roles";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Perfiles } from "../../components/perfiles/Perfiles";

// estructura que se va a llenar con la informacion que regresa el endpoint
// tiene que tener el mismo nombre que regresa el endpoint
export interface AppInterface {
  Id: string;
  Nombre: string;
  Path: string;
  EstaActivo: number;
  estatusLabel: string;
  //  Deleted: string;
}

//componente de sweetalert2 para el uso de los mensajes de alertas
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function CatApps() {
  const navigate = useNavigate();
  //Roles
  const [openRoles, setOpenRoles] = useState(false);
  const [openPerfiles, setOpenPerfiles] = useState(false);
  const [idApp, setIdApp] = useState("");
  const [app, setApp] = useState("");
  // Set columns and rows for DataGrid
  const columns = [
    // primer columna del grid donde ponemos los botones de editar y eliminar
    {
      field: "acciones",
      headerName: "Acciones",
      width: 200,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Editar App " 
            //+ cellValues.row.Nombre
            }>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  handleEditBtnClick(event, cellValues);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Administrar perfiles  "
            // + cellValues.row.Nombre
             }>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setOpenPerfiles(!openPerfiles);
                  setIdApp(cellValues?.row?.Id);
                  setApp(cellValues?.row?.Nombre);
                }}
              >
                <PortraitIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Administrar roles " 
            //+ cellValues.row.Nombre
            }>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  setOpenRoles(!openRoles);
                  setIdApp(cellValues?.row?.Id);
                  setApp(cellValues?.row?.Nombre);
                }}
              >
                <ManageAccountsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar App " 
            //+ cellValues.row.Nombre
            }>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  handleDeleteBtnClick(event, cellValues);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    // segunda columna donde se mostrara el nombre
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 550,
      hideable: false,
      headerAlign: "center",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 600,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Path",
      headerName: "Ruta",
      width: 300,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "estatusLabel",
      headerName: "Estatus",
      width: 100,
      headerAlign: "center",
    },
  ];
  const [rows, setRows] = useState([]);

  // Set Edit App Dialog vars and functions
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogApp, setEditDialogApp] = useState<AppInterface>();
  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = (changed: boolean) => {
    if (changed === true) {
      Toast.fire({
        icon: "success",
        title: "¡Aplicación Editada!" ,
      });
      getAllApps();
    }
    setEditDialogOpen(false);
  };
  const handleEditBtnClick = (event: any, cellValues: any) => {
    setEditDialogApp(cellValues);
    handleEditDialogOpen();
  };

  // Set New App dialog vars and functions
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const handleNewDialogOpen = () => setNewDialogOpen(true);
  const handleNewDialogClose = (changed: boolean) => {
    if (changed === true) {
      Toast.fire({
        icon: "success",
        iconColor: "#af8c55",
        title: "Aplicación Creada Exitosamente",
        color: "#af8c55",
      });
      getAllApps();
    }
    setNewDialogOpen(false);
  };
  const handleNewBtnClick = (event: any) => {
    handleNewDialogOpen();
  };

  // Handle delete App
  const handleDeleteBtnClick = (event: any, cellValues: any) => {
    Swal.fire({
      title: "¿Estás seguro(a) de eliminar este registro?",
      //Estas a punto de eliminar un registro
      text: ` ${cellValues.row.Nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { IdApp: cellValues.row.Id };
        axios({
          method: "delete",
          url: process.env.REACT_APP_APPLICATION_DEV + `/api/app`,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          data: data,
        })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              iconColor: "#af8c55",
              title: "Aplicación Eliminada Exitosamente",
              color: "#af8c55",
            });
            getAllApps();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              iconColor: "#af8c55",
              title: "Mensaje",
              color: "#af8c55",
              text:
                "(" + error.response.status + ") " + error.response.data.msg,
            });
          });
      }
    });
  };

  // aqui es el consumo del endpoint para obtener el listado de app de la base de datos
  const getAllApps = () => {
    axios({
      // params:{
      //   IdUsuario: localStorage.getItem('IdUsuario')
      // },
      method: "get",
      url: process.env.REACT_APP_APPLICATION_DEV + "/api/apps",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(function (response) {
        const rows = response.data.data.map((row: any) => {
          const estatusLabel = row.EstaActivo ? "Activo" : "Inactivo";
          const rowTemp = { estatusLabel: estatusLabel, ...row };
          // const Deleted = row.Deleted;
          return rowTemp;
        });
        setRows(rows);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        }).then((r) => navigate("/config"));
      });
  };

  // esto es solo para que se ejecute la rutina de obtieneaplicaciones cuando cargue la pagina
  useEffect(() => {
    getAllApps();
  }, []);

  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      {/* no se que es esto de la linea de arriba pero si lo quito no funciona*/}
      {/* este box es solo para que muestre la barra de arriba gris con las opciones */}

      <Header />

      {/* esta configuracion es del box que va a contener el card principal*/}
      <Grid
        sx={{
          height: "88%", // aqui va 90vh
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
        <Card sx={{ height: "80%", width: "95%", boxShadow: 10 }}>
          {/* este box es la leyenda que se encuentra arriba a la izquierda */}
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "10%",
            }}
          >
            <Grid container xl={4} xs={4} md={4}
              width={"100%"}
              sx={{ display: "flex" }}
            >
              <AppsIcon sx={{ fontSize: "50px" }} />
              <Typography
                sx={{ display: "flex", alignItems: "center", fontSize: "25px" }}
              >
                Catálogo de aplicaciones registradas.
              </Typography>
            </Grid>
            <Grid  xl={2}>
              <Button
                className="aceptar"
                variant="text"
                onClick={(event) => handleNewBtnClick(event)}
                sx={{
                  
                  fontFamily: "MontserratBold",
                  backgroundColor: "#DFA94F",
                  color: "#000001",
                  fontSize: "10px",
                  boxShadow: 4,
                }}
                startIcon={<AddIcon />}
              >
                registrar aplicación
              </Button>
            </Grid>

            {/* <Grid container item justifyContent="flex-end">
              
            </Grid> */}
          </Grid>
          {/* aqui es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
          <CardContent>
            {/* boton a la derecha para agregar una aplicacion nueva */}

            {/* Grid del listado,aqui se asigna el id unico que tiene que tener cada renglon, asi que asignamos el campo ID que se obtiene del endpoint */}
            <MUIXDataGridApp
              id={(row: any) => row.Id}
              columns={columns}
              rows={rows}
            />
          </CardContent>
        </Card>
      </Grid>
      {newDialogOpen && (
        <NewDialogApp
          newDialogOpen={newDialogOpen}
          handleNewDialogClose={handleNewDialogClose}
        />
      )}
      {editDialogOpen && (
        <EditDialogApp
          editDialogOpen={editDialogOpen}
          handleEditDialogClose={handleEditDialogClose}
          app={editDialogApp}
        />
      )}
      {openRoles && (
        <Roles
          open={openRoles}
          closeModal={() => setOpenRoles(false)}
          idApp={idApp}
          app={app}
        />
      )}
      {openPerfiles && (
        <Perfiles
          open={openPerfiles}
          closeModal={() => setOpenPerfiles(false)}
          idApp={idApp}
          app={app}
        />
      )}
    </Grid>
  );
}
