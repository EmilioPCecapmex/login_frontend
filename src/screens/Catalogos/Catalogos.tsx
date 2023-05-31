import {
    Box,
    Button,
    Grid,
    IconButton,
    Input,
    Tab,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import AlertModal from "../../components/alertModal";
import { useNavigate } from "react-router-dom";
import AppsModal from "../../components/appsModal";
import axios from "axios";
import { JWT_Token, sessionValid } from "../../funcs/validation";
import { UserLogin } from "../../Interfaces/User";
import { SolicitudUsuarios } from "../SolicitudDeUsuarios/SolicitudUsuarios";
import { UserServices } from "../../services/UserServices";
import SliderProgress from "../Componentes/SliderProgress";
import { Toast } from "../Componentes/Toast";
import { AlertS } from "../Componentes/AlertS";
import { Header } from "../../components/header";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
interface IApps {
    IdApp: string;
    Nombre: string;
    Path: string;
    Descripcion: string;
}

const Catalogos = () => {
    const [valueTab, setValueTab] = useState('');
    const [labelTab, setLabelTab] = useState('1');
    const [openSlider, setOpenSlider] = useState(true);
    const [secretarias, setSecretarias] = useState([]);
    const [roles, setRoles] = useState([]);
    const [uResponsable, setUResponsable] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [perfiles, setPerfiles] = useState([]);
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
                                // onClick={(event) => {
                                //     handleEditBtnClick(event, cellValues);
                                // }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Eliminar App " + cellValues.row.Nombre}>
                            <IconButton
                                color="error"
                                // onClick={(event) => {
                                //     handleDeleteBtnClick(event, cellValues);
                                // }}
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
            field: "Clave",
            headerName: "Clave",
            width: 200,
            headerAlign: "center",
            // hide: va.row
        },
        // Tercer columna donde se mostrara el path
        {
            field: "Nombre",
            headerName: "Nombre",
            width: 650,
            // width:'*',
            headerAlign: "center",
        },
        // cuarta columna donde se mostrara si esta activo o no
        {
            field: "Descripcion",
            headerName: "Descripcion",
            width: 550,
            headerAlign: "center",
        },
        {
            field: "NombreCorto",
            headerName: "NombreCorto",
            width: 150,
            headerAlign: "center",
        },

        {
            field: "ControlInterno",
            headerName: "ControlInterno",
            width: 100,
            headerAlign: "center",
        },
        {
            field: "Referencia",
            headerName: "Referencia",
            width: 100,
            headerAlign: "center",
        },
    ];






    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        consulta(newValue, "catalogos");
        setValueTab(newValue);
    };

    const consulta = (catalogo: string, opcion: string) => {
        setOpenSlider(true);
        UserServices.consultaCatalogos({ cat: catalogo, opcion: opcion }, String(localStorage.getItem("jwtToken"))).then((res) => {
            if (res.status === 200) {
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
                setOpenSlider(false)
            }
        });

    };

    useEffect(() => {
        // setOpenSlider(true)




    }, []);



    return (

        <>
            <Header />
            <Grid container item xs={12} justifyContent="center" paddingTop={3}>
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Secretarias" value="1" />
                            <Tab label="Unidad responsable" value="2" />
                            <Tab label="Departamentos" value="3" />
                            <Tab label="Roles" value="4" />
                            <Tab label="Perfiles" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Typography>{labelTab}</Typography>
                        <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
                            <MUIXDataGrid columns={columns} rows={secretarias} />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Typography>{labelTab}</Typography>
                        <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
                            <MUIXDataGrid columns={columns} rows={uResponsable} />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                        <Typography>{labelTab}</Typography>
                        <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
                            <MUIXDataGrid columns={columns} rows={departamentos} />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="4">
                        <Typography>{labelTab}</Typography>
                        <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
                            <MUIXDataGrid columns={columns} rows={roles} />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="5">
                        <Typography>{labelTab}</Typography>
                        <Grid item xs={12} className="ContainerMUIXDataGridCatalogos">
                            <MUIXDataGrid columns={columns} rows={perfiles} />
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Grid>
            <div className="FooterLogin">
                <Grid paddingTop={2} container direction="row" justifyContent="center">




                </Grid>

                <Box sx={{ position: 'absolute', right: 5, bottom: 5, }}>
                    <Typography sx={{ fontFamily: 'MontserratBold', fontSize: "10px", color: '#808080' }}> v.{process.env.REACT_APP_APPLICATION_VERSION}</Typography>
                </Box>

            </div>
        </>


    );
};
export default Catalogos;
