import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TabContext, TabList } from "@mui/lab";
import { Box, Grid, IconButton, Tab, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { Create } from "../../components/dialogsCatalogos/Create";
import { Header } from "../../components/header";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { getCatalogo } from "../../services/catalogosService";
import Swal from "sweetalert2";
import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";
import { ArbolEntidades } from "../../components/dialogsCatalogos/ArbolEntidades";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { HistoricoDialog } from "../../components/historico/HistoricoDialog";

export interface IEntidad {
  ClaveSiregob: string;
  ControlInterno: string;
  Direccion: string;
  EntidadPerteneceA: string;
  FechaCreacion: string;
  Id: string;
  IdEntidadPerteneceA: string;
  IdTipoEntidad: string;
  Nombre: string;
  NombreTipoEntidad: string;
  Telefono: string;
  Titular: string;
  UltimaActualizacion: string;
}

export const newCatalogo = {
  ClaveSiregob: "",
  ControlInterno: "",
  Direccion: "",
  EntidadPerteneceA: "",
  FechaCreacion: "",
  Id: "",
  IdEntidadPerteneceA: "",
  IdTitular: "",
  IdTipoEntidad: "",
  Nombre: "",
  NombreTipoEntidad: "",
  Telefono: "",
  Titular: "",
  UltimaActualizacion: "",
  Descripcion: "",
  IdUsuario: localStorage.getItem("IdUsuario") || "",
};

export interface ITipoEntidad {
  Nombre: string;
  Descripcion: string;
}

export interface IModifica {
  ClaveSiregob: string;
  ControlInterno: string;
  Direccion: string;
  EntidadPerteneceA: string;
  FechaCreacion: string;
  Id: string;
  IdEntidadPerteneceA: string;
  IdTipoEntidad: string;
  IdTitular: string;
  Nombre: string;
  NombreTipoEntidad: string;
  Telefono: string;
  Titular: string;
  UltimaActualizacion: string;
  Descripcion: string;
  IdUsuario: string;
}

const Catalogos = () => {
  const [valueTab, setValueTab] = useState<string>("TipoEntidades");
  const [tipoEntidades, setTipoEntidades] = useState<Array<ITipoEntidad>>([]);
  const [entidades, setEntidades] = useState<Array<IEntidad>>([]);

  const [openCreate, setOpenCreate] = useState(false);

  const [elemento, setElemento] = useState<IModifica>(newCatalogo);

  useEffect(() => {
    getCatalogo("lista-entidades", setEntidades, "", "");
    getCatalogo("lista-tipo-entidades", setTipoEntidades, "", "");

    openCreate === false &&
      setElemento({
        ClaveSiregob: "",
        ControlInterno: "",
        Direccion: "",
        EntidadPerteneceA: "",
        FechaCreacion: "",
        Id: "",
        IdTitular: "",
        IdEntidadPerteneceA: "",
        IdTipoEntidad: "",
        Nombre: "",
        NombreTipoEntidad: "",
        Telefono: "",
        Titular: "",
        UltimaActualizacion: "",
        Descripcion: "",
        IdUsuario: localStorage.getItem("IdUsuario") || "",
      });
  }, [openCreate]);
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Editar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  setElemento(cellValues.row);
                  setOpenCreate(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={
                "Movimientos Historicos"
                //+ cellValues.row.Nombre
              }
            >
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  setElemento(cellValues.row);
                  setOpenTrazabilidad(true);
                  // setIdApp(cellValues?.row?.Id);
                  // setApp(cellValues?.row?.Nombre);
                }}
              >
                <TimelineOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  let ruta = "";
                  switch (valueTab) {
                    case "TipoEntidades":
                      ruta = "eliminar-tipo-entidad";
                      break;
                    case "Entidades":
                      ruta = "eliminar-entidad";
                      break;
                    default:
                      ruta = "/";
                      break;
                  }

                  handleDeleteBtnClick(cellValues, ruta);
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
      field: "ClaveSiregob",
      headerName: "Clave Siregob",
      width: 100,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: valueTab === "Entidades" ? 600 : 250,
      headerAlign: "center",
    },
    {
      field: "ControlInterno",
      headerName: "Control Interno",
      width: 150,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 200,
      headerAlign: "center",
      hide: valueTab === "Entidades",
    },
    {
      field: "Direccion",
      headerName: "Dirección",
      width: 400,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "Telefono",
      headerName: "Teléfono",
      width: 150,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "NombreTipoEntidad",
      headerName: "Tipo Entidad",
      width: 200,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "Titular",
      headerName: "Titular",
      width: 300,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
    {
      field: "EntidadPerteneceA",
      headerName: "Pertenece A",
      width: 600,
      headerAlign: "center",
      hide: valueTab !== "Entidades",
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleDeleteBtnClick = (cellValues: any, ruta: string) => {
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
        const data = {
          Id: cellValues.row.Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        };
        axios({
          method: "delete",
          url: process.env.REACT_APP_APPLICATION_DEV + `/api/${ruta}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          data: data,
        })
          .then(function (response) {
            alertaExito(() => {}, "Registro eliminado!");
            getCatalogo("lista-entidades", setEntidades, "", "");
            getCatalogo("lista-tipo-entidades", setTipoEntidades, "", "");
          })
          .catch(function (error) {
            alertaError();
          });
      }
    });
  };

  const camposCsv =
    valueTab === "TipoEntidades"
      ? ["Nombre", "Descripcion"]
      : [
          "Nombre",
          "Direccion",
          "Telefono",
          "NombreTipoEntidad",
          "Titular",
          "EntidadPerteneceA",
          "ControlInterno",
          "ClaveSiregob",
        ];
  return (
    <>
      <Header menuActual="Entidades" />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        paddingTop={3}
        sx={{ maxHeight: "90vh", maxWidth: "100vw" }}
      >
        <TabContext value={String(valueTab)}>
          <Grid
            container
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <Grid
              item
              xl={8}
              lg={8}
              md={8}
              sm={10}
              xs={10}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
              >
                <Tab
                  label="Tipo de entidades "
                  value="TipoEntidades"
                  sx={{ fontSize: [30, 30, 30, 30, 30] }}
                  style={{ textTransform: "none" }}
                />
                <Tab
                  label="Entidades"
                  value="Entidades"
                  sx={{ fontSize: [30, 30, 30, 30, 30] }}
                  style={{ textTransform: "none" }}
                />
              </TabList>
            </Grid>
            <Grid
              item
              xl={2}
              xs={2}
              lg={2}
              md={2}
              sm={2}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <ButtonsAdd handleOpen={setOpenCreate} agregar={true} />
            </Grid>
          </Grid>
        </TabContext>

        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          <MUIXDataGrid
            id={(row: any) => row.Id}
            columns={columns}
            rows={valueTab === "TipoEntidades" ? tipoEntidades : entidades}
            camposCsv={camposCsv}
            exportTitle={
              valueTab === "TipoEntidades"
                ? "Catálogo de Tipo de Entidades"
                : "Catálogo de Entidades"
            }
          />
        </Grid>
      </Grid>

      {openCreate ? (
        valueTab === "Entidades" && !elemento.Id ? (
          <ArbolEntidades open={openCreate} setOpen={setOpenCreate} />
        ) : (
          <Create
            open={openCreate}
            setOpen={setOpenCreate}
            catalogo={valueTab}
            data={elemento}
          />
        )
      ) : null}
        {openTrazabilidad && <HistoricoDialog st={valueTab} Id={elemento.Id} closeModal={()=>setOpenTrazabilidad(false)} />}
    
    </>
  );
};
export default Catalogos;
