import { Box, Grid, IconButton, Tab, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ResponseCatalogos from "../../Interfaces/User";
import { UserServices } from "../../services/UserServices";
import { Header } from "../../components/header";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonsAdd from "../Componentes/ButtonsAdd";
import { Edit, IModify } from "../../components/dialogsCatalogos/Edit";
import { Create } from "../../components/dialogsCatalogos/Create";

import { Delete } from "../../components/dialogsCatalogos/Delete";
import { log } from "console";
const Catalogos = () => {
  const [valueTab, setValueTab] = useState<string>("1");
  const [openSlider, setOpenSlider] = useState(true);
  const [secretarias, setSecretarias] = useState([]);
  const [roles, setRoles] = useState([]);
  const [uResponsable, setUResponsable] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [tpoDependencias, setTpoDependencias] = useState([]);
  ////////////// ocuplat columnas
  const [HideClave, setHideClave] = useState(true);
  const [HideNombre, setHideNombre] = useState(true);
  const [HideDescripcion, setHideDescripcion] = useState(true);
  const [HideNombreCorto, setHideNombreCorto] = useState(true);
  const [HideControlInterno, setHideControlInterno] = useState(true);
  const [HideReferencia, setHideReferencia] = useState(true);
  /////////////

  
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectId, setSelectId] = useState(String)
  const [elemento, setElemento] = useState<IModify>({
    IdSecretaria: "",
    Nombre: "",
    NombreCorto: "",
    IdTitular: "",
    PerteneceA: "",
    Direccion: "",
    IdModificador: "",
    IdUResponsable: "",
    Clave: "",
    Descripcion: "",
    IdDepartamento: "",
    IdResponsable: "",
    IdRol: "",
    ControlInterno: "",
    IdDependencia: "",
    Telefono: "",
    IdTipoDependencia: "",
    IdPerfil: "",
    Referencia: "",
    
  });

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
                color="primary"
                onClick={() => {
                  setElemento(cellValues.row);
                  setOpenEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar"}>
              <IconButton
                color="error"
                 onClick={(event) => {
                  setSelectId(cellValues.row.Id);
                  setElemento(cellValues.row);
                     setOpenDelete(true);
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
      field: "Clave",
      headerName: "Clave",
      width: 200,
      headerAlign: "center",
      hide: HideClave,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 650,
      headerAlign: "center",
      hide: HideNombre,
    },
    {
      field: "NombreCorto",
      headerName: "NombreCorto",
      width: 150,
      headerAlign: "center",
      hide: HideNombreCorto,
    },
    {
      field: "Referencia",
      headerName: "Referencia",
      width: 150,
      headerAlign: "center",
      hide: HideReferencia,
    },
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 1000,
      headerAlign: "center",
      hide: HideDescripcion,
    },
    {
      field: "ControlInterno",
      headerName: "ControlInterno",
      width: 100,
      headerAlign: "center",
      hide: HideControlInterno,
    },
  ];

 const [reload,setReload]=useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setHideClave(true);
    setHideNombre(true);
    setHideDescripcion(true);
    setHideNombreCorto(true);
    setHideControlInterno(true);
    setHideReferencia(true);
    setValueTab(newValue);
    consulta(newValue, "catalogos");
  };

  const consulta = (catalogo: string, opcion: string) => {
    setOpenSlider(true);
    UserServices.consultaCatalogos(
      { cat: catalogo, opcion: opcion, tipo: "4" },
      String(localStorage.getItem("jwtToken"))
    ).then((res) => {
      if (res.status === 200) {
        const user: Array<ResponseCatalogos> = res.data.data;
        var clave = 0;
        var Nombre = 0;
        var Descripcion = 0;
        var NombreCorto = 0;
        var ControlInterno = 0;
        var Referencia = 0;
        
        user?.map((data) => {
          if (data?.Clave) {
            clave++;
          }
          if (data?.Nombre) {
            Nombre++;
          }
          if (data?.Descripcion) {
            Descripcion++;
          }
          if (data?.NombreCorto) {
            NombreCorto++;
          }
          if (data?.ControlInterno) {
            ControlInterno++;
          }
          if (data?.Referencia) {
            Referencia++;
          }
        });

        if (clave != 0) {
          setHideClave(false);
        }
        if (Nombre != 0) {
          setHideNombre(false);
        }
        if (Descripcion != 0) {
          setHideDescripcion(false);
        }
        if (NombreCorto != 0) {
          setHideNombreCorto(false);
        }
        if (ControlInterno != 0) {
          setHideControlInterno(false);
        }
        if (Referencia != 0) {
          setHideReferencia(false);
        }

        if (catalogo === "1" && opcion === "catalogos") {
          setSecretarias(res.data.data);
        }
        if (catalogo === "2" && opcion === "catalogos") {
          setUResponsable(res.data.data);
        }
        if (catalogo === "3" && opcion === "catalogos") {
          setDepartamentos(res.data.data);
        }
        if (catalogo === "4" && opcion === "catalogos") {
          setRoles(res.data.data);
        }
        if (catalogo === "5" && opcion === "catalogos") {
          setPerfiles(res.data.data);
        }
        if (catalogo === "6" && opcion === "catalogos") {
          setDependencias(res.data.data);
        }
        if (catalogo === "7" && opcion === "catalogos") {
          setTpoDependencias(res.data.data);
        }
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    consulta(valueTab, "catalogos");
  }, [reload]);

  return (
    <>
      <Header />
      <Grid container item xs={12} justifyContent="center" paddingTop={3}>
        <TabContext value={String(valueTab)}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Secretarias" value="1" />
              <Tab label="Unidad responsable" value="2" />
              <Tab label="Departamentos" value="3" />
              <Tab label="Roles" value="4" />
              <Tab label="Perfiles" value="5" />
              <Tab label="Dependencias" value="6" />
              <Tab label="Tipo Dependencias" value="7" />
            </TabList>
          </Box>
          <Grid item xs={12} paddingLeft={1}>
            <ButtonsAdd handleOpen={setOpenCreate} agregar={true} />
          </Grid>
          <TabPanel value="1">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={secretarias} />
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={uResponsable} />
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={departamentos} />
            </Grid>
          </TabPanel>
          <TabPanel value="4">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={roles} />
            </Grid>
          </TabPanel>
          <TabPanel value="5">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={perfiles} />
            </Grid>
          </TabPanel>
          <TabPanel value="6">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={dependencias} />
            </Grid>
          </TabPanel>
          <TabPanel value="7">
            <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
              <MUIXDataGrid columns={columns} rows={tpoDependencias} />
            </Grid>
          </TabPanel>
        </TabContext>
      </Grid>
      <div className="FooterLogin">
        {/* <Grid
          paddingTop={2}
          container
          direction="row"
          justifyContent="center"
        ></Grid> */}

        <Box sx={{ position: "absolute", right: 5, bottom: 5 }}>
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              fontSize: "10px",
              color: "#808080",
            }}
          >
            v.{process.env.REACT_APP_APPLICATION_VERSION}
          </Typography>
        </Box>
        <Edit
          open={openEdit}
          setOpen={setOpenEdit}
          elemento={elemento}
          catalogo={valueTab}
          reloadData={setReload}
        />
        <Create
          open={openCreate}
          setOpen={setOpenCreate}
          catalogo={valueTab}
          reloadData={setReload}
        />
        <Delete
          open={openDelete}
          setOpen={setOpenDelete}
          Id={selectId}
          catalogo={valueTab}
          elemento={elemento}
          reloadData={setReload}
        />

      </div>
    </>
  );
};
export default Catalogos;
