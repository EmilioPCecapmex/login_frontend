import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MUIXDataGridApp from "../../components/MUIXDataGridApp";
import { Roles } from "../../components/Roles/Roles";
import { EditDialogApp } from "../../components/editApp";
import { Header } from "../../components/header";
import { NewDialogApp } from "../../components/newApp";

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
  const [idApp, setIdApp] = useState("");
  const [app, setApp] = useState("");
  // Set columns and rows for DataGrid
  const columns = [
    // primer columna del grid donde ponemos los botones de editar y eliminar
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
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
        iconColor: "#af8c55",
        color: "#af8c55",
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
        title: "¡Aplicación Creada!",
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
              title: "¡Aplicación Eliminada!",
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
          height: "90%", // aqui va 90vh
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
        <Grid container
          sx={{ height: "84vh", width: "100vw" }}>
          {/* este box es la leyenda que se encuentra arriba a la izquierda */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "11.5%",
            }}
          >
            <Grid item
              sx={{
                display: "flex",
                width: "50%",
                alignItems: "center"
              }}
            >
              <CardContent>
                <AppsIcon sx={{ fontSize: "2rem" }} />
              </CardContent>

              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "1.5rem"
                }}
              >
                Aplicaciones
              </Typography>
            </Grid>

            <CardContent sx={{
              width: "50%",
              justifyContent: "end",
              display: "flex",
            }}>
              <Button
                className="aceptar"
                onClick={(event) => handleNewBtnClick(event)}
                sx={{
                  boxShadow: 4,
                }}
                startIcon={<AddIcon />}
              >
                <Typography sx={{
                  fontSize: ".7rem",
                  "@media (min-width: 480px)": {
                    fontSize: ".7rem",
                  },
                  "@media (min-width: 768px)": {
                    fontSize: "1rem",
                  },
                }}>
                  registrar aplicación
                </Typography>
              </Button>
            </CardContent>


            {/* <Grid container item justifyContent="flex-end">
              
            </Grid> */}
          </Grid>
          <MUIXDataGridApp
            id={(row: any) => row.Id}
            columns={columns}
            rows={rows}
          />
          {/* aqui es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}

          {/* boton a la derecha para agregar una aplicacion nueva */}

          {/* Grid del listado,aqui se asigna el id unico que tiene que tener cada renglon, asi que asignamos el campo ID que se obtiene del endpoint */}
        </Grid>
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
    </Grid>
  );
}
