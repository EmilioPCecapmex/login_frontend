import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Card,CardContent,IconButton,Tooltip,Button,Typography,FormGroup,FormControlLabel,Switch,} from "@mui/material";
import {
  AccountTree as AccountTreeIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import "./style/Fonts.css";
import { EditDialog } from "../../components/editDialog";
import { NewDialog } from "../../components/newDialog";
import Swal from "sweetalert2";
import { AppsDialog } from "../../components/appsDialog";
import { useNavigate } from "react-router-dom";
import { isAdmin, sessionValid } from "../../funcs/validation";
import { Header } from "../../components/header";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface Usuario {
  EstaActivoLabel:   string;
  Id:                string;
  EstaActivo:        number;
  Nombre:            string;
  ApellidoPaterno:   string;
  ApellidoMaterno:   string;
  NombreUsuario:     string;
  CorreoElectronico: string;
  Curp:              string;
  Rfc:               string;
  Telefono:          string;
  Celular:           string;
  IdTipoUsuario:     string;
  CreadoPor:         string;
  ModificadoPor:     string;
  NombreCreadoPor: string;
  NombreModificadoPor: string;
}

export default function Users() {
  const navigate = useNavigate();

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
  const [rows, setRows] = useState<Array<IUsuarios>>([]);
  const [showAllUsers, setShowAllUsers] = useState(false)

  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const handleNewDialogOpen = () => setNewDialogOpen(true);
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
  const handleNewBtnClick = (event: any) => {
    handleNewDialogOpen();
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogUsuario, setEditDialogUsuario] = useState<Usuario>();
  const handleEditDialogOpen = () => setEditDialogOpen(true);
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
  const handleEditBtnClick = (event: any, cellValues: any) => {
    setEditDialogUsuario(cellValues.row);
    handleEditDialogOpen();
  };

  
  const imprimirSolicitud  = (datos: any) => {
    axios
      .post(
        "http://192.168.137.233:90/solicitud",
        {  
          datos,
      },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        //console.log(r);
        
        if (r.status === 201) {


          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });
          //console.log(r);
          
        }
      })
      .catch((r) => {
        //console.log("Error");
        if (r.response.status === 409) {
        // console.log("Error");
         
        }
      });
  }

  // const getPdf = (datos: any) => {

  //   axios
  //     .post(  "http://192.168.137.233:90/solicitud",{

  //     },
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       responseType: "arraybuffer",
  //     })
  //     .then((r) => {
  //       const a = window.URL || window.webkitURL;

  //       const url = a.createObjectURL(
  //         new Blob([r.data], { type: "application/pdf" })
  //       );

  //       let link = document.createElement("a");

  //       link.setAttribute("download", `${rfc}-${fecha}.pdf`);
  //       link.setAttribute("href", url);
  //       document.body.appendChild(link);
  //       link.click();
  //       setLoadingA(false);
  //     })
  //     .catch((err) => {
  //       setLoadingA(false);
  //       setSendToken("Token incorrecto o expirado, intentelo de nuevo");
  //       setErr(true);
  //     });
  // };

  const getDatosDocumento=(nombreUsuario: any)=>{
    axios
    .get(process.env.REACT_APP_APPLICATION_DEV + "/api/docSolicitudUsuario", {
        params: {
          NombreUsuario: nombreUsuario
        },
        headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
        },
    })
    .then((r) => {
        if (r.status === 200) {
            //console.log(r.data.result[0][0]);
            imprimirSolicitud(r.data.result[0][0]);
            
        }
    });
  }

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
      params: {IdUsuario: localStorage.getItem("IdUsuario")},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(function (response) {
        let rows = response.data.data.map((row: any) => {
          const estaActivoLabel = row.EstaActivo ? "Activo" : "Inactivo";
          const rowTemp = { EstaActivoLabel: estaActivoLabel, ...row };
          return rowTemp
        });

        if(!showAllUsers){
          rows = rows?.filter((x: { EstaActivoLabel: string | string[]; }) => x.EstaActivoLabel.includes('Activo'));
        }
       
        setRows(rows);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        }).then((r) => navigate("../"));
      });
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [showAllUsers]);

  



  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
      headerAlign: "center",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Descargar solicitud - "+ cellValues.row.NombreUsuario}>
              <IconButton
                color="info"
                onClick={(event) => {
                  getDatosDocumento(cellValues.row.NombreUsuario);
                  //imprimirDocumento(event, cellValues);
                  // handleAppsBtnClick(event, cellValues);
                }}
              >
                <FileDownloadIcon  />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Edita - " + cellValues.row.NombreUsuario}>
              <IconButton
                color="warning"
                onClick={(event) => {
                  handleEditBtnClick(event, cellValues);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Edita acceso a plataformas"}>
              <IconButton
                color="info"
                onClick={(event) => {
                  handleAppsBtnClick(event, cellValues);
                }}
              >
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>
            
          </Box>
        );
      },
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 180,
      hideable: false,
      headerAlign: "center",
    },
    {
      field: "ApellidoPaterno",
      headerName: "Apellido Paterno",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "ApellidoMaterno",
      headerName: "Apellido Materno",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "NombreUsuario",
      headerName: "Nombre Usuario",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "CorreoElectronico",
      headerName: "Correo Electrónico",
      width: 220,
    },
    {
      field: "NombreCreadoPor",
      headerName: "Creado Por",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "NombreModificadoPor",
      headerName: "Modificado Por",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "EstaActivoLabel",
      headerName: "Esta Activo",
      width: 110,
      headerAlign: "center",
    },
  ];

  return (
    <Box>
      <Header />
      <Box
        sx={{
          height: "90vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Card sx={{ height: "80vh", width: "80vw", boxShadow: 10 }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              <Box>
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", fontSize: "1.5vw" }}
              >
                <PeopleAltIcon sx={{width: '3vw', height: '3vw'}}/>
              </Typography>

              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: "1vw" }}
              >
                Listado de usuarios con acceso a plataformas.
              </Typography>
              </Box>

              <FormGroup>
              <FormControlLabel control={<Switch onChange={(v) => setShowAllUsers(v.target.checked)}/>} label={
                <Typography sx={{fontFamily: 'MontserratSemiBold'}}>
                  Usuarios Inactivos
                </Typography>
              } />
              </FormGroup>
            </Box>

            <CardContent>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="text"
                  onClick={(event) => handleNewBtnClick(event)}
                  sx={{
                    fontFamily: "MontserratBold",
                    backgroundColor: "#DFA94F",
                    color: "#000001",
                    fontSize: ".6vw",
                    mb: "1vh",
                    boxShadow: 4,
                  }}
                  startIcon={<PersonAddIcon />}
                >
                  Registrar Usuario
                </Button>
              </Box>
              <MUIXDataGrid
                id={(row: any) => row.Id}
                columns={columns}
                rows={rows}
              />
            </CardContent>
          </Card>
        </Box>
        {newDialogOpen ? (
          <NewDialog
            newDialogOpen={newDialogOpen}
            handleNewDialogClose={handleNewDialogClose}
          />
        ) : null}
        {editDialogOpen ? (
          <EditDialog
            editDialogOpen={editDialogOpen}
            handleEditDialogClose={handleEditDialogClose}
            usuario={editDialogUsuario}
          />
        ) : null}
        {appsDialogOpen ? (
          <AppsDialog
            appsDialogOpen={appsDialogOpen}
            handleAppsDialogClose={handleAppsDialogClose}
            usuario={appsDialogUsuario}
          />
        ) : null}
      </Box>
    </Box>
  );
}


export interface IUsuarios {
  EstaActivoLabel:   string;
  Id:                string;
  EstaActivo:        number;
  Nombre:            string;
  ApellidoPaterno:   string;
  ApellidoMaterno:   string;
  NombreUsuario:     string;
  CorreoElectronico: string;
  CreadoPor:         string;
  ModificadoPor:     string;
}
