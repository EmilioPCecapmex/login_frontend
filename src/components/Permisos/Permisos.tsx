import { Box, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRoles } from "../Roles/RolesServices";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../dataGridGenerico/MUIXDataGrid";
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import SecurityIcon from '@mui/icons-material/Security';
import { createPermisoMenuRol, deletePermisoMenuRol, getPermisosMenu, getPermisosMenuRol } from "./PermisosServices";
import { IMenus } from "../menus/Menus";

interface IPermisos {
    Descripcion: string
    IdApp: string
    IdMenu: string
    IdRelacion: string
    Permiso: string
    Id:string
}

export function Permisos({ open, closeModal, menu, idApp, idRol }: { open: boolean, closeModal: Function, menu: IMenus, idApp: string, idRol: string }) {
    document.title = "Roles";

    const [permisos, setPermisos] = useState<Array<IPermisos>>([])
    const [permisosMenu, setPermisosMenu] = useState<Array<IPermisos>>([])
    const [permisosFaltantes, setPermisosFaltantes] = useState<Array<IPermisos>>([])
    const [banderaMenus, setBanderaMenus] = useState(false);
    const [banderaMenusRol, setBanderaMenusRol] = useState(false);

    function obtenerDatos(){
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

    return (
        <Dialog open={open} fullScreen>
            {!banderaMenus ?
                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", opacity: "90" }}>
                    <CircularProgress size={300} />
                </Box>
                :
                <Grid container sx={{ width: "100%", height: "100%" }}>
                    <Grid container item xl={12} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: '#c4a57b' }}>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        </Grid>
                        <Grid item xl={10} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography fontFamily={"Montserrat-Regular"} fontSize={50}> PERMISOS </Typography>
                        </Grid>
                        <Grid item xl={1} sx={{ height: "8vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton onClick={() => { closeModal() }}><CloseIcon style={{ fontSize: 50 }} /> </IconButton>
                        </Grid>
                    </Grid>



                    <Grid container item xl={12} sx={{ height: "92vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Card sx={{ height: "90%", width: "95%", boxShadow: 10, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            {/* este box es la leyenda que se encuentra arriba a la izquierda */}
                            <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "10%" }}>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <SecurityIcon style={{ fontSize: "60px" }} />
                                </Grid>

                                <Grid item xl={8} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={50}>{menu.Descripcion}</Typography>
                                </Grid>

                                <Grid item xl={2} xs={12} md={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {/* <Button
                                        className="aceptar"
                                        variant="text"
                                    // onClick={(event) => handleNewBtnClick(event)}
                                    // sx={{
                                    //     fontFamily: "MontserratBold",
                                    //     backgroundColor: "#DFA94F",
                                    //     color: "#000001",
                                    //     fontSize: "10px",
                                    //     boxShadow: 4,
                                    // }}
                                    // startIcon={<AddIcon />}
                                    >
                                        registrar aplicación */}
                                    {/* </Button> */}
                                </Grid>


                            </Grid>

                            {(permisosMenu.length === 0 && permisosFaltantes.length === 0) ?
                                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                    <Typography fontFamily={"Montserrat-Bold"} fontSize={50}>Sin Información registrada </Typography>
                                </Box>
                                :
                                // roles[0].ControlInterno

                                // <MUIXDataGrid id={Math.random} columns={columns} rows={roles} camposCsv={camposCsv} />

                                <Grid container sx={{ display: "flex", width: "100%", height: "90%", justifyContent: "space-around", alignItems: "center" }}>
                                    <Grid container item xl={5} sx={{ display: "flex", height: "90%", border: "1px  solid", overflow: "auto", alignContent: "flex-start", justifyContent: "center" }}>
                                        {permisosMenu.map((permiso) => {
                                            return (

                                                <Grid container item xl={11} sx={{ display: "flex", height: "12%", border: "1px solid", bgcolor: '#c4a57b', boxShadow: 10, borderRadius: 2, alignItems: "center", justifyContent: "space-around", mt: "2vh" }}>
                                                    <Grid item xl={10}><Typography fontFamily={"Montserrat-Ligth"} fontSize={30}>{permiso.Descripcion}</Typography></Grid>
                                                    <Grid item xl={1}>
                                                        <Tooltip title={"Quitar permiso " + menu.Descripcion}>
                                                            <IconButton onClick={()=>{deletePermisoMenuRol(permiso.IdRelacion,obtenerDatos)}}>
                                                                <HighlightOffIcon style={{ fontSize: 50 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                    <Grid container item xl={5} sx={{ display: "flex", height: "90%", border: "1px  solid", overflow: "auto", alignContent: "flex-start", justifyContent: "center" }}>
                                        {permisosFaltantes.map((permiso) => {
                                            return (

                                                <Grid container item xl={11} sx={{ display: "flex", height: "12%", border: "1px solid", bgcolor: '#c4a57b', boxShadow: 10, borderRadius: 2, alignItems: "center", justifyContent: "space-around", mt: "2vh" }}>
                                                    <Grid item xl={1}>
                                                        <Tooltip title={"Asignar permiso " + menu.Descripcion}>
                                                            <IconButton onClick={()=>{createPermisoMenuRol(idRol,menu.Id,permiso.Id,localStorage.getItem("IdUsuario")||"",obtenerDatos)}}>
                                                                <ControlPointIcon style={{ fontSize: 50 }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xl={10} sx={{ display: "flex", justifyContent: "flex-end" }}><Typography fontFamily={"Montserrat-Ligth"} fontSize={30}>{permiso.Descripcion}</Typography></Grid>

                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>

                            }

                        </Card>
                    </Grid>
                </Grid>}

        </Dialog>
    )
}

