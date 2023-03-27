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
import AppsIcon from '@mui/icons-material/Apps';
import { TimerCounter } from "../../components/timer/timer";

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
  position: "bottom-end",
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
  // Set columns and rows for DataGrid
  const columns = [
    // primer columna del grid donde ponemos los botones de editar y eliminar
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Editar App " + cellValues.row.Nombre}>
              <IconButton
                color="primary"
                onClick={(event) => {
                  handleEditBtnClick(event, cellValues);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar App " + cellValues.row.Nombre}>
              <IconButton
                color="error"
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
      width: 400,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Path",
      headerName: "Ruta",
      width: 350,
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
    // // quinta columna deleted
    // {
    //   field: "Deleted",
    //   headerName: "Eliminada",
    //   width: 100,
    //   headerAlign: "center",
    //   //hide: true,
    // },
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
        title: "Aplicación actualizada exitosamente",
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
        title: "Aplicación Creada Exitosamente",
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
      title: "Estas Seguro(a)?",
      text: `Estas a punto de eliminar un registro (${cellValues.row.Nombre})`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0d6efd",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        const data = { IdApp: cellValues.row.Id };
        axios({
          method: "delete",
          url: process.env.REACT_APP_APPLICATION_DEV +`/api/app`,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          data: data,
        })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Aplicación Eliminada Exitosamente",
            });
            getAllApps();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Mensaje",
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
          text: "(" + error.response.status + ") " + error.response.data.message,
        }).then((r) => navigate("/config"));
      });
  };

  // esto es solo para que se ejecute la rutina de obtieneaplicaciones cuando cargue la pagina
  useEffect(() => {
    getAllApps();
  },[]);

  return (
    <>
      {/* no se que es esto de la linea de arriba pero si lo quito no funciona*/}
      {/* este box es solo para que muestre la barra de arriba gris con las opciones */}
      <Box>
        <Header />
      </Box>
      <Box >
        <TimerCounter />
      </Box>
      
      {/* esta configuracion es del box que va a contener el card principal*/}
      <Box
        sx={{
          height: "87vh",// aqui va 90vh
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
        <Card sx={{ height: "80vh", width: "80vw", boxShadow: 10 }}>
          {/* este box es la leyenda que se encuentra arriba a la izquierda */}
          <Box sx={{ p: 2 }}>
            <Typography
              sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw" }}
            >
              <AppsIcon fontSize="large"/>
            </Typography>
            <Typography className="h5"
            >
              Catálogo de aplicaciones registradas.
            </Typography>
          </Box>
          {/* aqui es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
          <CardContent>
            {/* boton a la derecha para agregar una aplicacion nueva */}
            <Grid container  item justifyContent="flex-end">
              <Button
                className="registrar-app"
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
            {/* Grid del listado,aqui se asigna el id unico que tiene que tener cada renglon, asi que asignamos el campo ID que se obtiene del endpoint */}
            <MUIXDataGridApp
              id={(row: any) => row.Id}
              columns={columns}
              rows={rows}
            />
          </CardContent>
        </Card>
      </Box>
      {newDialogOpen ? (
        <NewDialogApp
          newDialogOpen={newDialogOpen}
          handleNewDialogClose={handleNewDialogClose}
        />
      ) : null}
      {editDialogOpen ? (
        <EditDialogApp
          editDialogOpen={editDialogOpen}
          handleEditDialogClose={handleEditDialogClose}
          app={editDialogApp}
        />
      ) : null}
      
    </>
  );
}
