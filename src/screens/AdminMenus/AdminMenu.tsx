import { Box, CircularProgress, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import CloseIcon from "@mui/icons-material/Close";
import { DialogAdminMenu, IElemento } from "./DialogAdminMenu";
import { useEffect, useState } from "react";
import { deleteAdminMenu, getAdminMenu } from "./AdminMenuServices";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminPermisos } from "../AdminPermisos/AdminPermisos";
import Swal from "sweetalert2";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";





export interface IMenu {
  Id: string;
  mMenu: string;
  Menu: string;
  IdApp: string;
  Descripcion: string;
  Nivel: number;
  Orden: number;
  MenuPadre: string;
  Icon: string;
  Path: string;
  ControlInterno: string;
}




export function AdminMenu({
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


  const [openAdminPermisos, setOpenAdminPermisos] = useState(false);
  const [menuSeleccionado, setMenuSeleccionado] = useState<IMenu>({
  Id: "",
  mMenu: "",
  Menu: "",
  IdApp: "",
  Descripcion: "",
  Nivel: 0,
  Orden: 0,
  MenuPadre: "",
  Icon: "",
  Path: "",
  ControlInterno: "",
  });
  const [registroData, setRegistroData] = useState<IElemento>({
    Id: "",
    Menu: "",
    Descripcion: "",
    Nivel: 0,
    Orden: 0,
    MenuPadre: "",
    Icon: "",
    Path: "",
    ControlInterno: "",
    IdUsuario: "",
    IdApp: "",
  });




  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 175,
      headerAlign: "left",
      hideable: false,
      renderCell: (cellValues: any) => {
        console.log("c3l svalues", cellValues);

        return (
          <Box>
            <Tooltip title={"Editar"}>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(event) => {
                      console.log("cellValues.row",cellValues.row);
                      
                      setRegistroData(cellValues.row);
                      setMovimiento("Editar");
                      setOpenDialogAdminMenu(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
            {/* <Tooltip title={"Editar Acceso a Menús"}>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(event) => {
                      if (cellValues.row.Id) {
                        setIdRol(cellValues.row.Id);
                      }
    
                      if (cellValues.row.Nombre) {
                        setRol(cellValues.row.Nombre);
                      }
    
                      setOpenMenu(true);
                      // handleDelete(event, cellValues);
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip> */}
            <Tooltip title={"Eliminar"}>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(event) => {
                      eliminar(cellValues);
                      // setRegistroData(cellValues.row);
                      // setMovimiento("eliminar");
                      // setOpenDialogRoles(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
            <Tooltip title={"Administrar Permisos "
              //+ cellValues.row.Nombre
            }>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  setOpenAdminPermisos(true);
                  setMenuSeleccionado(cellValues?.row)
                  //setIdApp(cellValues?.row?.Id);
                  //setApp(cellValues?.row?.Nombre);
                }}
              >
                <SecurityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    // {
    //     field: "Id",
    //     headerName: "Id",
    //     width: 250,
    //     hideable: false,
    //     headerAlign: "left",

    // },
    {
      field: "Menu",
      headerName: "Nombre Menú",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 500,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Nivel",
      headerName: "Nivel",
      width: 80,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Orden",
      headerName: "Orden",
      width: 80,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "mMenu",
      headerName: "Menú Padre",
      width: 400,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Icon",
      headerName: "Icon",
      width: 100,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Path",
      headerName: "Path",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "ControlInterno",
      headerName: "Control Interno",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    // {
    //     field: "Deleted",
    //     headerName: "Eliminado",
    //     width: 150,
    //     hideable: false,
    //     headerAlign: "left",
    //     renderCell: (cellValues: any) => {
    //         return (
    //             cellValues.row.Deleted===0?"Activo":"No Activo"
    //         );
    //     },
    // }
  ];
  const [openDialogAdminMenu, setOpenDialogAdminMenu] = useState(false);
  const [movimiento, setMovimiento] = useState("Agregar");
  const [menus, setMenus] = useState<Array<IMenu>>([]);
  const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];

  function actualizarDatos(){
    getAdminMenu(idApp, setMenus)
  }
  useEffect(() => {
    if(!openDialogAdminMenu)
      actualizarDatos()
  }, [openDialogAdminMenu])

  function eliminar (v:any){
    Swal.fire({
      title: "¿Estas seguro que deseas eliminar el menú?",
      icon: "info",
      text: "Al eliminar este menú se eliminaran los permisos del menú y los roles que tengan acceso al menú lo perderán.", 
      showCancelButton: true,
      
      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("valor v",v.row);
        
        deleteAdminMenu(v?.row?.Id)
          .then((response)=>{
            alertaExito(actualizarDatos,"¡Registro eliminado!");
            //obtenerDatos();
                  })
          .catch((error)=>{
            alertaError();
          });
      }                      
    });
  }

  return (<Dialog open={open} fullScreen>
    {/* <Box
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
        </Box> */}
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

            Menús
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
                fontSize: [30, 30, 30, 40, 40]
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
                  setOpenDialogAdminMenu(true);
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
              rows={menus}
              camposCsv={camposCsv}
            />
          </Box>
        </Grid>
      </Grid>

    </Grid>

    {openDialogAdminMenu && (
      <DialogAdminMenu                                     
        open={openDialogAdminMenu}
        closeDialog={setOpenDialogAdminMenu}
        reloadData={registroData}
        movimiento={movimiento}
        IdApp={idApp}
      />
    )}

    {openAdminPermisos && (
      <AdminPermisos
        open={openAdminPermisos}
        closeModal={() => setOpenAdminPermisos(false)}
        //reloadData={registroData}
        //movimiento={movimiento}

        IdApp={idApp}
        Menu={menuSeleccionado.Menu}
        IdMenu={menuSeleccionado.Id}
      />
    )}

  </Dialog>
  )

}