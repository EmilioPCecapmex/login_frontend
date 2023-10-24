import { Box, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { DialogAdminPermisos, IElemento } from "./DialogAdminPermisos";
import { deleteAdminPermiso, getAdminPermisos } from "./AdminPermisosServices";
import Swal from "sweetalert2";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";





export interface IPermiso {
  ControlInterno: string;
  Deleted: number;
  Descripcion: string;
  Id: string;
  NombrePermiso: string;
}

export function AdminPermisos({
  open,
  closeModal,
  Menu,
  IdMenu,
  IdApp,
}: {
  open: boolean;
  closeModal: Function;
  Menu: string;
  IdMenu: string;
  IdApp: string;
}) {
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
                  setOpenDialogAdminPermisos(true);
                  setRegistroData(cellValues.row);
                  setMovimiento("Editar");

                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          
            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  eliminar(cellValues);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Permiso",
      headerName: "Nombre Permiso",
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
      field: "ControlInterno",
      headerName: "Control Interno",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
  ];
  const [openDialogAdminPermisos, setOpenDialogAdminPermisos] = useState(false);
  const [movimiento, setMovimiento] = useState("Agregar");
  const [permisos, setPermisos] = useState<Array<IPermiso>>([]);
  const [registroData, setRegistroData] = useState<IElemento>({
    Id: "",
    Permiso: "",
    IdMenu: "",
    Descripcion: "",
    ControlInterno: "",
    IdUsuario: "",
    IdApp: "",
  });


  const camposCsv = ["Nombre", "Descripcion", "ControlInterno", "Deleted"];

  function actualizarDatos() {
     getAdminPermisos(IdMenu, setPermisos)
  }

  function eliminar(v: any) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este permiso de forma permanente?",
      icon: "question",
      showCancelButton: true,
  
      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdminPermiso(v?.row?.Id)
          .then((response) => {
            alertaExito(actualizarDatos, "¡Registro eliminado!");
          })
          .catch((error) => {
            alertaError();
          });
      }
    });
  }
  useEffect(() => {
    if(!openDialogAdminPermisos)
    actualizarDatos()
  }, [openDialogAdminPermisos])


  return (<Dialog open={open} fullScreen>
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

            Permisos
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
                title={Menu}>
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
                  {Menu}
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
                  setOpenDialogAdminPermisos(true);
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
              rows={permisos}
              camposCsv={camposCsv}
            />
          </Box>
        </Grid>
      </Grid>

    </Grid>

    {openDialogAdminPermisos && (
      <DialogAdminPermisos
        open={openDialogAdminPermisos}
        closeDialog={setOpenDialogAdminPermisos}
        reloadData={registroData}
        movimiento={movimiento}
        IdApp={IdApp}
        Menu={Menu}
        IdMenu={IdMenu}

      />
    )}

  </Dialog>)

}