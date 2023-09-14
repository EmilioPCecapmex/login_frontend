/* eslint-disable react-hooks/exhaustive-deps */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, IconButton, Tab, Tooltip, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Create, IModify } from "../../components/dialogsCatalogos/Create";
import { Header } from "../../components/header";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { getCatalogo } from "../../services/catalogosService";
import Swal from "sweetalert2";
import axios from "axios";
import { alertaError, alertaExito } from "../../components/alertas/toast";
import MUIXDataGrid from "../../components/dataGridGenerico/MUIXDataGrid";

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

  const [openDelete, setOpenDelete] = useState(false);
  const [selectId, setSelectId] = useState(String);

  const [elemento, setElemento] = useState<IModifica>({
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
  });

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

  const columns = [
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
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
            <Tooltip title={"Eliminar"}>
              <IconButton
                sx={{ color: "black" }}
                onClick={(event) => {
                  let ruta=""
                  switch (valueTab) {
                    case "TipoEntidades":
                      ruta="eliminar-tipo-entidad";
                      break;
                    case "Entidades":
                      ruta="eliminar-entidad";
                      break;
                    default:
                      ruta="/";
                      break;
                  }

                  handleDeleteBtnClick(cellValues,ruta);
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

  const [reload, setReload] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleDeleteBtnClick = (cellValues: any,ruta:string) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { Id: cellValues.row.Id,IdUsuario:localStorage.getItem("IdUsuario") };
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
            alertaExito(()=>{},"Registro eliminado!")
            getCatalogo("lista-entidades", setEntidades, "", "");
            getCatalogo("lista-tipo-entidades", setTipoEntidades, "", "");
          })
          .catch(function (error) {
            alertaError();
          });
      }
    });
  };

  return (
    <>
      <Header />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        paddingTop={3}
        sx={{ maxHeight: "90vh", maxWidth: "100vw" }}
      >
        <TabContext value={String(valueTab)}>
          <Grid container sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Grid item xl={8} xs={8} lg={8} md={8} sm={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Tipo Entidades " value="TipoEntidades" sx={{ fontSize: [30, 30, 30, 30, 30], }} />
                <Tab label="Entidades" value="Entidades" sx={{ fontSize: [30, 30, 30, 30, 30], }} />
              </TabList>
            </Grid>
            <Grid item xl={2} xs={2} lg={2} md={2} sm={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <ButtonsAdd handleOpen={setOpenCreate} agregar={true} />
            </Grid>
          </Grid>
        </TabContext>


        <Grid item sx={{ width: "100vw", height: "77vh" }}>
          <MUIXDataGrid  id={(row: any) => row.Id} columns={columns} rows={valueTab === "TipoEntidades" ? tipoEntidades : entidades} />
        </Grid>






      </Grid>


      {openCreate && (
        <Create
          open={openCreate}
          setOpen={setOpenCreate}
          catalogo={valueTab}
          reloadData={setReload}
          data={elemento}
        />
      )}

      

    </>
  );
};
export default Catalogos;
