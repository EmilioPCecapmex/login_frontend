import { Box, CircularProgress, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { createPermisoMenuRol, deletePermisoMenuRol, getPermisosMenu, getPermisosMenuRol } from "./PermisosServices";
import { IMenus } from "../menus/Menus";

interface IPermisos {
    Descripcion: string
    IdApp: string
    IdMenu: string
    IdRelacion: string
    Permiso: string
    Id: string
}

export function Permisos({ open, closeModal, menu, idApp, idRol }: { open: boolean, closeModal: Function, menu: IMenus, idApp: string, idRol: string }) {

    const camposCsv = ["Nombre", "Descripcion"];


    const [permisos, setPermisos] = useState<Array<IPermisos>>([])
    const [permisosMenu, setPermisosMenu] = useState<Array<IPermisos>>([])
    const [permisosFaltantes, setPermisosFaltantes] = useState<Array<IPermisos>>([])
    const [banderaMenus, setBanderaMenus] = useState(false);

    function obtenerDatos() {
        getPermisosMenu(menu.Id, setPermisos, idApp, () => { setBanderaMenus(true) })
        getPermisosMenuRol(menu.Id, idRol, setPermisosMenu)
    }
    useEffect(() => {
        obtenerDatos()
    }, [])

    useEffect(() => {
        // Obtener la diferencia entre los arrays
        const diferenciaPermisos = permisos.filter((permiso) => !permisosMenu.find((permisoMenu) => permisoMenu.Id === permiso.Id));

        // Actualizar el estado con los menús faltantes
        setPermisosFaltantes(diferenciaPermisos);
    }, [permisos, permisosMenu]);




    const columnsAsignados = [
        {
            field: "Permiso",
            headerName: "Permiso",
            flex: 4,
            headerAlign: "center",
            align: "left",
        },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues: any) => {
                return (
                    <Box>
                        <Tooltip title={"Quitar permiso " + cellValues.row.Permiso}>
                            <IconButton
                                onClick={() => {
                                    deletePermisoMenuRol(cellValues.row.IdRelacion, obtenerDatos)
                                }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    const columnsSinAsignar = [
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues: any) => {
                return (
                    <Box>
                        <Tooltip
                            title={"Asignar permiso " + cellValues.row.Permiso}
                        >
                            <IconButton
                                onClick={() => {
                                    createPermisoMenuRol(idRol, menu.Id, cellValues.row.Id, localStorage.getItem("IdUsuario") || "", obtenerDatos)
                                }}
                            >
                                <ControlPointIcon />
                            </IconButton>
                        </Tooltip>
                    </Box >
                );
            },
        },
         {
            field: "Permiso",
            headerName: "Permiso",
            flex: 4,
            headerAlign: "center",
            align: "right"
        },
    ];
    return (
        <Dialog open={open} fullScreen>
            {!banderaMenus ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: "90",
                    }}
                >
                    <CircularProgress size={300} /> menus
                </Box>
            ) : (
                //pantalla
                <Grid
                    container
                    sx={{
                        width: "100vw",
                        height: "100%",
                    }}
                >
                    {/* Header */}
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{
                            height: "8vh",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            border: "1px solid"
                            // bgcolor: "#c4a57b",
                        }}
                    >

                        <Grid
                            item
                            xs={8}
                            sm={8}
                            md={10}
                            lg={10}
                            xl={10}
                            sx={{
                                height: "8vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography fontFamily={"'Montserrat', sans-serif"}
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                    fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                                    color: "#AF8C55"
                                }}
                            >
                                Permisos
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            sm={2}
                            md={1}
                            lg={1}
                            xl={1}
                            sx={{
                                height: "8vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Tooltip title="Salir">
                                <IconButton

                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    <CloseIcon sx={{
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
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>

                    {/* Body */}
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{
                            height: "92vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}
                    >

                        {/* Rol */}
                        <Grid
                            container
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "8%",
                            }}
                        >
                            <Typography fontFamily={"'Montserrat', sans-serif"}
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                    fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                                    color: "#AF8C55"
                                }}>
                                {menu.Menu}
                            </Typography>
                        </Grid>


                        {/* textos de permisos */}
                        {/* ############################ */}
                        <Grid container sx={{ display: "flex", height: "84vh", width: "100vw", overflow: "auto" }}>
                            <Grid item container sx={{ display: "flex", justifyContent: "center", height: "84vh" }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                xl={6}>

                                <Grid item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}>

                                    <Typography
                                        fontFamily={"'Montserrat', sans-serif"}
                                        sx={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            textAlign: "center",
                                            fontSize: [20, 20, 20, 25, 25], // Tamaños de fuente para diferentes breakpoints
                                            
                                        }}
                                    >Permisos Asignados al Menú</Typography>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    xs={11}
                                    sm={11}
                                    md={11}
                                    lg={11}
                                    xl={11}

                                    sx={{
                                        display: "flex",
                                        height: "90%",
                                        border: "1px  solid",
                                        overflow: "auto",
                                        alignContent: "flex-start",
                                        justifyContent: "space-evenly",
                                    }}
                                >
                                    <MUIXDataGrid
                                        id={Math.random}
                                        columns={columnsAsignados}
                                        rows={permisosMenu}
                                        camposCsv={camposCsv}
                                        exportTitle={"Permisos Asignados al Menu " + menu.Menu}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container sx={{ display: "flex", justifyContent: "center", height: "84vh" }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                xl={6}>

                                <Grid item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}>

                                    <Typography
                                        fontFamily={"'Montserrat', sans-serif"}
                                        sx={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            textAlign: "center",
                                            fontSize: [20, 20, 20, 25, 25], // Tamaños de fuente para diferentes breakpoints
                                            
                                        }}
                                    >Permisos Disponibles para Asignar al Menú</Typography>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    xs={11}
                                    sm={11}
                                    md={11}
                                    lg={11}
                                    xl={11}

                                    sx={{
                                        display: "flex",
                                        height: "90%",
                                        border: "1px  solid",
                                        overflow: "auto",
                                        alignContent: "flex-start",
                                        justifyContent: "space-evenly",
                                    }}
                                >
                                    <MUIXDataGrid
                                        id={Math.random}
                                        columns={columnsSinAsignar}
                                        rows={permisosFaltantes}
                                        camposCsv={camposCsv}
                                        exportTitle={"Permisos Sin Asignar al Menu " + menu.Menu}
                                    />
                                  
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
            }

        </Dialog >
    )
}

